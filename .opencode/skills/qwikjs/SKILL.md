---
name: qwik-dev-en
description: >
  Building web applications with Qwik and QwikCity. Load this skill when
  working on Qwik projects: creating components (component$, $, QRL), state
  management (useSignal, useStore, useComputed$), event handling,
  lifecycle hooks (useTask$, useVisibleTask$), Context API, Slot/Content
  Projection, file-based routing with QwikCity, routeLoader$, routeAction$,
  server$, middleware (onRequest/onGet), styling, best practices, and
  Cookbook patterns (NavLink, debouncer, theme, streaming loaders,
  sync$ events).
metadata:
  version: '1.0'
  author: social@madpo.me
  sources: https://qwik.dev/docs/
---

# Qwik Development Skill

## When to use this skill

Load when working on any Qwik/QwikCity project:
- Creating and composing components
- State management and reactivity
- Routing, loaders, actions (QwikCity)
- Server-side functions (`server$`, `routeLoader$`, `routeAction$`)
- Middleware and request handling
- Best practices and Cookbook patterns

Detailed reference files in `references/`:
- `components.md` — components, props, slots, context, styles
- `state-events-tasks.md` — state, events, lifecycle
- `qwikcity.md` — routing, loaders, actions, middleware
- `cookbook.md` — patterns: NavLink, debouncer, theme, sync$, streaming
- `best-practices.md` — anti-patterns and best practices

---

## Core Qwik Concepts

Qwik is a **resumable** framework. The app is serialized on the server into HTML
and "resumes" on the client without full hydration. Key principles:

1. **`$` = lazy-loading boundary** — any function wrapped in `$()` or with a
   `$` suffix becomes a separate lazy-loaded chunk.
2. **QRL** — Qwik Resource Locator — a reference to a lazy-loaded function.
   Type: `QRL<() => void>`.
3. **Optimizer** — Vite plugin that automatically splits code at `$` boundaries.
4. **Resumability** — state is serialized into HTML; JS loads only when
   interactivity is needed.

---

## Components

### Basic component

```tsx
import { component$ } from '@builder.io/qwik';

// Pages/layouts — export default
export default component$(() => {
  return <div>Hello World!</div>;
});

// Reusable components — export const
export const MyButton = component$(() => {
  return <button>Click me</button>;
});
```

### Typed props

```tsx
interface ItemProps {
  name: string;
  price?: number;
  onAction$?: QRL<() => void>; // QRL for callback props
}

export const Item = component$<ItemProps>(({ name, price = 0, onAction$ }) => {
  return (
    <div>
      <p>{name}: {price}</p>
      <button onClick$={onAction$}>Action</button>
    </div>
  );
});
```

**Props rules:**
- Primitive props are shallowly immutable (cannot be changed from a child)
- To pass reactive primitives — use `Signal<T>`
- Type callback props as `QRL<() => void>`
- Destructure props for default values

### Inline components (no lazy-loading)

```tsx
// Bundled with parent, no access to use* hooks or <Slot>
export const Badge = (props: { text: string }) => (
  <span class="badge">{props.text}</span>
);
```

### Dot notation (namespace)

```tsx
// components/ui/index.ts
export * as Select from './select';

// Usage
import { Select } from './components/ui';
export default component$(() => (
  <Select.Root>
    <Select.Item>Option 1</Select.Item>
  </Select.Root>
));
```

### Polymorphic component

```tsx
import { type FunctionComponent, type PropsOf, Slot, component$ } from '@builder.io/qwik';

const Poly = component$<
  { as?: string | FunctionComponent } & Record<string, unknown>
>(({ as, ...props }) => {
  const Cmp = as || 'div';
  return <Cmp {...props}><Slot /></Cmp>;
});
```

---

## State

> See details: `references/state-events-tasks.md`

```tsx
import { component$, useSignal, useStore, useComputed$ } from '@builder.io/qwik';

export default component$(() => {
  // Reactive primitive
  const count = useSignal(0);

  // Reactive object (deep by default)
  const state = useStore({ name: 'Qwik', nested: { value: 42 } });

  // Computed value — recalculates only when dependencies change
  const doubled = useComputed$(() => count.value * 2);

  return (
    <>
      <p>{count.value} × 2 = {doubled.value}</p>
      <button onClick$={() => count.value++}>+</button>
      <p>{state.nested.value}</p>
    </>
  );
});
```

**Passing a signal as prop — preferred pattern:**
```tsx
const price = useSignal(9.99);
<Item price={price} />  // Signal<number>, child can read price.value
```

---

## Event Handling

> See details: `references/state-events-tasks.md`

```tsx
// Inline handler
<button onClick$={() => count.value++}>+</button>

// Reusable handler via $()
const increment = $(() => count.value++);
<button onClick$={increment}>+</button>

// Array of handlers
<button onClick$={[logClick, increment, trackAnalytics]}>+</button>

// Declarative modifiers (no JS until event fires)
<a href="/docs" preventdefault:click onClick$={() => navigate()}>Docs</a>

// currentTarget as second argument (important for async)
<div onClick$={(event, currentTarget) => { /* ... */ }}>

// Window/Document events (no eager JS)
useOnDocument('mousemove', $((event: MouseEvent) => {
  pos.x = event.x;
}));
```

---

## Lifecycle / Tasks

> See details: `references/state-events-tasks.md`

| Hook | When it runs | Platform |
|------|--------------|----------|
| `useTask$` | Before render, on tracked state change | Server + Browser |
| `useVisibleTask$` | After render, when component enters viewport | Browser only |
| `useComputed$` | When dependencies change | Server + Browser |
| `useResource$` | Async fetch without blocking render | Server + Browser |

```tsx
// useTask$ — primary lifecycle hook
useTask$(({ track, cleanup }) => {
  const value = track(() => searchQuery.value);
  const id = setTimeout(() => (result.value = value), 500);
  cleanup(() => clearTimeout(id)); // debounce
});

// useTask$ without track — runs ONCE like onMount
useTask$(async () => {
  data.value = await fetchInitialData();
});

// useVisibleTask$ — use only as a last resort
useVisibleTask$(({ cleanup }) => {
  const id = setInterval(() => (time.value = Date.now()), 1000);
  cleanup(() => clearInterval(id));
});

// Server guard in useTask$
useTask$(({ track }) => {
  track(someSignal);
  if (isServer) return; // run only in browser
  // browser-only code
});
```

---

## Context API

```tsx
import { createContextId, useContextProvider, useContext } from '@builder.io/qwik';

// 1. Declare ID (once, in a separate file)
export const ThemeContext = createContextId<Signal<string>>('app.theme');

// 2. Provider in parent component
export const Root = component$(() => {
  const theme = useSignal('dark');
  useContextProvider(ThemeContext, theme);
  return <Slot />;
});

// 3. Consume in any child component
export const Header = component$(() => {
  const theme = useContext(ThemeContext);
  return <div class={theme.value}>Header</div>;
});
```

---

## Slots / Content Projection

```tsx
import { Slot, component$ } from '@builder.io/qwik';

// Named and default slots
export const Card = component$(() => (
  <div class="card">
    <h2><Slot name="title" /></h2>
    <div><Slot /></div>          {/* default */}
    <footer><Slot name="footer" /></footer>
  </div>
));

// Usage
<Card>
  <span q:slot="title">Title</span>
  Main content
  <button q:slot="footer">OK</button>
</Card>
```

**Slot rules:**
- `q:slot` must be a **direct** child of the component
- Unprojected content moves to `<q:template>` (hidden, available when needed)
- Cannot be used in inline components

---

## Styles

```tsx
// CSS Modules (recommended)
import styles from './Component.module.css';
<div class={styles.container}>...</div>

// Combining classes (array/object syntax)
<div class={[styles.base, 'p-4', { active: isActive.value }]}>

// Scoped styles — inline in component
useStylesScoped$(`
  .container { background: red; }
`);

// External CSS file (with ?inline)
import css from './styles.css?inline';
useStylesScoped$(css);

// Lazy-loaded styles
import css from './heavy.css?inline';
useStyles$(css); // loads only when component mounts

// Tailwind
// pnpm run qwik add tailwind
```

**Note:** Qwik uses `class`, not `className`.

---

## QwikCity — Routing

> See details: `references/qwikcity.md`

### File structure

```
src/routes/
├── layout.tsx              # Root layout
├── index.tsx               # / (home)
├── about/
│   └── index.tsx           # /about
├── blog/
│   ├── layout.tsx          # Layout for /blog/*
│   ├── index.tsx           # /blog
│   └── [slug]/
│       └── index.tsx       # /blog/:slug (dynamic)
├── api/
│   └── users/
│       └── index.ts        # REST endpoint (.ts only, no JSX)
└── [...catchall]/
    └── index.tsx           # Fallback
```

### Dynamic route params

```tsx
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();
  return <p>Slug: {loc.params.slug}</p>;
});
```

### Layout

```tsx
// src/routes/layout.tsx
import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => (
  <main>
    <Nav />
    <Slot />  {/* child pages render here */}
    <Footer />
  </main>
));
```

### Navigation

```tsx
import { Link, useNavigate } from '@builder.io/qwik-city';

// Declarative (preferred, supports prefetch)
<Link href="/about">About</Link>
<Link href="/about" prefetch={false}>No prefetch</Link>
<Link reload>Reload page</Link>

// Programmatic
const nav = useNavigate();
await nav('/dashboard');
await nav(); // reload
```

---

## routeLoader$ — server-side data loading

```tsx
// src/routes/products/[id]/index.tsx
import { routeLoader$ } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';

// Export ONLY from layout.tsx / index.tsx!
export const useProduct = routeLoader$(async ({ params, fail }) => {
  const product = await db.products.findById(params.id);
  if (!product) return fail(404, { error: 'Not found' });
  return product;
});

export default component$(() => {
  const product = useProduct(); // Readonly<Signal<Product>>
  if (product.value.error) return <p>{product.value.error}</p>;
  return <h1>{product.value.name}</h1>;
});
```

**Access another loader:**
```tsx
export const useRecommendations = routeLoader$(async (req) => {
  const product = await req.resolveValue(useProduct);
  return fetchRecommendations(product.id);
});
```

**Streaming (deferred) loader:**
```tsx
export const useSlowData = routeLoader$(async () => {
  return async () => {          // return an async function!
    await delay(3000);
    return fetchExpensiveData();
  };
});

// In component
const data = useSlowData();
<Resource value={data} onResolved={(d) => <div>{d}</div>} />
```

---

## routeAction$ — mutations and forms

```tsx
import { routeAction$, zod$, z, Form } from '@builder.io/qwik-city';

export const useCreateUser = routeAction$(
  async (data, { fail }) => {
    const id = await db.users.create(data);
    if (!id) return fail(500, { message: 'Creation failed' });
    return { success: true, id };
  },
  zod$({ name: z.string().min(1), email: z.string().email() })
);

export default component$(() => {
  const action = useCreateUser();
  return (
    <Form action={action}>
      <input name="name" value={action.formData?.get('name')} />
      <input name="email" value={action.formData?.get('email')} />
      {action.value?.failed && (
        <p class="error">{action.value.fieldErrors?.name}</p>
      )}
      {action.value?.success && <p>Created: {action.value.id}</p>}
      <button type="submit">Create</button>
    </Form>
  );
});

// Programmatic call
const { value } = await action.submit({ name: 'John', email: 'j@j.com' });
```

**`globalAction$`** — available on any route (e.g. login):
```tsx
export const useLogin = globalAction$(async (data) => { /* ... */ });
```

---

## server$ — server-side RPC functions

```tsx
import { server$ } from '@builder.io/qwik-city';

// Regular call
export const getSecret = server$(function () {
  return this.env.get('SECRET_KEY'); // this = RequestEvent
});

// Streaming via async generator
export const streamData = server$(async function* () {
  for (let i = 0; i < 10; i++) {
    yield `chunk-${i}`;
    await delay(100);
  }
});

// Call from component (must wrap in $())
<button onClick$={$(async () => {
  const stream = await streamData();
  for await (const chunk of stream) {
    output.value += chunk;
  }
})}>Start</button>
```

**Available on `this`:** `env`, `cookie`, `headers`, `url`, `request`, `sharedMap`.

---

## Middleware

```tsx
// src/routes/layout.tsx or index.tsx
import type { RequestHandler } from '@builder.io/qwik-city';

// Runs for any HTTP method
export const onRequest: RequestHandler = async ({ next, redirect, cookie }) => {
  const token = cookie.get('auth-token')?.value;
  if (!token) throw redirect(302, '/login');
  await next();
};

// GET only
export const onGet: RequestHandler = async ({ cacheControl, json }) => {
  cacheControl({ maxAge: 60, public: true });
};

export const onPost: RequestHandler = async ({ parseBody, json }) => {
  const body = await parseBody();
  json(200, { received: body });
};
```

**sharedMap — passing data between middleware and loaders:**
```tsx
// In onRequest:
sharedMap.set('user', currentUser);

// In routeLoader$:
export const useCurrentUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get('user') as User;
});
```

**REST endpoint** (`index.ts` file, no JSX):
```ts
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = ({ json }) => {
  json(200, { status: 'ok' });
};

export const onPost: RequestHandler = async ({ parseBody, json }) => {
  const body = await parseBody();
  json(201, { created: body });
};
```

---

## Best Practices

> See details: `references/best-practices.md`

### Inline operations in templates

```tsx
// ❌ Bad — entire component re-renders when signal changes
const label = count.value > 0 ? 'positive' : 'negative';
return <div>{label} - {count.value}</div>;

// ✅ Good — only the relevant DOM node updates
return <div>{count.value > 0 ? 'positive' : 'negative'} - {count.value}</div>;
```

### useComputed$ instead of derived variables

```tsx
// ❌ Bad
const doubled = count.value * 2; // reads signal → triggers re-render

// ✅ Good
const doubled = useComputed$(() => count.value * 2); // isolated
return <div>{doubled.value}</div>;
```

### Avoid useVisibleTask$ — prefer alternatives

```tsx
// ❌ Bad — loads JS eagerly
useVisibleTask$(() => {
  document.addEventListener('scroll', handler);
});

// ✅ Good — JS loads only when event fires
useOnDocument('scroll', $((e) => { /* ... */ }));

// ✅ Good — for state reactivity
useTask$(({ track }) => {
  track(someSignal);
  // runs on server and browser
});
```

### useLocation instead of window.location

```tsx
// ❌ Bad
useVisibleTask$(() => {
  if (window.location.href.includes('admin')) { /* ... */ }
});

// ✅ Good — works on server, zero extra JS
const loc = useLocation();
if (loc.url.pathname.startsWith('/admin')) { /* ... */ }
```

### Pass signals, not values

```tsx
// ❌ Bad — prop is not reactive
<Child value={count.value} />

// ✅ Good — child receives a reactive signal
<Child value={count} />
```

---

## Cookbook Patterns

> See details: `references/cookbook.md`

### NavLink (active navigation link)
```tsx
import { NavLink } from '~/components/nav-link';
<NavLink href="/docs" activeClass="text-blue-600">Documentation</NavLink>
```

### Debouncer
```tsx
const debounce = useDebouncer$((value: string) => {
  search.value = value;
}, 500);
<input onInput$={(_, el) => debounce(el.value)} />
```

### sync$ (synchronous event handling)
```tsx
// For preventDefault/stopPropagation — sync$ is required
<a href="/"
  data-should-prevent={shouldPrevent.value}
  onClick$={[
    sync$((e: MouseEvent, t: HTMLAnchorElement) => {
      if (t.hasAttribute('data-should-prevent')) e.preventDefault();
    }),
    $(() => { /* async part */ })
  ]}
>Link</a>
```

### Theme (dark/light)
- Inline `<script>` in `<head>` to set theme before render (prevents flicker)
- `localStorage` + CSS classes on `documentElement`
- Toggle component via `onClick$`

### Streaming Loaders
```tsx
// routeLoader$ returns an async function for deferred rendering
export const useData = routeLoader$(async () => async () => {
  return await slowFetch();
});
<Resource value={data} onResolved={(d) => <div>{d}</div>} />
```

---

## Useful Patterns

### useId() for SSR/client consistency
```tsx
const id = useId();
<label for={id}>Name</label>
<input id={id} />
```

### ref for DOM elements
```tsx
const inputRef = useSignal<HTMLInputElement>();
useVisibleTask$(() => {
  inputRef.value?.focus();
});
<input ref={inputRef} />
```

### bind:value — two-way binding
```tsx
const name = useSignal('');
<input bind:value={name} />
<p>Hello, {name.value}</p>
```

### QwikCity execution order

```
entry.ts → plugin.ts (middleware) → layout.tsx (onRequest) →
globalLoaders → routeLoaders → components (JSX)
```

### Environment variables
- Server-side: `requestEvent.env.get('SECRET')`
- Public (Vite): `import.meta.env.VITE_API_URL`

---

## New Project Setup

```bash
# Create
pnpm create qwik@latest
pnpm run qwik add tailwind   # add Tailwind
pnpm run qwik add vitest     # add tests
```

```
src/
├── components/              # Reusable components
│   └── ui/
├── routes/                  # QwikCity file-based routing
│   ├── layout.tsx
│   ├── index.tsx
│   └── api/
├── utils/                   # Helper functions
├── root.tsx                 # App root
└── entry.ssr.tsx            # SSR entry point
```
