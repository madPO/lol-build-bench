import { component$, $, type QRL } from "@builder.io/qwik";
import type { Rune } from "../model/types";
import { EmptyRuneState } from "./empty-rune-state";

export interface RuneColumnProps {
  runes: Rune[];
  title?: string;
  isSecondary?: boolean;
  selectedRuneIds: (string | null)[];
  onRuneClick$?: QRL<(runeId: string, tier: number) => void>;
  onRuneEnter$?: QRL<(rune: Rune, rect: DOMRect) => void>;
  onRuneLeave$?: QRL<() => void>;
}

export const RuneColumn = component$<RuneColumnProps>((props) => {
  if (props.runes.length === 0) {
    return <EmptyRuneState />;
  }

  // Group runes by tier
  const tiers = Array.from(new Set(props.runes.map((r) => r.tier))).sort(
    (a, b) => a - b,
  );

  const handleClick = $((runeId: string, tier: number) => {
    props.onRuneClick$?.(runeId, tier);
  });

  const handlePointerEnter = $((event: PointerEvent, rune: Rune) => {
    if (event.pointerType === "touch") return;
    const element = event.target as HTMLElement;
    const button = element.closest("button");
    if (button) {
      const rect = button.getBoundingClientRect();
      props.onRuneEnter$?.(rune, rect);
    }
  });

  const handlePointerLeave = $(() => {
    props.onRuneLeave$?.();
  });

  return (
    <div class="flex flex-col gap-4 p-3 rounded-lg bg-surface text-text w-full h-full border border-accent">
      {tiers.map((tier) => (
        <div
          key={tier}
          class={[
            "space-y-2",
            props.isSecondary && tier === 0
              ? "opacity-20 pointer-events-none grayscale"
              : "",
          ]}
        >
          <div class="flex flex-wrap justify-center gap-2">
            {props.runes
              .filter((r) => r.tier === tier)
              .map((rune) => (
                <div key={rune.id} class="group relative flex flex-col items-center p-0.5">
                  <button
                    type="button"
                    onClick$={() => handleClick(rune.id, tier)}
                    onPointerEnter$={(e) => handlePointerEnter(e, rune)}
                    onPointerLeave$={handlePointerLeave}
                    class={`
                      overflow-hidden transition-all shadow-sm flex items-center justify-center p-0 w-12 h-12 rounded-full cursor-pointer bg-surface-hover border
                      ${props.selectedRuneIds.includes(rune.id) ? "border-active scale-110 shadow-lg" : "border-accent hover:border-active hover:scale-110 active:scale-95"}
                    `}
                  >
                    <img
                      src={rune.iconUrl}
                      alt={rune.name}
                      class={[
                        "object-contain transition-opacity w-10 h-10",
                        props.selectedRuneIds.includes(rune.id)
                          ? "opacity-100"
                          : "opacity-60 group-hover:opacity-100",
                      ]}
                      width={40}
                      height={40}
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});
