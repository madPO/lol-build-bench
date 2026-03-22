import { component$, type QRL } from "@builder.io/qwik";

interface ChampionAvatarProps {
  avatarUrl?: string;
  name?: string;
  onClick$?: QRL<() => void>;
}

export const ChampionAvatar = component$<ChampionAvatarProps>((props) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick$={props.onClick$}
      onKeyDown$={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          props.onClick$?.();
        }
      }}
      class="w-32 h-32 border-2 border-dashed border-accent flex items-center justify-center cursor-pointer hover:border-active transition-colors bg-surface-hover rounded-md overflow-hidden shrink-0 z-10"
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
          <span class="text-text/60 text-4xl font-light">+</span>
          <span class="text-text/70 text-xs font-medium uppercase mt-1">
            Select
          </span>
        </div>
      )}
    </div>
  );
});
