# Qwik Components — Full Reference

Source: [https://qwik.dev/docs/components/overview/](https://qwik.dev/docs/components/overview/),
[https://qwik.dev/docs/components/slots/](https://qwik.dev/docs/components/slots/),
[https://qwik.dev/docs/components/context/](https://qwik.dev/docs/components/context/),
[https://qwik.dev/docs/components/styles/](https://qwik.dev/docs/components/styles/)

---

## Core Concepts

### $ (dollar sign) and QRL

**`$`** is a marker for the Optimizer. Any function behind `$` becomes a
separate lazy-loaded chunk.

```tsx
import { $, component$, useSignal } from '@builder.io/qwik';

// component$ — component as a separate chunk
export const MyComp = component$(() => <div>Hello</div>);

// $() — create a QRL from a function
const handler = $(() => console.log('clicked'));

// Inline $ in JSX
<button onClick$={() => count.value++}>+</button>
```

**QRL** (Qwik Resource Locator) — a lazy-loadable function reference.
Types: `QRL<() => void>`, `QRL<(value: string) => Promise<void>>`.

### How the Optimizer works

1. Finds all `$` calls
2. Extracts the function into a separate `*.qwik.mjs` file
3. Replaces it with a URL reference
4. The function only loads on first invocation

---

## component$() — all variants

```tsx
import { component$, type PropsOf } from '@builder.io/qwik';

// 1. Page/Layout — export default
export default component$(() => <h1>Page</h1>);

// 2. Reusable — export const
export const Button = component$(() => <button>Click</button>);

// 3. Typed props
interface CardProps {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
  onSelect$?: QRL<(id: string) => void>;
}
export const Card = component$<CardProps>(({ title, description = '', variant = 'primary', onSelect$ }) => (
  <div class={`card card--${variant}`}>
    <h2>{title}</h2>
    <p>{description}</p>
    {onSelect$ && <button onClick$={() => onSelect$('id-1')}>Select</button>}
  </div>
));

// 4. Default values via destructuring
export const Input = component$<{ placeholder?: string; disabled?: boolean }>(
  ({ placeholder = 'Enter text...', disabled = false }) => (
    <input placeholder={placeholder} disabled={disabled} />
  )
);

// 5. Polymorphic (as prop)
import { type FunctionComponent } from '@builder.io/qwik';

const Box = component$<{
  as?: string | FunctionComponent;
  [key: string]: unknown;
}>(({ as, ...props }) => {
  const Cmp = as || 'div';
  return <Cmp {...props}><Slot /></Cmp>;
});

// Usage
<Box as="section" class="container">Content</Box>
<Box as={Card} title="Hello">Content</Box>
```

---

## Props — detailed patterns

```tsx
// Signal as prop — for reactive primitives
interface Props {
  count: Signal<number>;
  label: string;          // Not reactive — fine for static text
  onReset$: QRL<() => void>;
}

export const Counter = component$<Props>(({ count, label, onReset$ }) => (
  <div>
    <p>{label}: {count.value}</p>
    <button onClick$={() => count.value++}>+</button>
    <button onClick$={onReset$}>Reset</button>
  </div>
));

// Object props — internal mutations are allowed
interface FormState {
  values: { name: string; email: string };
}
export const Form = component$((props: FormState) => {
  props.values.name = 'Updated'; // ✅ ok — mutating inside the object
  // props.values = { ... }      // ❌ not allowed — cannot replace the reference
  return <div>{props.values.name}</div>;
});

// PropsOf — extend an existing HTML element's props
export const StyledButton = component$<PropsOf<'button'> & { variant?: string }>(
  ({ variant, ...rest }) => (
    <button {...rest} class={['btn', `btn-${variant}`, rest.class]} />
  )
);
```

---

## Inline components

Not a separate chunk. Limitations:
- No `use*` hooks
- No `<Slot>`
- Bundled with the parent

```tsx
// Only for simple markup
const Icon = ({ name }: { name: string }) => (
  <svg class={`icon icon-${name}`}>
    <use href={`/icons.svg#${name}`} />
  </svg>
);

// Usage
export const Button = component$(() => (
  <button>
    <Icon name="arrow" />
    Click
  </button>
));
```

---

## Slots / Content Projection

```tsx
import { Slot, component$ } from '@builder.io/qwik';

// Single default slot
export const Panel = component$(() => (
  <div class="panel">
    <Slot />
  </div>
));

// Named slots
export const Dialog = component$(() => (
  <div class="dialog" role="dialog">
    <header>
      <Slot name="title" />
    </header>
    <main>
      <Slot />           {/* default — receives content without q:slot */}
    </main>
    <footer>
      <Slot name="actions" />
    </footer>
  </div>
));

// Usage
<Dialog>
  <h2 q:slot="title">Confirm</h2>
  Are you sure you want to delete?
  <div q:slot="actions">
    <button>Cancel</button>
    <button>Delete</button>
  </div>
</Dialog>
```

**Slot rules:**
- `q:slot` must be a direct child of the component (not nested)
- Multiple elements with the same `q:slot` are merged into one slot
- Unprojected content → `<q:template>` (hidden but in DOM for SSR)
- Slots only work inside `component$`, not in inline components

```tsx
// ❌ Error — q:slot is not a direct child
<Dialog>
  <div>
    <span q:slot="title">Wrong</span>  {/* deeply nested */}
  </div>
</Dialog>

// ✅ Correct
<Dialog>
  <span q:slot="title">Correct</span>  {/* direct child */}
</Dialog>
```

---

## Context API — full pattern

```tsx
// src/context/app.ts
import { createContextId, type Signal } from '@builder.io/qwik';

// Naming: 'namespace.name' for uniqueness
export const UserContext = createContextId<Signal<User | null>>('app.user');
export const ThemeContext = createContextId<Signal<'light' | 'dark'>>('app.theme');

// src/routes/layout.tsx — Provider
import { component$, useSignal, useContextProvider } from '@builder.io/qwik';
import { UserContext, ThemeContext } from '~/context/app';

export default component$(() => {
  const user = useSignal<User | null>(null);
  const theme = useSignal<'light' | 'dark'>('dark');

  useContextProvider(UserContext, user);
  useContextProvider(ThemeContext, theme);

  return <Slot />;
});

// src/components/header/index.tsx — Consumer
import { component$, useContext } from '@builder.io/qwik';
import { UserContext, ThemeContext } from '~/context/app';

export const Header = component$(() => {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  return (
    <header class={theme.value}>
      {user.value ? (
        <p>Hello, {user.value.name}</p>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  );
});
```

---

## Styles — full reference

```tsx
// 1. CSS Modules (recommended)
import styles from './Component.module.css';

<div class={styles.container}>
<div class={[styles.base, styles.large, { [styles.active]: isActive }]}>
<div class={[styles.item, 'p-4', props.isError ? 'text-red-500' : '']}>

// 2. useStylesScoped$ — scoped inline styles
import { useStylesScoped$ } from '@builder.io/qwik';
useStylesScoped$(`
  .card { border-radius: 8px; padding: 16px; }
  .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
`);

// 3. External scoped CSS (with ?inline)
import scopedCss from './Component.css?inline';
useStylesScoped$(scopedCss);

// 4. useStyles$ — lazy-loaded, unscoped
import globalCss from './animations.css?inline';
useStyles$(globalCss);

// 5. :global() in scoped styles — for slotted content
useStylesScoped$(`
  .list > :global(*:first-child) { margin-top: 0; }
`);

// 6. CSS Variables for dynamic values
const primaryColor = useSignal('#3b82f6');
return (
  <div
    style={{ '--primary': primaryColor.value }}
    class={styles.themed}
  >
    {/* In CSS: color: var(--primary); */}
  </div>
);

// 7. Tailwind: pnpm run qwik add tailwind
<div class={[styles.container, 'flex items-center gap-4', { 'opacity-50': isDisabled }]}>
```

**Important:** Qwik uses `class` instead of `className`.

---

## DOM Refs

```tsx
const inputRef = useSignal<HTMLInputElement>();
const divRef = useSignal<HTMLDivElement>();

// Element metrics
useVisibleTask$(() => {
  const rect = divRef.value?.getBoundingClientRect();
  width.value = rect?.width ?? 0;
});

// Focus
useTask$(() => {
  if (isOpen.value) {
    inputRef.value?.focus();
  }
});

return (
  <>
    <input ref={inputRef} />
    <div ref={divRef}>Content</div>
  </>
);
```

---

## useId() — consistent IDs for SSR

```tsx
const id = useId();

// label/input association
<div>
  <label for={`${id}-email`}>Email</label>
  <input id={`${id}-email`} type="email" />
</div>

// aria attributes
<button aria-describedby={`${id}-tooltip`}>?</button>
<div id={`${id}-tooltip`} role="tooltip">Help text</div>
```

---

## bind:value — two-way binding

```tsx
const name = useSignal('');
const checked = useSignal(false);
const selected = useSignal('option-a');

<input bind:value={name} type="text" />
<input bind:checked={checked} type="checkbox" />
<select bind:value={selected}>
  <option value="option-a">A</option>
  <option value="option-b">B</option>
</select>
```

---

## Pattern: Composable hooks

```tsx
// Reusable stateful hook
export function useCounter(initial = 0) {
  const count = useSignal(initial);
  const increment = $(() => count.value++);
  const decrement = $(() => count.value--);
  const reset = $(() => (count.value = initial));
  return { count, increment, decrement, reset };
}

// Usage in component
export const Counter = component$(() => {
  const { count, increment, decrement, reset } = useCounter(10);
  return (
    <div>
      <button onClick$={decrement}>-</button>
      <span>{count.value}</span>
      <button onClick$={increment}>+</button>
      <button onClick$={reset}>Reset</button>
    </div>
  );
});
```
