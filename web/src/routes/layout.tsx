import { component$, Slot } from "@builder.io/qwik";
import { AppFooter } from "~/widgets/app-footer/ui/app-footer";

export default component$(() => {
  return (
    <div class="h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground">
      <main class="flex-1 overflow-hidden relative">
        <Slot />
      </main>
      <AppFooter />
    </div>
  );
});
