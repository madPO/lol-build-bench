# Input Groups
## Input with label
```html
<div>
  <label for="email" class="block text-sm/6 font-medium text-white">Email</label>
  <div class="mt-2">
    <input id="email" type="email" name="email" placeholder="you@example.com" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
  </div>
</div>
```
## Input with validation error
```html
<div>
  <label for="email" class="block text-sm/6 font-medium text-white">Email</label>
  <div class="mt-2 grid grid-cols-1">
    <input id="email" type="email" name="email" value="adamwathan" placeholder="you@example.com" aria-invalid="true" aria-describedby="email-error" class="col-start-1 row-start-1 block w-full rounded-md bg-white/5 py-1.5 pr-10 pl-3 text-red-400 outline-1 -outline-offset-1 outline-red-500/50 placeholder:text-red-400/70 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:pr-9 sm:text-sm/6" />
    <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-400 sm:size-4">
      <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" fill-rule="evenodd" />
    </svg>
  </div>
  <p id="email-error" class="mt-2 text-sm text-red-400">Not a valid email address.</p>
</div>
```
## Input with disabled state
```html
<div>
  <label for="email" class="block text-sm/6 font-medium text-white">Email</label>
  <div class="mt-2">
    <input id="email" type="email" name="email" value="you@example.com" disabled placeholder="you@example.com" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-gray-300 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500 disabled:outline-white/5 sm:text-sm/6" />
  </div>
</div>
```
## Input with leading icon
```html
<div>
  <label for="email" class="block text-sm/6 font-medium text-white">Email</label>
  <div class="mt-2 grid grid-cols-1">
    <input id="email" type="email" name="email" placeholder="you@example.com" class="col-start-1 row-start-1 block w-full rounded-md bg-white/5 py-1.5 pr-3 pl-10 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:pl-9 sm:text-sm/6" />
    <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-500 sm:size-4">
      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
    </svg>
  </div>
</div>
```
## Input with trailing icon
```html
<div>
  <label for="account-number" class="block text-sm/6 font-medium text-white">Account number</label>
  <div class="mt-2 grid grid-cols-1">
    <input id="account-number" type="text" name="account-number" placeholder="000-00-0000" class="col-start-1 row-start-1 block w-full rounded-md bg-white/5 py-1.5 pr-10 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:pr-9 sm:text-sm/6" />
    <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-500 sm:size-4">
      <path d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
    </svg>
  </div>
</div>
```
## Input with add-on
```html
<div>
  <label for="company-website" class="block text-sm/6 font-medium text-white">Company website</label>
  <div class="mt-2 flex">
    <div class="flex shrink-0 items-center rounded-l-md bg-white/5 px-3 text-base text-gray-400 outline-1 -outline-offset-1 outline-gray-700 sm:text-sm/6">https://</div>
    <input id="company-website" type="text" name="company-website" placeholder="www.example.com" class="-ml-px block w-full grow rounded-r-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
  </div>
</div>
```
## Input with inline leading and trailing add-ons
```html
<div>
  <label for="price" class="block text-sm/6 font-medium text-white">Price</label>
  <div class="mt-2">
    <div class="flex items-center rounded-md bg-white/5 px-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
      <div class="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">$</div>
      <input id="price" type="text" name="price" placeholder="0.00" aria-describedby="price-currency" class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
      <div id="price-currency" class="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">USD</div>
    </div>
  </div>
</div>
```
## Input with inline leading dropdown
```html
<div>
  <label for="phone-number" class="block text-sm/6 font-medium text-white">Phone number</label>
  <div class="mt-2">
    <div class="flex rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
      <div class="grid shrink-0 grid-cols-1 focus-within:relative">
        <select id="country" name="country" autocomplete="country" aria-label="Country" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent py-1.5 pr-7 pl-3 text-base text-gray-400 *:bg-gray-800 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
          <option>US</option>
          <option>CA</option>
          <option>EU</option>
        </select>
        <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4">
          <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
        </svg>
      </div>
      <input id="phone-number" type="text" name="phone-number" placeholder="123-456-7890" class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
    </div>
  </div>
</div>
```
## Input with inline leading add-on and trailing dropdown
```html
<div>
  <label for="price" class="block text-sm/6 font-medium text-white">Price</label>
  <div class="mt-2">
    <div class="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
      <div class="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">$</div>
      <input id="price" type="text" name="price" placeholder="0.00" class="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
      <div class="grid shrink-0 grid-cols-1 focus-within:relative">
        <select id="currency" name="currency" aria-label="Currency" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-800 py-1.5 pr-7 pl-3 text-base text-gray-400 *:bg-gray-800 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
          <option>USD</option>
          <option>CAD</option>
          <option>EUR</option>
        </select>
        <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4">
          <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</div>
```
## Input with leading icon and trailing button
```html
<div>
  <label for="query" class="block text-sm/6 font-medium text-white">Search candidates</label>
  <div class="mt-2 flex">
    <div class="-mr-px grid grow grid-cols-1 focus-within:relative">
      <input id="query" type="text" name="query" placeholder="John Smith" class="col-start-1 row-start-1 block w-full rounded-l-md bg-white/5 py-1.5 pr-3 pl-10 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:pl-9 sm:text-sm/6" />
      <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-500 sm:size-4">
        <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10.9 12.006c.11.542-.348.994-.9.994H2c-.553 0-1.01-.452-.902-.994a5.002 5.002 0 0 1 9.803 0ZM14.002 12h-1.59a2.556 2.556 0 0 0-.04-.29 6.476 6.476 0 0 0-1.167-2.603 3.002 3.002 0 0 1 3.633 1.911c.18.522-.283.982-.836.982ZM12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </svg>
    </div>
    <button type="button" class="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white/10 px-3 py-2 text-sm font-semibold text-white outline-1 -outline-offset-1 outline-gray-700 hover:bg-white/20 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500">
      <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="-ml-0.5 size-4 text-gray-400">
        <path d="M2 2.75A.75.75 0 0 1 2.75 2h9.5a.75.75 0 0 1 0 1.5h-9.5A.75.75 0 0 1 2 2.75ZM2 6.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 2 6.25Zm0 3.5A.75.75 0 0 1 2.75 9h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 2 9.75ZM9.22 9.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V8.56l-.97.97a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
      </svg>
      Sort
    </button>
  </div>
</div>
```
