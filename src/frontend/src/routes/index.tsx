import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="grid flex-1 grid-cols-3 grid-rows-3 gap-2.5 p-2.5">
      <div class="col-span-1 row-span-2 border border-amber-300/20 bg-zinc-800">
        Block 1
      </div>
      <div class="col-span-2 row-span-1 border border-amber-300/20 bg-zinc-800">
        Block 2
      </div>
      <div class="col-span-1 row-span-1 border border-amber-300/20 bg-zinc-800">
        Block 4
      </div>
      <div class="col-span-1 row-span-1 border border-amber-300/20 bg-zinc-800">
        Block 5
      </div>
      <div class="col-span-3 row-span-1 border border-amber-300/20 bg-zinc-800">
        Block 6
      </div>
    </div>
  );
});
