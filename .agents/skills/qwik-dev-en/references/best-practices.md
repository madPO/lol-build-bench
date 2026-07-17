# Qwik Best Practices

Source: [https://qwik.dev/docs/guides/best-practices/](https://qwik.dev/docs/guides/best-practices/)

---

## 1. Inline operations in templates

Read signals **directly in JSX** — don't cache them in component variables.

```tsx
// ❌ Bad — entire component function re-runs when signal changes
export default component$(() => {
  const signal = useSignal(0);
  const label = signal.value > 0 ? 'positive' : 'negative'; // ← reads signal
  return (
    <div>
      <button onClick$={() => signal.value++}>+</button>
      <div>{label} — {signal.value}</div>
    </div>
  );
});

// ✅ Good — only the relevant DOM node updates surgically
export default component$(() => {
  const signal = useSignal(0);
  return (
    <div>
      <button onClick$={() => signal.value++}>+</button>
      <div>
        {signal.value > 0 ? 'positive' : 'negative'} — {signal.value}
      </div>
    </div>
  );
});
```

---

## 2. useComputed$ for derived values

Instead of reading a signal in the component body — use `useComputed$`.

```tsx
// ❌ Bad — changing count re-renders the entire component
export default component$(() => {
  const count = useSignal(1);
  const doubled = count.value * 2; // reads signal → triggers re-render
  return <div>{doubled}</div>;
});

// ✅ Good — recalculates in isolation, component body untouched
export default component$(() => {
  const count = useSignal(1);
  const doubled = useComputed$(() => count.value * 2);
  return <div>{doubled.value}</div>;
});
```

---

## 3. useVisibleTask$ — last resort only

`useVisibleTask$` loads JS **eagerly**, blocking the main thread.

### Preferred replacements

| Scenario | Use instead |
|----------|-------------|
| DOM events | `useOnDocument`, `useOnWindow`, `useOn` |
| React to state change | `useTask$` |
| Run once on visibility | `useOn('qvisible', $(...))` |
| Run once on document idle | `useOnDocument('qidle', $(...))` |

```tsx
// ❌ Bad — loads all JS immediately
useVisibleTask$(({ cleanup }) => {
  const handler = (e: MouseEvent) => console.log(e.x, e.y);
  document.addEventListener('mousemove', handler);
  cleanup(() => document.removeEventListener('mousemove', handler));
});

// ✅ Good — JS doesn't load until the first event fires
useOnDocument('mousemove', $((e: MouseEvent) => {
  console.log(e.x, e.y);
}));
```

### Pattern: media query without useVisibleTask$

```tsx
const isMobile = useSignal(false);

// Step 1: On idle, start native listener (sync$ — no core load)
useOnDocument('qidle', sync$(() => {
  const query = window.matchMedia('(max-width: 768px)');
  const handler = (e: MediaQueryListEvent) => {
    // Proxy through a document event so QRL can intercept it
    document.dispatchEvent(new CustomEvent('mq:mobile', { detail: e.matches }));
  };
  document['_cleanup_mq_mobile'] = () => query.removeEventListener('change', handler);
  query.addEventListener('change', handler);
}));

// Step 2: Handle the proxied event (core loads only when event fires)
useOnDocument('mq:mobile', $((e: CustomEvent) => {
  isMobile.value = e.detail;
}));

// Step 3: Cleanup
useTask$(({ cleanup }) => {
  cleanup(() => {
    document['_cleanup_mq_mobile']?.();
    delete document['_cleanup_mq_mobile'];
  });
});
```

---

## 4. useLocation instead of window.location

```tsx
// ❌ Bad — loads JS, doesn't work on server
useVisibleTask$(() => {
  if (window.location.pathname.startsWith('/admin')) {
    loadAdminTools();
  }
});

// ✅ Good — works on server, zero extra JS
const loc = useLocation();
if (loc.url.pathname.startsWith('/admin')) {
  loadAdminTools();
}
```

**Exception:** For SSG with query params — `window.location` inside event handlers is acceptable.

---

## 5. Defer framework core loading

Qwik core loads when `ref`, `id`, or hooks are used. You can delay it:

```tsx
const Component = component$(() => {
  const ref = useSignal();
  const id = useId();

  // ❌ These callbacks require core at load time (close over ref/id)
  useOnDocument('qidle', $(() => console.log(ref)));
  useOnDocument('qidle', $(() => console.log(id)));

  // ✅ These do NOT require core (global variables, literals)
  useOnDocument('qidle', $(() => console.log(globalVar)));
  useOnDocument('qidle', $(() => console.log('hello')));

  return <p ref={ref} id={id}></p>;
});
```

---

## 6. Pass signals, not values in props

```tsx
// ❌ Bad — child receives a non-reactive value
<Child isOpen={isOpen.value} />

// ✅ Good — child receives a reactive signal
<Child isOpen={isOpen} />

// Typing in the child
interface Props {
  isOpen: Signal<boolean>;
}
const Child = component$<Props>(({ isOpen }) => (
  <div class={{ hidden: !isOpen.value }}>...</div>
));
```

---

## 7. Component idempotency

A component function must return the same result for the same inputs.

```tsx
// ❌ Bad — side effects in the component body
export default component$(() => {
  fetch('/api/log-view'); // called on every render
  const items = expensiveCalc(); // recalculated on every render
  return <div>{items}</div>;
});

// ✅ Good — side effects in hooks
export default component$(() => {
  useTask$(async () => {
    await fetch('/api/log-view'); // once on mount
  });
  const items = useComputed$(() => expensiveCalc()); // memoized
  return <div>{items.value}</div>;
});
```

---

## 8. Correct use of $()

```tsx
// ❌ Bad — creates a new QRL on every render
<button onClick$={() => server$(...)}>Click</button>

// ✅ Good — wrap inner calls in $()
<button onClick$={$(async () => {
  const result = await serverFunction();
})}>Click</button>
```

---

## 9. Export loaders only from route files

```tsx
// ❌ Bad — routeLoader$ in a component file
// src/components/ProductCard.tsx
export const useProduct = routeLoader$(...); // DOES NOT WORK

// ✅ Good — in index.tsx / layout.tsx
// src/routes/product/[id]/index.tsx
export const useProduct = routeLoader$(...); // Works

// ✅ Reuse — define separately, re-export from route
// src/lib/loaders.ts — define here
// src/routes/product/[id]/index.tsx — export { useProduct } from '~/lib/loaders';
```

---

## 10. useOnDocument/useOnWindow for global events

```tsx
// ❌ Bad — eager JS loading
useVisibleTask$(({ cleanup }) => {
  const handler = () => handleKeyboard(event);
  window.addEventListener('keydown', handler);
  cleanup(() => window.removeEventListener('keydown', handler));
});

// ✅ Good
useOnWindow('keydown', $((event: KeyboardEvent) => {
  if (event.key === 'Escape') closeModal();
}));
```

---

## Pre-PR Checklist

- [ ] No signal reads cached in component variables (use `useComputed$`)
- [ ] No `window.location` — use `useLocation()`
- [ ] `useVisibleTask$` replaced with `useTask$` or `useOn*` where possible
- [ ] Callback props typed as `QRL<...>`
- [ ] `routeLoader$` / `routeAction$` exported only from `index.tsx`/`layout.tsx`
- [ ] Component functions are idempotent
- [ ] Signals passed in props, not values (where reactivity is needed)
