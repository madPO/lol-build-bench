import { component$, type PropFunction } from "@builder.io/qwik";
import type { RuneBranch } from "~/entities/rune-branch/model/types";
import { RuneBranchIcon } from "~/entities/rune-branch/ui/rune-branch-icon";

export interface BranchSelectorProps {
  branches: RuneBranch[];
  primaryBranchId: string | null;
  secondaryBranchId: string | null;
  onBranchClick$: PropFunction<(branchId: string) => void>;
}

export const BranchSelector = component$<BranchSelectorProps>((props) => {
  return (
    <div class="flex flex-col items-center gap-4 p-4 bg-surface text-text border border-accent rounded-lg">
      {props.branches.map((branch) => (
        <RuneBranchIcon
          key={branch.id}
          branch={branch}
          isSelected={
            branch.id === props.primaryBranchId ||
            branch.id === props.secondaryBranchId
          }
          isPrimary={branch.id === props.primaryBranchId}
          onClick$={() => props.onBranchClick$(branch.id)}
        />
      ))}
    </div>
  );
});
