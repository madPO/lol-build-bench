import { component$, useContext } from "@builder.io/qwik";
import { BuildContext } from "~/app/config/build-context";
import { getItemImageUrl } from "~/entities/item";
import { Panel } from "~/widgets/common/ui";

export const ItemInventory = component$(() => {
  const buildState = useContext(BuildContext);

  return (
    <Panel class="w-full h-full flex flex-col items-center justify-start !p-3">
      <div class="grid grid-cols-2 grid-rows-3 gap-2 shrink-0">
        {buildState.inventory.map((item, index) => (
          <div
            key={index}
            class="w-12 h-12 bg-surface-hover border border-accent rounded-lg overflow-hidden relative group flex items-center justify-center transition-all hover:scale-110 active:scale-95 hover:border-active z-10 hover:z-20 shadow-sm"
          >
            {item ? (
              <>
                <img
                  src={getItemImageUrl(item.image)}
                  alt={item.name}
                  width={48}
                  height={48}
                  class="w-full h-full object-cover rounded"
                  loading="lazy"
                />
                <button
                  onClick$={() => {
                    buildState.inventory[index] = null;
                  }}
                  class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  aria-label={`Remove ${item.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-white"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </>
            ) : (
              <div class="w-full h-full flex items-center justify-center text-text/30 text-lg font-light">
                +
              </div>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
});
