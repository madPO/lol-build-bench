import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class="flex min-h-screen flex-col">
        <nav class="border-b border-zinc-800 bg-zinc-950">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 justify-between"></div>
          </div>
        </nav>
        <main class="flex flex-1">
          <Slot />
        </main>
      </div>
    </>
  );
});
