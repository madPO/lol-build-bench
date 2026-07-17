# State, Events & Lifecycle Tasks

Source: [https://qwik.dev/docs/components/state/](https://qwik.dev/docs/components/state/),
[https://qwik.dev/docs/components/events/](https://qwik.dev/docs/components/events/),
[https://qwik.dev/docs/components/tasks/](https://qwik.dev/docs/components/tasks/)

---

## useSignal()

Creates a reactive signal — stores a single value in `.value`.

```tsx
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const count = useSignal(0);
  return (
    <button onClick$={() => count.value++}>
      Count: {count.value}
    </button>
  );
});
```

**Passing signal vs value:**
```tsx
// ✅ Pass the signal — child component will be reactive
const price = useSignal(9.99);
<PriceTag price={price} />   // prop: Signal<number>

// ❌ Don't pass the value — not reactive
<PriceTag price={price.value} />
```

---

## useStore()

Reactive object with deep reactivity by default.

```tsx
const state = useStore({
  count: 0,
  user: { name: 'Alice', age: 30 },
  items: ['a', 'b'],
});

// All nested changes are tracked
state.user.name = 'Bob';
state.items.push('c');
```

**Shallow store (no deep reactivity):**
```tsx
const state = useStore({ nested: { val: 1 } }, { deep: false });
```

**Methods in store:**
```tsx
type Store = { count: number; inc: QRL<(this: Store) => void> };

const s = useStore<Store>({
  count: 0,
  inc: $(function (this: Store) { this.count++; }),
});
<button onClick$={() => s.inc()}>+</button>
```

---

## useComputed$()

Derived value that recalculates only when dependencies change.

```tsx
const name = useSignal('qwik');
const upper = useComputed$(() => name.value.toUpperCase());

<input bind:value={name} />
<p>{upper.value}</p>  // updates automatically
```

---

## Context API

```tsx
// context.ts
export const AuthCtx = createContextId<Signal<User | null>>('app.auth');

// Provider
export const App = component$(() => {
  const user = useSignal<User | null>(null);
  useContextProvider(AuthCtx, user);
  return <Slot />;
});

// Consumer
export const Profile = component$(() => {
  const user = useContext(AuthCtx);
  return user.value ? <p>{user.value.name}</p> : <p>Guest</p>;
});
```

---

## Event Handling

### Basic patterns

```tsx
// Inline
<button onClick$={() => count.value++}>+</button>

// Reusable via $()
const handleClick = $(() => { count.value++; });
<button onClick$={handleClick}>+</button>

// Array of handlers
<button onClick$={[logClick, increment, trackEvent]}>+</button>

// Access the event object
<div onClick$={(event) => console.log(event.clientX, event.clientY)}>

// currentTarget as second argument (important: handlers are async)
<form onSubmit$={(event, form) => {
  event.preventDefault(); // DOES NOT WORK in async context!
  // Use preventdefault:submit or sync$()
}}>

// Declarative modifiers
<a href="/" preventdefault:click stoppropagation:click onClick$={handler}>
```

### Custom events in components

```tsx
type Props = {
  onValueChange$: QRL<(value: string) => void>;
};

export const Input = component$<Props>(({ onValueChange$ }) => (
  <input onInput$={(_, el) => onValueChange$(el.value)} />
));

// Usage
<Input onValueChange$={$((v) => (result.value = v))} />
```

### Window / Document events

```tsx
// Preferred — JS loads only when the event fires
useOnDocument('mousemove', $((e: MouseEvent) => {
  pos.x = e.clientX;
  pos.y = e.clientY;
}));

useOnWindow('resize', $(() => {
  width.value = window.innerWidth;
}));

// On the root element of the current component
useOn('click', $(() => { /* ... */ }));
```

### sync$() for synchronous handling

```tsx
import { sync$, $ } from '@builder.io/qwik';

// When you need e.preventDefault() / e.stopPropagation()
<a href="/"
  data-active={isEnabled.value}
  onClick$={[
    sync$((e: MouseEvent, target: HTMLAnchorElement) => {
      // sync$ CANNOT close over component state!
      // Use data attributes to pass state in
      if (target.hasAttribute('data-active')) e.preventDefault();
    }),
    $(() => {
      // Regular async handler — can close over state
      console.log('clicked, active:', isEnabled.value);
    })
  ]}
>Link</a>
```

**sync$ limitations:**
- Cannot close over component state
- Cannot call imported functions
- Serialized into HTML → mind the size

---

## useTask$

Primary lifecycle hook. Runs **before** render.

```tsx
// On mount (once, server OR browser)
useTask$(async () => {
  data.value = await fetchData();
});

// On state change (track)
useTask$(({ track, cleanup }) => {
  const query = track(() => searchQuery.value);
  const id = setTimeout(() => performSearch(query), 300);
  cleanup(() => clearTimeout(id));
});

// track with a function — combine multiple values
useTask$(({ track }) => {
  const result = track(() =>
    isUpper.value ? text.value.toUpperCase() : text.value
  );
  output.value = result;
});

// Server guard — run only in browser
useTask$(({ track }) => {
  track(signal);
  if (isServer) return;
  // browser-only code
});

// isServer/isBrowser branching
import { isServer, isBrowser } from '@builder.io/qwik';
useTask$(({ track }) => {
  track(signal);
  isServer
    ? serverAction()
    : browserAction();
});
```

**track() with a store object:**
```tsx
const store = useStore({ a: 1, b: 2 });
useTask$(({ track }) => {
  track(store);          // tracks top-level property access
  // Does NOT track deep changes in nested objects
});
```

---

## useVisibleTask$

Runs in the browser after the component becomes visible.
**Use only as a last resort!**

```tsx
// Basic usage
useVisibleTask$(({ cleanup }) => {
  const id = setInterval(() => (time.value = Date.now()), 1000);
  cleanup(() => clearInterval(id));
});

// Run immediately after document ready (not by visibility)
useVisibleTask$(
  ({ cleanup }) => { /* ... */ },
  { strategy: 'document-ready' }
);

// Reactivity inside useVisibleTask$
useVisibleTask$(({ track, cleanup }) => {
  const isRunning = track(() => clockRunning.value);
  if (!isRunning) return;
  const id = setInterval(update, 1000);
  cleanup(() => clearInterval(id));
});
```

**Preferred alternatives:**

| Need | Use instead |
|------|-------------|
| Listen to DOM events | `useOnDocument`, `useOnWindow`, `useOn` |
| React to state changes | `useTask$` |
| Run once when visible | `useOn('qvisible', $(...))` |
| Run once on document idle | `useOnDocument('qidle', $(...))` |

---

## useResource$

For async data fetching without blocking render.

```tsx
import { component$, useResource$, Resource, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const userId = useSignal(1);

  const userResource = useResource$<User>(async ({ track, cleanup }) => {
    const id = track(() => userId.value);
    const controller = new AbortController();
    cleanup(() => controller.abort());
    const res = await fetch(`/api/users/${id}`, { signal: controller.signal });
    return res.json();
  });

  return (
    <Resource
      value={userResource}
      onPending={() => <div>Loading...</div>}
      onRejected={(err) => <div>Error: {err.message}</div>}
      onResolved={(user) => <div>{user.name}</div>}
    />
  );
});
```
