# Command Palettes
```html
<button command="show-modal" commandfor="dialog" class="rounded-md bg-gray-800/80 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-gray-800/90">Open command palette</button>

<el-dialog>
  <dialog id="dialog" class="backdrop:bg-transparent">
    <el-dialog-backdrop class="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

    <div tabindex="0" class="fixed inset-0 w-screen overflow-y-auto p-4 focus:outline-none sm:p-6 md:p-20">
      <el-dialog-panel class="mx-auto block max-w-xl transform overflow-hidden rounded-xl bg-gray-900 shadow-2xl outline-1 -outline-offset-1 outline-white/10 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in">
        <el-command-palette>
          <div class="grid grid-cols-1 border-b border-white/10">
            <input type="text" autofocus placeholder="Search..." class="col-start-1 row-start-1 h-12 w-full bg-gray-900 pr-4 pl-11 text-base text-white outline-hidden placeholder:text-gray-500 sm:text-sm" />
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-500">
              <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </div>

          <el-command-list hidden class="block max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-200">
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Leslie Alexander</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Michael Foster</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Dries Vincent</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Lindsay Walton</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Courtney Henry</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Tom Cook</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Whitney Francis</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Leonard Krasner</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Floyd Miles</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Emily Selman</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Kristin Watson</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Emma Dorsey</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Alicia Bell</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Jenny Wilson</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Anna Roberts</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Benjamin Russel</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Jeffrey Webb</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Kathryn Murphy</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Lawrence Hunter</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Yvette Armstrong</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Angela Fisher</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Blake Reid</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Hector Gibbons</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Fabricio Mendes</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Jillian Steward</a>
            <a href="#" hidden class="block cursor-default px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">Chelsea Hagon</a>
          </el-command-list>

          <el-no-results hidden class="block p-4 text-sm text-gray-400">No people found.</el-no-results>
        </el-command-palette>
      </el-dialog-panel>
    </div>
  </dialog>
</el-dialog>
```

## With images and descriptions
```html
<!-- Include this script tag or install `@tailwindplus/elements` via npm: -->
<!-- <script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script> -->
<button command="show-modal" commandfor="dialog" class="rounded-md bg-gray-800/80 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-gray-800/90">Open command palette</button>

<el-dialog>
  <dialog id="dialog" class="backdrop:bg-transparent">
    <el-dialog-backdrop class="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

    <div tabindex="0" class="fixed inset-0 w-screen overflow-y-auto p-4 focus:outline-none sm:p-6 md:p-20">
      <el-dialog-panel class="mx-auto block max-w-xl transform overflow-hidden rounded-xl bg-gray-900 shadow-2xl outline-1 -outline-offset-1 outline-white/10 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in">
        <el-command-palette>
          <div class="grid grid-cols-1 border-b border-white/10">
            <input type="text" autofocus placeholder="Search..." class="col-start-1 row-start-1 h-12 w-full bg-gray-900 pr-4 pl-11 text-base text-white outline-hidden placeholder:text-gray-500 sm:text-sm" />
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-500">
              <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </div>

          <el-command-list hidden class="block max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3">
            <a href="#" hidden aria-labelledby="item-1-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-indigo-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-1-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">Text</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add freeform text with basic formatting options.</p>
              </div>
            </a>
            <a href="#" hidden aria-labelledby="item-2-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-blue-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-2-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">Video</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add a video from YouTube, Vimeo or other services.</p>
              </div>
            </a>
            <a href="#" hidden aria-labelledby="item-3-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-violet-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-3-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">Page</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add a new blank page to your project.</p>
              </div>
            </a>
            <a href="#" hidden aria-labelledby="item-4-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-sky-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-4-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">List</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add an ordered or unordered list.</p>
              </div>
            </a>
            <a href="#" hidden aria-labelledby="item-5-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-pink-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-5-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">Board</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add a kanban style board with cards and columns.</p>
              </div>
            </a>
            <a href="#" hidden aria-labelledby="item-6-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-teal-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-6-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">Calendar</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add a full month calendar or a week view calendar.</p>
              </div>
            </a>
            <a href="#" hidden aria-labelledby="item-7-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-cyan-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-7-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">Table</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add a table for displaying larger sets of data.</p>
              </div>
            </a>
            <a href="#" hidden aria-labelledby="item-8-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-fuchsia-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-8-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">Link</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add a link to another page, website, or email address.</p>
              </div>
            </a>
            <a href="#" hidden aria-labelledby="item-9-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-purple-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-9-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">Code</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add raw HTML, JavaScript or CSS code.</p>
              </div>
            </a>
            <a href="#" hidden aria-labelledby="item-10-label" class="group flex cursor-default rounded-xl p-3 select-none focus:outline-hidden aria-selected:bg-white/5">
              <div class="flex size-10 flex-none items-center justify-center rounded-lg bg-rose-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                  <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="ml-4 flex-auto">
                <p id="item-10-label" class="text-sm font-medium text-gray-300 group-aria-selected:text-white">Image</p>
                <p class="text-sm text-gray-400 group-aria-selected:text-gray-300">Add a simple image or a photo gallery.</p>
              </div>
            </a>
          </el-command-list>

          <el-no-results hidden class="block px-6 py-14 text-center text-sm sm:px-14">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="mx-auto size-6 text-gray-500">
              <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="mt-4 font-semibold text-white">No results found</p>
            <p class="mt-2 text-gray-400">No components found for this search term. Please try again.</p>
          </el-no-results>
        </el-command-palette>
      </el-dialog-panel>
    </div>
  </dialog>
</el-dialog>
```

## With footer
```html
<!-- Include this script tag or install `@tailwindplus/elements` via npm: -->
<!-- <script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script> -->
<script type="module">
  function onReady() {
    let command = document.getElementById('command')

    command.querySelector('input').addEventListener('input', (event) => {
      let value = event.target.value
      if (value === '?') {
        command.dataset.mode = 'help'
      } else if (value.startsWith('#')) {
        command.dataset.mode = 'project'
      } else if (value.startsWith('>')) {
        command.dataset.mode = 'user'
      } else {
        delete command.dataset.mode
      }
    })

    command.setFilterCallback(({ query, node, content }) => {
      if (query === '?') {
        return false
      }
      if (query.startsWith('#')) {
        return node.dataset.type === 'project' && content.toLowerCase().includes(query.slice(1).toLowerCase())
      }
      if (query.startsWith('>')) {
        return node.dataset.type === 'user' && content.toLowerCase().includes(query.slice(1).toLowerCase())
      }
      return content.toLowerCase().includes(query.toLowerCase())
    })
  }

  if (customElements.get('el-command')) {
    onReady()
  } else {
    window.addEventListener('elements:ready', onReady)
  }
</script>

<button command="show-modal" commandfor="dialog" class="rounded-md bg-gray-800/80 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-gray-800/90">Open command palette</button>

<el-dialog>
  <dialog id="dialog" class="backdrop:bg-transparent">
    <el-dialog-backdrop class="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

    <div tabindex="0" class="fixed inset-0 w-screen overflow-y-auto p-4 focus:outline-none sm:p-6 md:p-20">
      <el-dialog-panel class="mx-auto block max-w-xl transform overflow-hidden rounded-xl bg-gray-900 shadow-2xl outline-1 -outline-offset-1 outline-white/10 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in">
        <el-command-palette id="command" class="divide-y divide-white/10">
          <div class="grid grid-cols-1">
            <input type="text" autofocus placeholder="Search..." class="col-start-1 row-start-1 h-12 w-full bg-gray-900 pr-4 pl-11 text-base text-white outline-hidden placeholder:text-gray-500 sm:text-sm" />
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-500">
              <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </div>

          <el-command-list hidden class="flex max-h-80 transform-gpu scroll-py-10 scroll-pb-2 flex-col gap-4 overflow-y-auto p-4 pb-2">
            <el-command-group hidden aria-labelledby="projects-label">
              <h2 id="projects-label" class="text-xs font-semibold text-white">Projects</h2>
              <div class="-mx-4 mt-2 text-sm text-gray-300">
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Workflow Inc. / Website Redesign</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Workflow Inc. / Open Graph Image</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Workflow Inc. / Logo Design</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Workflow Inc. / Advertising Campaign</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Conglomerate Inc. / TV Ad Campaign</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Conglomerate Inc. / Mobile App</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Conglomerate Inc. / Product Design</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Conglomerate Inc. / Intranet</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Conglomerate Inc. / Custom Programming</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Multinational LLC. / Creative Writing</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Multinational LLC. / Animation</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Multinational LLC. / Product Illustration</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Products Inc. / Video Production</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Products Inc. / Print Brochure</span>
                </a>
                <a href="#" hidden data-type="project" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 flex-none text-gray-500 group-aria-selected:text-white forced-colors:group-aria-selected:text-[Highlight]">
                    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="ml-3 flex-auto truncate">Products Inc. / Documentation</span>
                </a>
              </div>
            </el-command-group>

            <el-command-group hidden aria-labelledby="users-label">
              <h2 id="users-label" class="text-xs font-semibold text-white">Users</h2>
              <div class="-mx-4 mt-2 text-sm text-gray-300">
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Leslie Alexander</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Michael Foster</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Dries Vincent</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Lindsay Walton</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Courtney Henry</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Tom Cook</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Whitney Francis</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Leonard Krasner</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Floyd Miles</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Emily Selman</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Kristin Watson</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Emma Dorsey</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Alicia Bell</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Jenny Wilson</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Anna Roberts</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Benjamin Russel</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Jeffrey Webb</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Kathryn Murphy</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Lawrence Hunter</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Yvette Armstrong</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Angela Fisher</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Blake Reid</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Hector Gibbons</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Fabricio Mendes</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Jillian Steward</span>
                </a>
                <a href="#" hidden data-type="user" class="group flex cursor-default items-center px-4 py-2 select-none focus:outline-hidden aria-selected:bg-indigo-500 aria-selected:text-white">
                  <img src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-6 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
                  <span class="ml-3 flex-auto truncate">Chelsea Hagon</span>
                </a>
              </div>
            </el-command-group>
          </el-command-list>

          <div class="hidden px-6 py-14 text-center text-sm in-data-[mode=help]:block sm:px-14">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="mx-auto size-6 text-gray-500">
              <path d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="mt-4 font-semibold text-white">Help with searching</p>
            <p class="mt-2 text-gray-400">Use this tool to quickly search for users and projects across our entire platform. You can also use the search modifiers found in the footer below to limit the results to just users or projects.</p>
          </div>

          <el-no-results hidden class="block px-6 py-14 text-center text-sm in-data-[mode=help]:hidden sm:px-14">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="mx-auto size-6 text-gray-500">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="mt-4 font-semibold text-white">No results found</p>
            <p class="mt-2 text-gray-400">We couldn’t find anything with that term. Please try again.</p>
          </el-no-results>

          <div class="flex flex-wrap items-center bg-gray-800/50 px-4 py-2.5 text-xs text-gray-300">Type <kbd class="mx-1 flex size-5 items-center justify-center rounded-sm border border-white/10 bg-gray-800 font-semibold text-white in-data-[mode=project]:border-indigo-500 in-data-[mode=project]:text-indigo-500 sm:mx-2">#</kbd> <span class="sm:hidden">for projects,</span><span class="hidden sm:inline">to access projects,</span><kbd class="mx-1 flex size-5 items-center justify-center rounded-sm border border-white/10 bg-gray-800 font-semibold text-white in-data-[mode=user]:border-indigo-500 in-data-[mode=user]:text-indigo-500 sm:mx-2">&gt;</kbd> for users, and <kbd class="mx-1 flex size-5 items-center justify-center rounded-sm border border-white/10 bg-gray-800 font-semibold text-white in-data-[mode=help]:border-indigo-500 in-data-[mode=help]:text-indigo-500 sm:mx-2">?</kbd> for help.</div>
        </el-command-palette>
      </el-dialog-panel>
    </div>
  </dialog>
</el-dialog>
```
