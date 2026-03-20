# Qwik Cookbook Patterns

Source: [https://qwik.dev/docs/cookbook/](https://qwik.dev/docs/cookbook/)

---

## NavLink (active navigation link)

Extends `<Link>` with an active class when the link matches the current URL.

```tsx
// src/components/nav-link/index.tsx
import { Slot, component$ } from '@builder.io/qwik';
import { Link, useLocation, type LinkProps } from '@builder.io/qwik-city';

type NavLinkProps = LinkProps & { activeClass?: string };

export const NavLink = component$(({ activeClass, ...props }: NavLinkProps) => {
  const location = useLocation();
  const toPathname = props.href ?? '';
  const locationPathname = location.url.pathname;

  const startSlashPosition =
    toPathname !== '/' && toPathname.startsWith('/')
      ? toPathname.length - 1
      : toPathname.length;
  const endSlashPosition =
    toPathname !== '/' && toPathname.endsWith('/')
      ? toPathname.length - 1
      : toPathname.length;

  const isActive =
    locationPathname === toPathname ||
    (locationPathname.endsWith(toPathname) &&
      (locationPathname.charAt(endSlashPosition) === '/' ||
        locationPathname.charAt(startSlashPosition) === '/'));

  return (
    <Link
      {...props}
      class={[props.class, isActive && activeClass ? activeClass : '']}
    >
      <Slot />
    </Link>
  );
});

// Usage
<NavLink href="/docs" activeClass="text-blue-600 font-bold">
  Documentation
</NavLink>

// With Tailwind (requires important: true in tailwind.config)
<NavLink href="/blog" activeClass="!text-green-600">Blog</NavLink>
```

---

## Debouncer

Delays function execution by N milliseconds after the last call.

```tsx
// src/utils/debouncer.ts
import { $, useSignal, implicit$FirstArg, type QRL } from '@builder.io/qwik';

export const useDebouncerQrl = <A extends unknown[], R>(
  fn: QRL<(...args: A) => R>,
  delay: number,
): QRL<(...args: A) => void> => {
  const timeoutId = useSignal<number>();
  return $((...args: A): void => {
    window.clearTimeout(timeoutId.value);
    timeoutId.value = window.setTimeout((): void => {
      void fn(...args);
    }, delay);
  });
};

// Convenient $-suffix syntax
export const useDebouncer$ = implicit$FirstArg(useDebouncerQrl);

// Usage
import { component$, useSignal, $ } from '@builder.io/qwik';
import { useDebouncer$ } from '~/utils/debouncer';

export default component$(() => {
  const result = useSignal('');

  const debounce = useDebouncer$((value: string) => {
    result.value = value;
  }, 500);

  return (
    <>
      <input onInput$={(_, el) => debounce(el.value)} placeholder="Type..." />
      <p>Debounced: {result.value}</p>
    </>
  );
});
```

---

## Dark/Light Theme Management

Theme switching without flicker on page load.

```tsx
// src/root.tsx — inline script in <head> to prevent flicker
export default component$(() => (
  <QwikCityProvider>
    <head>
      <script
        dangerouslySetInnerHTML={`
          (function() {
            const stored = localStorage.getItem('theme');
            const theme = stored
              || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.classList.add(theme);
            localStorage.setItem('theme', theme);
          })();
        `}
      />
      <meta charSet="utf-8" />
    </head>
    <body>
      <RouterOutlet />
    </body>
  </QwikCityProvider>
));
```

```tsx
// src/components/theme-toggle/index.tsx
import { component$ } from '@builder.io/qwik';

export const ThemeToggle = component$(() => (
  <button
    type="button"
    onClick$={() => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
    }}
  >
    {/* Tailwind dark: variant */}
    <span class="hidden dark:inline">☀️ Light</span>
    <span class="inline dark:hidden">🌙 Dark</span>
  </button>
));
```

**tailwind.config.ts:**
```ts
export default {
  darkMode: 'class',
  // ...
};
```

**global.css (Tailwind v4):**
```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

**CSP headers** (for strict policies):
```
# public/_headers
/*
  Content-Security-Policy: script-src 'self' 'unsafe-inline';
```

---

## Synchronous Events with sync$()

Use when `event.preventDefault()` and `event.stopPropagation()` are needed —
they don't work in async handlers.

```tsx
import { component$, useSignal, sync$, $ } from '@builder.io/qwik';

// Strategy: data attributes carry state into sync$
export default component$(() => {
  const shouldPrevent = useSignal(true);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={shouldPrevent.value}
          onChange$={(_, el) => (shouldPrevent.value = el.checked)}
        />
        Prevent navigation
      </label>

      <a
        href="https://example.com"
        target="_blank"
        data-prevent={shouldPrevent.value}  // ← state via data attribute
        onClick$={[
          // sync$ — synchronous, no access to component state
          sync$((e: MouseEvent, target: HTMLAnchorElement) => {
            if (target.hasAttribute('data-prevent')) {
              e.preventDefault();
            }
          }),
          // async $ — has access to state
          $(() => {
            console.log('Prevented:', shouldPrevent.value);
          }),
        ]}
      >
        Go to example.com
      </a>
    </div>
  );
});
```

**When you don't need sync$ — use declarative modifiers:**
```tsx
// Simpler for basic cases
<form preventdefault:submit onSubmit$={handler}>
<a stoppropagation:click onClick$={handler}>
```

---

## Streaming / Deferred Loaders

Render the page without waiting for heavy data.

```tsx
import { Resource, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

// Return an async function — QwikCity streams the render
export const useHeavyData = routeLoader$(async () => {
  return async () => {  // ← key point: nested async function
    await delay(4000);  // Page renders while this is in progress
    return await fetchFromSlowApi();
  };
});

export default component$(() => {
  const data = useHeavyData();

  return (
    <div>
      <h1>Title — renders immediately</h1>  {/* ← shown right away */}

      <Resource
        value={data}
        onPending={() => <div class="skeleton">Loading data...</div>}
        onRejected={(err) => <div class="error">Error: {err.message}</div>}
        onResolved={(d) => <DataWidget data={d} />}
      />

      <footer>Footer — also immediate</footer>  {/* ← also right away */}
    </div>
  );
});
```

---

## Portals

Render content outside the component's DOM tree (for modals, tooltips).

```tsx
// Uses PortalProvider from @qwik-ui/headless or a custom implementation
import { component$, useContext } from '@builder.io/qwik';
import { PortalAPI } from './portal-provider';

export const Modal = component$(() => {
  const portal = useContext(PortalAPI);

  return (
    <div>
      <button onClick$={() => portal.open('modal-name')}>
        Open Modal
      </button>
      {/* Content renders in the portal, not here */}
    </div>
  );
});
```

---

## Detect img onLoad

Track image load without useVisibleTask$.

```tsx
import { component$, useSignal } from '@builder.io/qwik';

export const LazyImage = component$<{ src: string; alt: string }>(({ src, alt }) => {
  const isLoaded = useSignal(false);

  return (
    <div class={{ 'img-wrapper': true, loaded: isLoaded.value }}>
      {!isLoaded.value && <div class="skeleton" />}
      <img
        src={src}
        alt={alt}
        onLoad$={() => (isLoaded.value = true)}
        onError$={() => console.error('Failed to load:', src)}
        class={{ hidden: !isLoaded.value }}
      />
    </div>
  );
});
```

---

## Combine Request Handlers

Reuse middleware logic with higher-order functions.

```tsx
// src/lib/middleware.ts
import type { RequestHandler } from '@builder.io/qwik-city';

export const withAuth = (handler: RequestHandler): RequestHandler =>
  async (event) => {
    const token = event.cookie.get('token')?.value;
    if (!token) throw event.redirect(302, '/login');
    event.sharedMap.set('userId', decodeToken(token));
    await handler(event);
  };

// src/routes/admin/index.tsx
export const onRequest: RequestHandler = withAuth(async ({ next }) => {
  await next();
});
```

---

## View Transitions

SPA page transitions using the Chrome View Transitions API.

```tsx
// src/routes/layout.tsx
import { component$, Slot, useOnDocument, $ } from '@builder.io/qwik';

export default component$(() => {
  useOnDocument('qinit', $(() => {
    // Add in global.css:
    // ::view-transition-old(root) { animation: ... }
    // ::view-transition-new(root) { animation: ... }
  }));

  return (
    <div style={{ viewTransitionName: 'root' }}>
      <Slot />
    </div>
  );
});
```
