import { component$, type PropFunction } from '@builder.io/qwik';

interface ChampionListItemProps {
  id: string;
  name: string;
  avatarUrl: string;
  onClick$: PropFunction<() => void>;
}

export const ChampionListItem = component$<ChampionListItemProps>((props) => {
  return (
    <div 
      class="group relative flex flex-col items-center p-0.5"
    >
      <button
        type="button"
        onClick$={props.onClick$}
        class="w-16 h-16 rounded-md overflow-hidden border border-accent hover:border-active transition-all hover:scale-110 active:scale-95 bg-surface-hover shadow-sm cursor-pointer"
      >
        <img 
          src={props.avatarUrl} 
          alt={props.name} 
          class="w-full h-full object-cover" 
          width={64} 
          height={64} 
          loading="lazy"
        />
      </button>
      
      {/* Tooltip: CSS-only using group-hover */}
      <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-surface text-text text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60] shadow-md border border-accent">
        {props.name}
      </span>
    </div>
  );
});
