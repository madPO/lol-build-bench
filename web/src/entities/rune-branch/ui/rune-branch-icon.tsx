import { component$, type QRL } from "@builder.io/qwik";
import type { RuneBranch } from "../model/types";

export interface RuneBranchIconProps {
  branch: RuneBranch;
  isSelected: boolean;
  isPrimary: boolean;
  onClick$: QRL<() => void>;
}

export const RuneBranchIcon = component$<RuneBranchIconProps>((props) => {
  return (
    <div class={`group relative flex flex-col items-center p-0.5 ${!props.isSelected ? "grayscale hover:grayscale-0" : ""}`}>
      <button
        type="button"
        onClick$={props.onClick$}
        class={`
          overflow-hidden transition-all shadow-sm flex items-center justify-center p-0 w-12 h-12 rounded-full cursor-pointer bg-surface-hover border
          ${props.isSelected ? "border-active scale-110 shadow-lg" : "border-accent hover:border-active hover:scale-110 active:scale-95"}
        `}
      >
        <img
          src={props.branch.iconUrl}
          alt={props.branch.name}
          class="w-8 h-8 object-contain"
          width={32}
          height={32}
        />
      </button>
      <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-surface text-text text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60] shadow-md border border-accent">
        {props.branch.name}
      </span>
    </div>
  );
});
