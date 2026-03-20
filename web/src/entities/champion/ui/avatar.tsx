import { component$, type PropFunction } from '@builder.io/qwik';

interface ChampionAvatarProps {
  avatarUrl?: string;
  name?: string;
  onClick$?: PropFunction<() => void>;
}

export const ChampionAvatar = component$<ChampionAvatarProps>((props) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick$={props.onClick$}
      onKeyDown$={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          props.onClick$?.();
        }
      }}
      class="w-32 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 rounded-md overflow-hidden shrink-0 z-10"
    >
      {props.avatarUrl ? (
        <img 
          src={props.avatarUrl} 
          alt={props.name} 
          class="w-full h-full object-cover pointer-events-none" 
          width={128}
          height={128}
        />
      ) : (
        <div class="flex flex-col items-center pointer-events-none">
          <span class="text-gray-400 text-4xl font-light">+</span>
          <span class="text-gray-500 text-xs font-medium uppercase mt-1">Select</span>
        </div>
      )}
    </div>
  );
});
