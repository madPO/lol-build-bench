import { component$, Slot, type PropFunction } from "@builder.io/qwik";

interface IconButtonProps {
  onClick$?: PropFunction<() => void>;
  ariaLabel?: string;
  class?: string;
}

export const IconButton = component$<IconButtonProps>((props) => {
  return (
    <button
      type="button"
      onClick$={props.onClick$}
      aria-label={props.ariaLabel}
      class={`text-text/60 hover:text-text p-1 hover:bg-surface-hover rounded-full transition-colors ${props.class || ""}`}
    >
      <Slot />
    </button>
  );
});
