# QwikCity — Routing, Loaders, Actions, Middleware

Source: [https://qwik.dev/docs/routing/](https://qwik.dev/docs/routing/),
[https://qwik.dev/docs/route-loader/](https://qwik.dev/docs/route-loader/),
[https://qwik.dev/docs/action/](https://qwik.dev/docs/action/),
[https://qwik.dev/docs/middleware/](https://qwik.dev/docs/middleware/)

---

## File-based Routing

```
src/routes/
├── index.tsx                       # / (home page)
├── layout.tsx                      # Root layout for all pages
├── about/
│   └── index.tsx                   # /about
├── blog/
│   ├── layout.tsx                  # Layout for /blog/*
│   ├── index.tsx                   # /blog
│   └── [slug]/
│       └── index.tsx               # /blog/:slug
├── docs/
│   └── [id]/
│       └── index.ts                # /docs/:id (endpoint, no JSX)
├── [...catchall]/
│   └── index.tsx                   # Catch-all fallback
└── (auth)/                         # Route group (no URL impact)
    ├── layout.tsx
    └── login/
        └── index.tsx               # /login
```

**File → URL mapping:**

| File | URL |
|------|-----|
| `routes/index.tsx` | `/` |
| `routes/about/index.tsx` | `/about` |
| `routes/user/[name]/index.tsx` | `/user/:name` |
| `routes/post/[...all]/index.tsx` | `/post/*` |

---

## Layout

```tsx
// src/routes/layout.tsx
import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => (
  <html>
    <body>
      <Header />
      <main>
        <Slot />  {/* child page renders here */}
      </main>
      <Footer />
    </body>
  </html>
));
```

**Execution order** for `/admin/users`:
1. `routes/layout.tsx` → `onRequest`
2. `routes/admin/layout.tsx` → `onRequest`
3. `routes/admin/users/index.tsx` → `onRequest`
4. globalLoaders
5. routeLoaders
6. Component render (root to leaf)

---

## Dynamic Routes and Params

```tsx
// src/routes/product/[id]/index.tsx
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();
  return (
    <div>
      <p>Product ID: {loc.params.id}</p>
      <p>URL: {loc.url.href}</p>
      <p>Pathname: {loc.url.pathname}</p>
      <p>Is navigating: {loc.isNavigating}</p>
    </div>
  );
});
```

**Query params:**
```tsx
const loc = useLocation();
const page = loc.url.searchParams.get('page') ?? '1';
```

---

## Navigation

```tsx
import { Link, useNavigate, useLocation } from '@builder.io/qwik-city';

// Declarative (preferred, supports prefetch)
<Link href="/products">Products</Link>
<Link href="/products" prefetch={false}>No prefetch</Link>
<Link reload>Refresh page</Link>

// Programmatic
const nav = useNavigate();
await nav('/dashboard');
await nav();           // reload current page
await nav('/login', { replaceState: true });
```

---

## routeLoader$

Fetches data on the server for the current route.

### Rules
- Export ONLY from `index.tsx` or `layout.tsx`
- To reuse: define in a separate file, re-export from the route file
- Runs after middleware, before component render
- Accessible in any component on the same route

### Basic pattern

```tsx
import { routeLoader$ } from '@builder.io/qwik-city';

// Definition
export const useProduct = routeLoader$(async ({ params, fail }) => {
  const product = await db.products.findById(params.id);
  if (!product) return fail(404, { error: 'Product not found' });
  return { id: product.id, name: product.name, price: product.price };
});

// Usage in component
export default component$(() => {
  const product = useProduct(); // Signal<Product | { error: string }>

  if (product.value.error) {
    return <p class="error">{product.value.error}</p>;
  }

  return <h1>{product.value.name} — ${product.value.price}</h1>;
});
```

### Multiple loaders

```tsx
export const useLoginStatus = routeLoader$(async ({ cookie }) => ({
  isLoggedIn: !!cookie.get('session')?.value,
}));

export const useCurrentUser = routeLoader$(async ({ cookie, sharedMap }) => {
  // Can use sharedMap for data from middleware
  return sharedMap.get('user') as User | null;
});

export default component$(() => {
  const status = useLoginStatus();
  const user = useCurrentUser();
  return status.value.isLoggedIn
    ? <p>Hello, {user.value?.name}</p>
    : <p>Please log in</p>;
});
```

### resolveValue — access another loader

```tsx
export const useProduct = routeLoader$(async ({ params }) => {
  return await db.products.findById(params.id);
});

export const useRelated = routeLoader$(async (req) => {
  const product = await req.resolveValue(useProduct);
  return await db.products.findByCategory(product.categoryId);
});
```

### Reuse across routes

```tsx
// src/services/user.ts
export const useCurrentUser = routeLoader$(async ({ cookie }) => {
  return getUserFromCookie(cookie);
});

// src/routes/profile/index.tsx
export { useCurrentUser } from '~/services/user'; // re-export is required!

export default component$(() => {
  const user = useCurrentUser();
  return <p>{user.value?.name}</p>;
});
```

### Deferred (streaming) loader

```tsx
export const useSlowData = routeLoader$(async () => {
  // Return an async function — page renders without waiting
  return async () => {
    await delay(3000);
    return await fetchHeavyData();
  };
});

export default component$(() => {
  const data = useSlowData();
  return (
    <>
      <div>This renders immediately</div>
      <Resource
        value={data}
        onPending={() => <Spinner />}
        onResolved={(d) => <DataView data={d} />}
      />
    </>
  );
});
```

---

## routeAction$

Handles mutations and form submissions. Works with and without JS.

```tsx
import { routeAction$, zod$, z, Form } from '@builder.io/qwik-city';

// Basic action
export const useCreatePost = routeAction$(
  async (data, { fail, redirect }) => {
    const id = await db.posts.create(data);
    if (!id) return fail(500, { message: 'Failed to create post' });
    throw redirect(302, `/posts/${id}`);
  },
  zod$({
    title: z.string().min(3).max(100),
    body: z.string().min(10),
    tags: z.array(z.string()).optional(),
  })
);

export default component$(() => {
  const action = useCreatePost();
  return (
    <Form action={action}>
      <input
        name="title"
        value={action.formData?.get('title')}
      />
      {action.value?.failed && (
        <p class="error">{action.value.fieldErrors?.title}</p>
      )}
      <textarea name="body" />
      <button type="submit" disabled={action.isRunning}>
        {action.isRunning ? 'Saving...' : 'Create Post'}
      </button>
    </Form>
  );
});
```

### Programmatic action call

```tsx
const action = useCreatePost();
const { value } = await action.submit({
  title: 'My Post',
  body: 'Content here',
});
console.log(value.success, value.id);
```

### File upload

```tsx
export const useUpload = routeAction$(async ({ file }) => {
  await saveFile(file);
  return { success: true };
});

// In component
const fileRef = useSignal<HTMLInputElement>();
<input type="file" ref={fileRef} />
<button onClick$={async () => {
  const file = fileRef.value?.files?.[0];
  if (file) {
    const fd = new FormData();
    fd.append('file', file);
    await action.submit(fd);
  }
}}>Upload</button>
```

### Dynamic validation with zod$

```tsx
export const useAddUser = routeAction$(
  async (user) => { /* ... */ },
  zod$((z, requestEvent) => {
    const isAdmin = requestEvent.url.searchParams.get('admin') === '1';
    return z.object({
      name: z.string(),
      role: isAdmin ? z.string() : z.literal('user'),
    });
  })
);
```

### globalAction$ — available on any route

```tsx
// src/actions/auth.ts
import { globalAction$, zod$, z } from '@builder.io/qwik-city';

export const useLogin = globalAction$(
  async ({ email, password }, { cookie, redirect }) => {
    const user = await auth.verify(email, password);
    if (!user) return { success: false, error: 'Invalid credentials' };
    cookie.set('session', user.sessionToken, { httpOnly: true, path: '/' });
    throw redirect(302, '/dashboard');
  },
  zod$({ email: z.string().email(), password: z.string().min(8) })
);

// Usage in any component/layout without re-export
const login = useLogin();
```

---

## Middleware

### onRequest / onGet / onPost / ...

```tsx
import type { RequestHandler } from '@builder.io/qwik-city';

// Runs for any HTTP method
export const onRequest: RequestHandler = async ({
  next, request, url, cookie, redirect, sharedMap, env
}) => {
  console.log(`${request.method} ${url.pathname}`);
  await next(); // pass control to the next handler
};

// GET only
export const onGet: RequestHandler = async ({ cacheControl, json }) => {
  cacheControl({ maxAge: 60 * 60, staleWhileRevalidate: 60 * 60 * 24 });
};

// Authentication
export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  const session = cookie.get('session')?.value;
  if (!session) throw redirect(302, '/login');
};

// Logging + sharedMap
export const onRequest: RequestHandler = async ({ next, sharedMap, url }) => {
  const start = Date.now();
  sharedMap.set('requestStart', start);
  await next();
  console.log(`${url.pathname} — ${Date.now() - start}ms`);
};
```

### plugin.ts — global middleware

```ts
// src/routes/plugin.ts
import type { RequestHandler } from '@builder.io/qwik-city';

// Runs for ALL requests (including server$)
export const onRequest: RequestHandler = async ({ next, request }) => {
  // Global security headers
  // Logging
  // Rate limiting
  await next();
};
```

### REST endpoint

```ts
// src/routes/api/products/index.ts (.ts only, no JSX)
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ json, query }) => {
  const page = Number(query.get('page') ?? 1);
  const products = await db.products.list({ page });
  json(200, products);
};

export const onPost: RequestHandler = async ({ parseBody, json }) => {
  const body = await parseBody() as CreateProductDto;
  const product = await db.products.create(body);
  json(201, product);
};

export const onDelete: RequestHandler = async ({ params, json }) => {
  await db.products.delete(params.id);
  json(204, null);
};
```

### Full RequestEvent API

| Property/method | Description |
|-----------------|-------------|
| `params` | URL path params (`/user/[id]` → `params.id`) |
| `query` | URLSearchParams query string |
| `url` | Full URL object |
| `request` | Native Request object |
| `method` | HTTP method |
| `headers` | Response headers |
| `cookie` | Cookies (get/set) |
| `env` | Environment variables |
| `sharedMap` | Shared data between handlers |
| `next()` | Next middleware handler |
| `redirect(status, url)` | Redirect (must throw) |
| `error(status, msg)` | Error response (must throw) |
| `json(status, data)` | JSON response |
| `html(status, html)` | HTML response |
| `text(status, text)` | Text response |
| `send(response)` | Native Response |
| `cacheControl(opts)` | Cache-Control header |
| `locale(lang?)` | Get/Set locale |
| `parseBody()` | Parse request body |
| `getWritableStream()` | Streaming response |
| `platform` | Platform-specific data |

---

## vite.config.ts configuration

```ts
import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';

export default defineConfig(() => ({
  plugins: [
    qwikCity({
      rewriteRoutes: [
        {
          prefix: 'es',
          paths: { 'about': 'acerca-de', 'docs': 'documentacion' },
        },
      ],
    }),
    qwikVite(),
  ],
}));
```
