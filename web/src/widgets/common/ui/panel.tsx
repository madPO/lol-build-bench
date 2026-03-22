import { component$, Slot } from "@builder.io/qwik";

interface PanelProps {
  class?: string;
}

export const Panel = component$<PanelProps>((props) => {
  return (
    <div
      class={`bg-surface/80 text-text backdrop-blur border border-accent rounded-xl p-4 shadow-xl ${props.class || ""}`}
    >
      <Slot />
    </div>
  );
});
