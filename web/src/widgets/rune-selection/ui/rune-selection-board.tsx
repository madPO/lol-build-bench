import { component$, useContext, $, useComputed$, useSignal } from '@builder.io/qwik';
import type { RuneBranch } from '~/entities/rune-branch/model/types';
import { BranchSelector } from '~/features/select-rune-branch/ui/branch-selector';
import { calculateNewSelectionState, selectRune } from '~/features/select-rune-branch/model/transformations';
import { RuneColumn } from '~/entities/rune/ui/rune-column';
import { EmptyRuneState } from '~/entities/rune/ui/empty-rune-state';
import { getRunesByBranch } from '~/entities/rune/api';
import type { Rune } from '~/entities/rune/model/types';
import { BuildContext } from '~/app/config/build-context';

export interface RuneSelectionBoardProps {
  branches: RuneBranch[];
  initialPrimaryBranchId?: string;
  initialSecondaryBranchId?: string;
}

export const RuneSelectionBoard = component$<RuneSelectionBoardProps>((props) => {
  const buildState = useContext(BuildContext);
  const state = buildState.runeConfig;

  const hoveredRuneData = useSignal<{ rune: Rune; x: number; y: number } | null>(null);

  const handleBranchClick$ = $((branchId: string) => {
    const newState = calculateNewSelectionState(state, branchId);
    state.primaryBranchId = newState.primaryBranchId;
    state.secondaryBranchId = newState.secondaryBranchId;
    state.primaryRuneIds = newState.primaryRuneIds;
    state.secondaryRuneIds = newState.secondaryRuneIds;
  });

  const handleRuneClick$ = $((runeId: string, tier: number, isSecondary: boolean) => {
    const newState = selectRune(state, runeId, tier, isSecondary);
    state.primaryRuneIds = newState.primaryRuneIds;
    state.secondaryRuneIds = newState.secondaryRuneIds;
  });

  const handleRuneEnter$ = $((rune: Rune, rect: DOMRect) => {
    // Calculate positioning with overflow handling (similar to items)
    const x = rect.right + 8 + 320 > window.innerWidth 
      ? rect.left - 320 - 8 
      : rect.right + 8;
    
    const tooltipMaxHeight = window.innerHeight * 0.6;
    const y = rect.top + tooltipMaxHeight > window.innerHeight
      ? Math.max(8, window.innerHeight - tooltipMaxHeight - 8)
      : rect.top;

    hoveredRuneData.value = { rune, x, y };
  });

  const handleRuneLeave$ = $(() => {
    hoveredRuneData.value = null;
  });

  const primaryRunes = useComputed$(() => {
    return getRunesByBranch(state.primaryBranchId);
  });

  const secondaryRunes = useComputed$(() => {
    return getRunesByBranch(state.secondaryBranchId);
  });

  return (
    <div class="card bg-white rounded-lg shadow p-4 h-full flex flex-col relative">
      <div class="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 flex-1 min-h-0 overflow-y-auto">
        <BranchSelector
          branches={props.branches}
          primaryBranchId={state.primaryBranchId}
          secondaryBranchId={state.secondaryBranchId}
          onBranchClick$={handleBranchClick$}
        />
        
        <div class="flex flex-col border-l border-gray-100 pl-6 h-full">
           {!state.primaryBranchId && !state.secondaryBranchId ? (
             <div class="flex items-center justify-center h-full">
               <EmptyRuneState />
             </div>
           ) : (
             <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {state.primaryBranchId && (
                  <RuneColumn 
                    runes={primaryRunes.value} 
                    title="Primary Path" 
                    isSecondary={false} 
                    selectedRuneIds={state.primaryRuneIds}
                    onRuneClick$={(runeId, tier) => handleRuneClick$(runeId, tier, false)}
                    onRuneEnter$={handleRuneEnter$}
                    onRuneLeave$={handleRuneLeave$}
                  />
                )}
                {state.secondaryBranchId && (
                  <RuneColumn 
                    runes={secondaryRunes.value} 
                    title="Secondary Path" 
                    isSecondary={true} 
                    selectedRuneIds={state.secondaryRuneIds}
                    onRuneClick$={(runeId, tier) => handleRuneClick$(runeId, tier, true)}
                    onRuneEnter$={handleRuneEnter$}
                    onRuneLeave$={handleRuneLeave$}
                  />
                )}
             </div>
           )}
        </div>
      </div>

      {/* Rune Tooltip */}
      {hoveredRuneData.value && (
        <div
          class="fixed z-[100] bg-white text-gray-800 border shadow-2xl rounded-lg p-3 max-w-[320px] pointer-events-none"
          style={{
            top: `${hoveredRuneData.value.y}px`,
            left: `${hoveredRuneData.value.x}px`,
          }}
        >
          <div class="max-h-[60vh] overflow-y-auto">
            <div class="font-bold text-sm mb-1 text-blue-600">{hoveredRuneData.value.rune.name}</div>
            <div class="text-xs opacity-90 leading-relaxed text-gray-600">
              {hoveredRuneData.value.rune.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
