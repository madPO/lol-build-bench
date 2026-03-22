import { component$, type PropFunction } from "@builder.io/qwik";
import type { RuneBranch } from "../model/types";
import { SelectionItem } from "~/widgets/common/ui";

export interface RuneBranchIconProps {
  branch: RuneBranch;
  isSelected: boolean;
  isPrimary: boolean;
  onClick$: PropFunction<() => void>;
}

export const RuneBranchIcon = component$<RuneBranchIconProps>((props) => {
  return (
    <SelectionItem
      shape="circle"
      size="md"
      isActive={props.isSelected}
      onClick$={props.onClick$}
      tooltipText={props.branch.name}
      class={!props.isSelected ? "grayscale hover:grayscale-0" : ""}
    >
      <img
        src={props.branch.iconUrl}
        alt={props.branch.name}
        class="w-8 h-8 object-contain"
        width={32}
        height={32}
      />
    </SelectionItem>
  );
});
