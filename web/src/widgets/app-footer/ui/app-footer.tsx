import { component$ } from "@builder.io/qwik";
import { GITHUB_REPO_URL, LOL_GAME_PATCH } from "~/app/config/constants";

export const AppFooter = component$(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="w-full bg-slate-900/80 border-t border-slate-700/50 px-6 py-2 flex items-center justify-between text-xs text-slate-400 font-medium backdrop-blur-md">
      <div class="flex items-center gap-4">
        <span>© {currentYear} LoL Build Bench</span>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-blue-400 transition-colors flex items-center gap-1"
        >
          GitHub
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </a>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] uppercase tracking-wider text-slate-300 border border-slate-700">
          Patch {LOL_GAME_PATCH}
        </span>
      </div>
    </footer>
  );
});
