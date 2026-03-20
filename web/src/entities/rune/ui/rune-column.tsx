import { component$, type PropFunction } from '@builder.io/qwik';
import type { Rune } from '../model/types';
import { EmptyRuneState } from './empty-rune-state';

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
  const tiers = Array.from(new Set(props.runes.map((r) => r.tier))).sort((a, b) => a - b);

  return (
    <div class="flex flex-col gap-4 p-3 rounded-lg bg-gray-50/50 w-full h-full border-l border-gray-100">
      {tiers.map((tier) => (
        <div key={tier} class={['space-y-2', props.isSecondary && tier === 0 ? 'opacity-20 pointer-events-none grayscale' : '']}>
          <div class="flex flex-wrap justify-center gap-2">
            {props.runes
              .filter((r) => r.tier === tier)
              .map((rune) => (
                <div
                  key={rune.id}
                  onClick$={() => props.onRuneClick$?.(rune.id, tier)}
                  class={[
                    'group relative flex items-center justify-center p-1 rounded-lg border-2 transition-all cursor-pointer',
                    props.selectedRuneIds.includes(rune.id) 
                      ? (props.isSecondary ? 'border-green-500 bg-green-50/50 scale-105 shadow-sm' : 'border-amber-500 bg-amber-50/50 scale-105 shadow-sm') 
                      : 'border-transparent hover:border-gray-200 hover:bg-white'
                  ]}
                  onPointerEnter$={(event) => {
                    if (event.pointerType === 'touch') return;
                    const element = event.target as HTMLElement;
                    const rect = element.getBoundingClientRect();
                    props.onRuneEnter$?.(rune, rect);
                  }}
                  onPointerLeave$={() => props.onRuneLeave$?.()}
                >
                  <img 
                    src={rune.iconUrl} 
                    alt={rune.name} 
                    class={[
                      'object-contain transition-opacity w-10 h-10',
                      props.selectedRuneIds.includes(rune.id) ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                    ]}
                    width={40}
                    height={40}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});
