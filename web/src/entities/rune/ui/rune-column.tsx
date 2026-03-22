import { component$, type PropFunction } from "@builder.io/qwik";
import type { Rune } from "../model/types";
import { EmptyRuneState } from "./empty-rune-state";
import { SelectionItem } from "~/widgets/common/ui";

export interface RuneColumnProps {
  runes: Rune[];
  title?: string;
  isSecondary?: boolean;
  selectedRuneIds: (string | null)[];
  onRuneClick$?: PropFunction<(runeId: string, tier: number) => void>;
  onRuneEnter$?: PropFunction<(rune: Rune, rect: DOMRect) => void>;
  onRuneLeave$?: PropFunction<() => void>;
}

export const RuneColumn = component$<RuneColumnProps>((props) => {
  if (props.runes.length === 0) {
    return <EmptyRuneState />;
  }

  // Group runes by tier
  const tiers = Array.from(new Set(props.runes.map((r) => r.tier))).sort(
    (a, b) => a - b,
  );

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
                <SelectionItem
                  key={rune.id}
                  shape="circle"
                  isActive={props.selectedRuneIds.includes(rune.id)}
                  onClick$={() => props.onRuneClick$?.(rune.id, tier)}
                  onPointerEnter$={(event) => {
                    if (event.pointerType === "touch") return;
                    const element = event.target as HTMLElement;
                    const button = element.closest("button");
                    if (button) {
                      const rect = button.getBoundingClientRect();
                      props.onRuneEnter$?.(rune, rect);
                    }
                  }}
                  onPointerLeave$={() => props.onRuneLeave$?.()}
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
                </SelectionItem>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});
