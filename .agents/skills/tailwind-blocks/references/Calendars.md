# Calendars
## Month view
```html
<div class="lg:flex lg:h-full lg:flex-col">
  <header class="flex items-center justify-between border-b border-white/10 bg-gray-800/50 px-6 py-4 lg:flex-none">
    <h1 class="text-base font-semibold text-white">
      <time datetime="2022-01">January 2022</time>
    </h1>
    <div class="flex items-center">
      <div class="relative flex items-center rounded-md bg-white/10 outline -outline-offset-1 outline-white/5 md:items-stretch">
        <button type="button" class="flex h-9 w-12 items-center justify-center rounded-l-md pr-1 text-gray-400 hover:text-white focus:relative md:w-9 md:pr-0 md:hover:bg-white/10">
          <span class="sr-only">Previous month</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
            <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
          </svg>
        </button>
        <button type="button" class="hidden px-3.5 text-sm font-semibold text-white hover:bg-white/10 focus:relative md:block">Today</button>
        <span class="relative -mx-px h-5 w-px bg-white/10 md:hidden"></span>
        <button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md pl-1 text-gray-400 hover:text-white focus:relative md:w-9 md:pl-0 md:hover:bg-white/10">
          <span class="sr-only">Next month</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
            <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="hidden md:ml-4 md:flex md:items-center">
        <el-dropdown class="relative">
          <button type="button" class="flex items-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20">
            Month view
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 size-5 text-gray-500">
              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </button>

          <el-menu anchor="bottom end" popover class="w-36 origin-top-right overflow-hidden rounded-md bg-gray-800 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(3)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Day view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Week view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Month view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Year view</a>
            </div>
          </el-menu>
        </el-dropdown>
        <div class="ml-6 h-6 w-px bg-white/10"></div>
        <button type="button" class="ml-6 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add event</button>
      </div>
      <el-dropdown class="relative ml-6 md:hidden">
        <button class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-white">
          <span class="sr-only">Open menu</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
            <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
          </svg>
        </button>

        <el-menu anchor="bottom end" popover class="w-36 origin-top-right divide-y divide-white/10 overflow-hidden rounded-md bg-gray-800 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(3)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
          <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Create event</a>
          </div>
          <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Go to today</a>
          </div>
          <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Day view</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Week view</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Month view</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Year view</a>
          </div>
        </el-menu>
      </el-dropdown>
    </div>
  </header>
  <div class="ring-1 ring-white/5 lg:flex lg:flex-auto lg:flex-col">
    <div class="grid grid-cols-7 gap-px border-b border-white/5 bg-white/15 text-center text-xs/6 font-semibold text-gray-300 lg:flex-none">
      <div class="flex justify-center bg-gray-900 py-2">
        <span>M</span>
        <span class="sr-only sm:not-sr-only">on</span>
      </div>
      <div class="flex justify-center bg-gray-900 py-2">
        <span>T</span>
        <span class="sr-only sm:not-sr-only">ue</span>
      </div>
      <div class="flex justify-center bg-gray-900 py-2">
        <span>W</span>
        <span class="sr-only sm:not-sr-only">ed</span>
      </div>
      <div class="flex justify-center bg-gray-900 py-2">
        <span>T</span>
        <span class="sr-only sm:not-sr-only">hu</span>
      </div>
      <div class="flex justify-center bg-gray-900 py-2">
        <span>F</span>
        <span class="sr-only sm:not-sr-only">ri</span>
      </div>
      <div class="flex justify-center bg-gray-900 py-2">
        <span>S</span>
        <span class="sr-only sm:not-sr-only">at</span>
      </div>
      <div class="flex justify-center bg-gray-900 py-2">
        <span>S</span>
        <span class="sr-only sm:not-sr-only">un</span>
      </div>
    </div>
    <div class="flex bg-white/10 text-xs/6 text-gray-300 lg:flex-auto">
      <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2021-12-27" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">27</time>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2021-12-28" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">28</time>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2021-12-29" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">29</time>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2021-12-30" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">30</time>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2021-12-31" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">31</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-01" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">1</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-02" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">2</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-03" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">3</time>
          <ol class="mt-2">
            <li>
              <a href="#" class="group flex">
                <p class="flex-auto truncate font-medium text-white group-hover:text-indigo-400">Design review</p>
                <time datetime="2022-01-03T10:00" class="ml-3 hidden flex-none text-gray-400 group-hover:text-indigo-400 xl:block">10AM</time>
              </a>
            </li>
            <li>
              <a href="#" class="group flex">
                <p class="flex-auto truncate font-medium text-white group-hover:text-indigo-400">Sales meeting</p>
                <time datetime="2022-01-03T14:00" class="ml-3 hidden flex-none text-gray-400 group-hover:text-indigo-400 xl:block">2PM</time>
              </a>
            </li>
          </ol>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-04" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">4</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-05" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">5</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-06" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">6</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-07" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">7</time>
          <ol class="mt-2">
            <li>
              <a href="#" class="group flex">
                <p class="flex-auto truncate font-medium text-white group-hover:text-indigo-400">Date night</p>
                <time datetime="2022-01-08T18:00" class="ml-3 hidden flex-none text-gray-400 group-hover:text-indigo-400 xl:block">6PM</time>
              </a>
            </li>
          </ol>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-08" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">8</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-09" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">9</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-10" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">10</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-11" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">11</time>
        </div>
        <div data-is-today data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-12" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">12</time>
          <ol class="mt-2">
            <li>
              <a href="#" class="group flex">
                <p class="flex-auto truncate font-medium text-white group-hover:text-indigo-400">Sam&#039;s birthday party</p>
                <time datetime="2022-01-25T14:00" class="ml-3 hidden flex-none text-gray-400 group-hover:text-indigo-400 xl:block">2PM</time>
              </a>
            </li>
          </ol>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-13" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">13</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-14" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">14</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-15" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">15</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-16" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">16</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-17" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">17</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-18" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">18</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-19" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">19</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-20" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">20</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-21" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">21</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-22" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">22</time>
          <ol class="mt-2">
            <li>
              <a href="#" class="group flex">
                <p class="flex-auto truncate font-medium text-white group-hover:text-indigo-400">Maple syrup museum</p>
                <time datetime="2022-01-22T15:00" class="ml-3 hidden flex-none text-gray-400 group-hover:text-indigo-400 xl:block">3PM</time>
              </a>
            </li>
            <li>
              <a href="#" class="group flex">
                <p class="flex-auto truncate font-medium text-white group-hover:text-indigo-400">Hockey game</p>
                <time datetime="2022-01-22T19:00" class="ml-3 hidden flex-none text-gray-400 group-hover:text-indigo-400 xl:block">7PM</time>
              </a>
            </li>
          </ol>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-23" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">23</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-24" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">24</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-25" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">25</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-26" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">26</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-27" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">27</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-28" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">28</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-29" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">29</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-30" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">30</time>
        </div>
        <div data-is-current-month class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-01-31" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">31</time>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-02-01" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">1</time>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-02-02" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">2</time>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-02-03" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">3</time>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-02-04" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">4</time>
          <ol class="mt-2">
            <li>
              <a href="#" class="group flex">
                <p class="flex-auto truncate font-medium text-white group-hover:text-indigo-400">Cinema with friends</p>
                <time datetime="2022-02-04T21:00" class="ml-3 hidden flex-none text-gray-400 group-hover:text-indigo-400 xl:block">9PM</time>
              </a>
            </li>
          </ol>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-02-05" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">5</time>
        </div>
        <div class="group relative bg-gray-900 px-3 py-2 text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 data-is-current-month:bg-gray-900">
          <time datetime="2022-02-06" class="relative group-not-data-is-current-month:opacity-75 in-data-is-today:flex in-data-is-today:size-6 in-data-is-today:items-center in-data-is-today:justify-center in-data-is-today:rounded-full in-data-is-today:bg-indigo-500 in-data-is-today:font-semibold in-data-is-today:text-white">6</time>
        </div>
      </div>
      <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2021-12-27" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">27</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2021-12-28" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">28</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2021-12-29" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">29</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2021-12-30" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">30</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2021-12-31" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">31</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-01" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">1</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-02" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">2</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-03" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">3</time>
          <span class="sr-only">{day.events.length} events</span>
          <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-500"></span>
            <span class="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-500"></span>
          </span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-04" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">4</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-05" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">5</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-06" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">6</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-07" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">7</time>
          <span class="sr-only">{day.events.length} events</span>
          <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-500"></span>
          </span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-08" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">8</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-09" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">9</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-10" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">10</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-11" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">11</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-today data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-12" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">12</time>
          <span class="sr-only">{day.events.length} events</span>
          <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-500"></span>
          </span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-13" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">13</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-14" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">14</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-15" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">15</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-16" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">16</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-17" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">17</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-18" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">18</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-19" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">19</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-20" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">20</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-21" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">21</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-selected data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-22" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">22</time>
          <span class="sr-only">{day.events.length} events</span>
          <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-500"></span>
            <span class="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-500"></span>
          </span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-23" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">23</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-24" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">24</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-25" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">25</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-26" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">26</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-27" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">27</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-28" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">28</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-29" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">29</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-30" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">30</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" data-is-current-month class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-01-31" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">31</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-02-01" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">1</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-02-02" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">2</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-02-03" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">3</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-02-04" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">4</time>
          <span class="sr-only">{day.events.length} events</span>
          <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span class="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-500"></span>
          </span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-02-05" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">5</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
        <button type="button" class="group relative flex h-14 flex-col px-3 py-2 not-data-is-current-month:bg-gray-900 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 not-data-is-current-month:before:pointer-events-none not-data-is-current-month:before:absolute not-data-is-current-month:before:inset-0 not-data-is-current-month:before:bg-gray-800/50 hover:bg-gray-900/50 focus:z-10 data-is-current-month:bg-gray-900 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold not-data-is-selected:data-is-today:text-indigo-400">
          <time datetime="2022-02-06" class="ml-auto group-not-data-is-current-month:opacity-75 in-data-is-selected:flex in-data-is-selected:size-6 in-data-is-selected:items-center in-data-is-selected:justify-center in-data-is-selected:rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:not-in-data-is-today:text-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-500">6</time>
          <span class="sr-only">{day.events.length} events</span>
        </button>
      </div>
    </div>
  </div>
  <div class="relative px-4 py-10 after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/10 sm:px-6 lg:hidden">
    <ol class="divide-y divide-white/10 overflow-hidden rounded-lg bg-gray-800/50 text-sm outline-1 -outline-offset-1 outline-white/10">
      <li class="group flex p-4 pr-6 focus-within:bg-white/5 hover:bg-white/5">
        <div class="flex-auto">
          <p class="font-semibold text-white">Maple syrup museum</p>
          <time datetime="2022-01-15T09:00" class="mt-2 flex items-center text-gray-300">
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="mr-2 size-5 text-gray-500">
              <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
            3PM
          </time>
        </div>
        <a href="#" class="ml-6 flex-none self-center rounded-md bg-white/10 px-3 py-2 font-semibold text-white opacity-0 ring-1 ring-white/5 ring-inset group-hover:opacity-100 hover:bg-white/20 focus:opacity-100">Edit<span class="sr-only">, Maple syrup museum</span></a>
      </li>
      <li class="group flex p-4 pr-6 focus-within:bg-white/5 hover:bg-white/5">
        <div class="flex-auto">
          <p class="font-semibold text-white">Hockey game</p>
          <time datetime="2022-01-22T19:00" class="mt-2 flex items-center text-gray-300">
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="mr-2 size-5 text-gray-500">
              <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
            7PM
          </time>
        </div>
        <a href="#" class="ml-6 flex-none self-center rounded-md bg-white/10 px-3 py-2 font-semibold text-white opacity-0 ring-1 ring-white/5 ring-inset group-hover:opacity-100 hover:bg-white/20 focus:opacity-100">Edit<span class="sr-only">, Hockey game</span></a>
      </li>
    </ol>
  </div>
</div>
```

## Week view
```html
<!-- Include this script tag or install `@tailwindplus/elements` via npm: -->
<!-- <script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script> -->
<div class="flex h-full flex-col">
  <header class="flex flex-none items-center justify-between border-b border-white/15 bg-gray-800/50 px-6 py-4">
    <h1 class="text-base font-semibold text-white">
      <time datetime="2022-01">January 2022</time>
    </h1>
    <div class="flex items-center">
      <div class="relative flex items-center rounded-md bg-white/10 outline -outline-offset-1 outline-white/5 md:items-stretch">
        <button type="button" class="flex h-9 w-12 items-center justify-center rounded-l-md pr-1 text-gray-400 hover:text-white focus:relative md:w-9 md:pr-0 md:hover:bg-white/10">
          <span class="sr-only">Previous week</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
            <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
          </svg>
        </button>
        <button type="button" class="hidden px-3.5 text-sm font-semibold text-white hover:bg-white/10 focus:relative md:block">Today</button>
        <span class="relative -mx-px h-5 w-px bg-white/10 md:hidden"></span>
        <button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md pl-1 text-gray-400 hover:text-white focus:relative md:w-9 md:pl-0 md:hover:bg-white/10">
          <span class="sr-only">Next week</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
            <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="hidden md:ml-4 md:flex md:items-center">
        <el-dropdown class="relative">
          <button type="button" class="flex items-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20">
            Week view
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 size-5 text-gray-500">
              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </button>

          <el-menu anchor="bottom end" popover class="w-36 origin-top-right overflow-hidden rounded-md bg-gray-800 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(3)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Day view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Week view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Month view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Year view</a>
            </div>
          </el-menu>
        </el-dropdown>
        <div class="ml-6 h-6 w-px bg-white/10"></div>
        <button type="button" class="ml-6 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add event</button>
      </div>
      <div class="ml-6 md:hidden">
        <el-dropdown class="relative">
          <button class="relative flex items-center rounded-full text-gray-400 outline-offset-8 hover:text-white">
            <span class="absolute -inset-2"></span>
            <span class="sr-only">Open menu</span>
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
              <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
          </button>

          <el-menu anchor="bottom end" popover class="w-36 origin-top-right divide-y divide-white/10 overflow-hidden rounded-md bg-gray-800 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(3)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Create event</a>
            </div>
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Go to today</a>
            </div>
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Day view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Week view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Month view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Year view</a>
            </div>
          </el-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
  <div class="isolate flex flex-auto flex-col overflow-auto bg-gray-900">
    <div style="width: 165%" class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
      <div class="sticky top-0 z-30 flex-none bg-gray-900 ring-1 ring-white/20 sm:pr-8">
        <div class="grid grid-cols-7 text-sm/6 text-gray-400 sm:hidden">
          <button type="button" class="flex flex-col items-center pt-2 pb-3">M <span class="mt-1 flex size-8 items-center justify-center font-semibold text-white">10</span></button>
          <button type="button" class="flex flex-col items-center pt-2 pb-3">T <span class="mt-1 flex size-8 items-center justify-center font-semibold text-white">11</span></button>
          <button type="button" class="flex flex-col items-center pt-2 pb-3">W <span class="mt-1 flex size-8 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">12</span></button>
          <button type="button" class="flex flex-col items-center pt-2 pb-3">T <span class="mt-1 flex size-8 items-center justify-center font-semibold text-white">13</span></button>
          <button type="button" class="flex flex-col items-center pt-2 pb-3">F <span class="mt-1 flex size-8 items-center justify-center font-semibold text-white">14</span></button>
          <button type="button" class="flex flex-col items-center pt-2 pb-3">S <span class="mt-1 flex size-8 items-center justify-center font-semibold text-white">15</span></button>
          <button type="button" class="flex flex-col items-center pt-2 pb-3">S <span class="mt-1 flex size-8 items-center justify-center font-semibold text-white">16</span></button>
        </div>

        <div class="-mr-px hidden grid-cols-7 divide-x divide-white/10 border-r border-white/10 text-sm/6 text-gray-400 sm:grid">
          <div class="col-end-1 w-14"></div>
          <div class="flex items-center justify-center py-3">
            <span>Mon <span class="items-center justify-center font-semibold text-white">10</span></span>
          </div>
          <div class="flex items-center justify-center py-3">
            <span>Tue <span class="items-center justify-center font-semibold text-white">11</span></span>
          </div>
          <div class="flex items-center justify-center py-3">
            <span class="flex items-baseline">Wed <span class="ml-1.5 flex size-8 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">12</span></span>
          </div>
          <div class="flex items-center justify-center py-3">
            <span>Thu <span class="items-center justify-center font-semibold text-white">13</span></span>
          </div>
          <div class="flex items-center justify-center py-3">
            <span>Fri <span class="items-center justify-center font-semibold text-white">14</span></span>
          </div>
          <div class="flex items-center justify-center py-3">
            <span>Sat <span class="items-center justify-center font-semibold text-white">15</span></span>
          </div>
          <div class="flex items-center justify-center py-3">
            <span>Sun <span class="items-center justify-center font-semibold text-white">16</span></span>
          </div>
        </div>
      </div>
      <div class="flex flex-auto">
        <div class="sticky left-0 z-10 w-14 flex-none bg-gray-900 ring-1 ring-white/5"></div>
        <div class="grid flex-auto grid-cols-1 grid-rows-1">
          <!-- Horizontal lines -->
          <div style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))" class="col-start-1 col-end-2 row-start-1 grid divide-y divide-white/5">
            <div class="row-end-1 h-7"></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">12AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">1AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">2AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">3AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">4AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">5AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">6AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">7AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">8AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">9AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">10AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">11AM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">12PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">1PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">2PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">3PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">4PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">5PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">6PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">7PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">8PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">9PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">10PM</div>
            </div>
            <div></div>
            <div>
              <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">11PM</div>
            </div>
            <div></div>
          </div>

          <!-- Vertical lines -->
          <div class="col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-white/5 sm:grid sm:grid-cols-7">
            <div class="col-start-1 row-span-full"></div>
            <div class="col-start-2 row-span-full"></div>
            <div class="col-start-3 row-span-full"></div>
            <div class="col-start-4 row-span-full"></div>
            <div class="col-start-5 row-span-full"></div>
            <div class="col-start-6 row-span-full"></div>
            <div class="col-start-7 row-span-full"></div>
            <div class="col-start-8 row-span-full w-8"></div>
          </div>

          <!-- Events -->
          <ol style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto" class="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8">
            <li style="grid-row: 74 / span 12" class="relative mt-px flex before:pointer-events-none before:absolute before:inset-1 before:z-0 before:rounded-lg before:bg-gray-900 sm:col-start-3">
              <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-600/15 p-2 text-xs/5 hover:bg-blue-600/20">
                <p class="order-1 font-semibold text-blue-300">Breakfast</p>
                <p class="text-blue-400 group-hover:text-blue-300"><time datetime="2022-01-12T06:00">6:00 AM</time></p>
              </a>
            </li>
            <li style="grid-row: 92 / span 30" class="relative mt-px flex before:pointer-events-none before:absolute before:inset-1 before:z-0 before:rounded-lg before:bg-gray-900 sm:col-start-3">
              <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-600/15 p-2 text-xs/5 hover:bg-pink-600/20">
                <p class="order-1 font-semibold text-pink-300">Flight to Paris</p>
                <p class="text-pink-400 group-hover:text-pink-300"><time datetime="2022-01-12T07:30">7:30 AM</time></p>
              </a>
            </li>
            <li style="grid-row: 122 / span 24" class="relative mt-px hidden before:pointer-events-none before:absolute before:inset-1 before:z-0 before:rounded-lg before:bg-gray-900 sm:col-start-6 sm:flex">
              <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-white/10 p-2 text-xs/5 hover:bg-white/15">
                <p class="order-1 font-semibold text-gray-300">Meeting with design team at Disney</p>
                <p class="text-gray-400 group-hover:text-gray-300"><time datetime="2022-01-15T10:00">10:00 AM</time></p>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</div>
```
## Day view
```html
<div class="flex h-full flex-col">
  <header class="flex flex-none items-center justify-between border-b border-white/10 bg-gray-800/50 px-6 py-4 max-md:border-white/15">
    <div>
      <h1 class="text-base font-semibold text-white">
        <time datetime="2022-01-22" class="sm:hidden">Jan 22, 2022</time>
        <time datetime="2022-01-22" class="hidden sm:inline">January 22, 2022</time>
      </h1>
      <p class="mt-1 text-sm text-gray-400">Saturday</p>
    </div>
    <div class="flex items-center">
      <div class="relative flex items-center rounded-md bg-white/10 outline -outline-offset-1 outline-white/5 md:items-stretch">
        <button type="button" class="flex h-9 w-12 items-center justify-center rounded-l-md pr-1 text-gray-400 hover:text-white focus:relative md:w-9 md:pr-0 md:hover:bg-white/10">
          <span class="sr-only">Previous day</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
            <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
          </svg>
        </button>
        <button type="button" class="hidden px-3.5 text-sm font-semibold text-white hover:bg-white/10 focus:relative md:block">Today</button>
        <span class="relative -mx-px h-5 w-px bg-white/10 md:hidden"></span>
        <button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md pl-1 text-gray-400 hover:text-white focus:relative md:w-9 md:pl-0 md:hover:bg-white/10">
          <span class="sr-only">Next day</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
            <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="hidden md:ml-4 md:flex md:items-center">
        <el-dropdown class="relative">
          <button type="button" class="flex items-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20">
            Day view
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 size-5 text-gray-400">
              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </button>

          <el-menu anchor="bottom end" popover class="w-36 origin-top-right overflow-hidden rounded-md bg-gray-800 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(3)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Day view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Week view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Month view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Year view</a>
            </div>
          </el-menu>
        </el-dropdown>
        <div class="ml-6 h-6 w-px bg-white/10"></div>
        <button type="button" class="ml-6 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add event</button>
      </div>
      <div class="ml-6 md:hidden">
        <el-dropdown class="relative">
          <button class="relative flex items-center rounded-full text-gray-500 outline-offset-8 hover:text-white">
            <span class="absolute -inset-2"></span>
            <span class="sr-only">Open menu</span>
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
              <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
          </button>

          <el-menu anchor="bottom end" popover class="w-36 origin-top-right divide-y divide-white/10 overflow-hidden rounded-md bg-gray-800 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(3)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Create event</a>
            </div>
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Go to today</a>
            </div>
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Day view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Week view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Month view</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Year view</a>
            </div>
          </el-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
  <div class="isolate flex flex-auto overflow-hidden bg-gray-900">
    <div class="flex flex-auto flex-col overflow-auto">
      <div class="sticky top-0 z-10 grid flex-none grid-cols-7 bg-gray-900 text-xs text-gray-400 ring-1 ring-white/20 md:hidden">
        <button type="button" class="flex flex-col items-center pt-3 pb-1.5">
          <span>W</span>
          <!-- Default: "text-white", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-indigo-600", Today (Selected): "bg-indigo-600 text-white" -->
          <span class="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-white">19</span>
        </button>
        <button type="button" class="flex flex-col items-center pt-3 pb-1.5">
          <span>T</span>
          <span class="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-indigo-400">20</span>
        </button>
        <button type="button" class="flex flex-col items-center pt-3 pb-1.5">
          <span>F</span>
          <span class="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-white">21</span>
        </button>
        <button type="button" class="flex flex-col items-center pt-3 pb-1.5">
          <span>S</span>
          <span class="mt-3 flex size-8 items-center justify-center rounded-full bg-white text-base font-semibold text-gray-900">22</span>
        </button>
        <button type="button" class="flex flex-col items-center pt-3 pb-1.5">
          <span>S</span>
          <span class="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-white">23</span>
        </button>
        <button type="button" class="flex flex-col items-center pt-3 pb-1.5">
          <span>M</span>
          <span class="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-white">24</span>
        </button>
        <button type="button" class="flex flex-col items-center pt-3 pb-1.5">
          <span>T</span>
          <span class="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-white">25</span>
        </button>
      </div>
      <div class="flex w-full flex-auto">
        <div class="w-14 flex-none bg-gray-900 ring-1 ring-white/5"></div>
        <div class="grid flex-auto grid-cols-1 grid-rows-1">
          <!-- Horizontal lines -->
          <div style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))" class="col-start-1 col-end-2 row-start-1 grid divide-y divide-white/5">
            <div class="row-end-1 h-7"></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">12AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">1AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">2AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">3AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">4AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">5AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">6AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">7AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">8AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">9AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">10AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">11AM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">12PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">1PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">2PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">3PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">4PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">5PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">6PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">7PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">8PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">9PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">10PM</div>
            </div>
            <div></div>
            <div>
              <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-500">11PM</div>
            </div>
            <div></div>
          </div>

          <!-- Events -->
          <ol style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto" class="col-start-1 col-end-2 row-start-1 grid grid-cols-1">
            <li style="grid-row: 74 / span 12" class="relative mt-px flex before:pointer-events-none before:absolute before:inset-1 before:z-0 before:rounded-lg before:bg-gray-900">
              <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-600/15 p-2 text-xs/5 hover:bg-blue-600/20">
                <p class="order-1 font-semibold text-blue-300">Breakfast</p>
                <p class="text-blue-400 group-hover:text-blue-300"><time datetime="2022-01-22T06:00">6:00 AM</time></p>
              </a>
            </li>
            <li style="grid-row: 92 / span 30" class="relative mt-px flex before:pointer-events-none before:absolute before:inset-1 before:z-0 before:rounded-lg before:bg-gray-900">
              <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-600/15 p-2 text-xs/5 hover:bg-pink-600/20">
                <p class="order-1 font-semibold text-pink-300">Flight to Paris</p>
                <p class="order-1 text-pink-400 group-hover:text-pink-300">John F. Kennedy International Airport</p>
                <p class="text-pink-400 group-hover:text-pink-300"><time datetime="2022-01-22T07:30">7:30 AM</time></p>
              </a>
            </li>
            <li style="grid-row: 134 / span 18" class="relative mt-px flex before:pointer-events-none before:absolute before:inset-1 before:z-0 before:rounded-lg before:bg-gray-900">
              <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-600/15 p-2 text-xs/5 hover:bg-indigo-600/20">
                <p class="order-1 font-semibold text-indigo-300">Sightseeing</p>
                <p class="order-1 text-indigo-400 group-hover:text-indigo-300">Eiffel Tower</p>
                <p class="text-indigo-400 group-hover:text-indigo-300"><time datetime="2022-01-22T11:00">11:00 AM</time></p>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="hidden w-1/2 max-w-md flex-none border-l border-white/10 px-8 py-10 md:block">
      <div class="flex items-center text-center text-white">
        <button type="button" class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-white">
          <span class="sr-only">Previous month</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
            <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
          </svg>
        </button>
        <div class="flex-auto text-sm font-semibold">January 2022</div>
        <button type="button" class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-white">
          <span class="sr-only">Next month</span>
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
            <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="mt-6 grid grid-cols-7 text-center text-xs/6 text-gray-400">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-white/10 text-sm ring-1 ring-white/10">
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2021-12-27" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">27</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2021-12-28" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">28</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2021-12-29" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">29</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2021-12-30" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">30</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2021-12-31" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">31</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-01" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">1</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-02" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">2</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-03" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">3</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-04" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">4</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-05" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">5</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-06" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">6</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-07" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">7</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-08" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">8</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-09" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">9</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-10" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">10</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-11" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">11</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-12" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">12</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-13" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">13</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-14" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">14</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-15" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">15</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-16" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">16</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-17" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">17</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-18" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">18</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-19" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">19</time>
        </button>
        <button type="button" data-is-today data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-20" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">20</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-21" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">21</time>
        </button>
        <button type="button" data-is-selected data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-22" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">22</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-23" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">23</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-24" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">24</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-25" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">25</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-26" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">26</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-27" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">27</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-28" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">28</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-29" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">29</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-30" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">30</time>
        </button>
        <button type="button" data-is-current-month class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-01-31" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">31</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-02-01" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">1</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-02-02" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">2</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-02-03" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">3</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-02-04" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">4</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-02-05" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">5</time>
        </button>
        <button type="button" class="py-1.5 not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:font-semibold data-is-selected:text-gray-900 data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
          <time datetime="2022-02-06" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-white in-data-is-selected:in-data-is-today:bg-indigo-500">6</time>
        </button>
      </div>
    </div>
  </div>
</div>
```
