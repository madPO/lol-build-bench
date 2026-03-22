import { component$, Slot, type PropFunction } from "@builder.io/qwik";

interface SelectionItemProps {
  onClick$?: PropFunction<() => void>;
  onPointerEnter$?: PropFunction<(e: PointerEvent) => void>;
  onPointerLeave$?: PropFunction<() => void>;
  disabled?: boolean;
  size?: "md" | "lg"; // md=12x12(48px), lg=16x16(64px)
  shape?: "square" | "circle";
  ariaLabel?: string;
  tooltipText?: string;
  class?: string;
  isActive?: boolean;
}

export const SelectionItem = component$<SelectionItemProps>(
  ({
    size = "md",
    shape = "square",
    disabled = false,
    isActive = false,
    tooltipText,
    ...props
  }) => {
    const sizeClass = size === "lg" ? "w-16 h-16" : "w-12 h-12";
    const shapeClass = shape === "circle" ? "rounded-full" : "rounded-md";
    const activeClass = isActive
      ? "border-active scale-110 shadow-lg"
      : "border-accent hover:border-active hover:scale-110 active:scale-95";

    return (
      <div
        class={`group relative flex flex-col items-center p-0.5 ${props.class || ""}`}
      >
        <button
          type="button"
          disabled={disabled}
          aria-label={props.ariaLabel}
          aria-disabled={disabled}
          onClick$={props.onClick$}
          onPointerEnter$={props.onPointerEnter$}
          onPointerLeave$={props.onPointerLeave$}
          class={`
          overflow-hidden transition-all shadow-sm flex items-center justify-center p-0 w-full h-full cursor-pointer
          ${sizeClass}
          ${shapeClass}
          ${
            disabled
              ? "bg-surface-hover cursor-not-allowed opacity-50 border border-transparent"
              : `bg-surface-hover border ${activeClass}`
          }
        `}
        >
          <Slot />
        </button>

        {/* CSS-only simple tooltip if provided */}
        {tooltipText && (
          <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-surface text-text text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60] shadow-md border border-accent">
            {tooltipText}
          </span>
        )}
      </div>
    );
  },
);
