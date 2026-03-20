import { component$, type PropFunction } from '@builder.io/qwik';
import type { RuneBranch } from '../model/types';

export interface RuneBranchIconProps {
  branch: RuneBranch;
  isSelected: boolean;
  isPrimary: boolean;
  onClick$: PropFunction<() => void>;
}

export const RuneBranchIcon = component$<RuneBranchIconProps>((props) => {
  return (
    <div
      onClick$={props.onClick$}
      class={[
        'group relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all border-2',
        props.isSelected 
          ? (props.isPrimary ? 'border-amber-400 scale-110 shadow-lg' : 'border-blue-400 scale-105 shadow-md') 
          : 'border-transparent grayscale hover:grayscale-0 hover:border-gray-300'
      ]}
    >
      <img 
        src={props.branch.iconUrl} 
        alt={props.branch.name} 
        class="w-8 h-8 object-contain"
        width={32}
        height={32}
      />
      
      {/* Tooltip */}
      <div class="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-white text-gray-800 text-[10px] font-bold uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-gray-200 shadow-xl">
        {props.branch.name}
        <div class="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white" />
      </div>
    </div>
  );
});
