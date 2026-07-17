# Radio Groups
## Simple list
```html
<fieldset>
  <legend class="text-sm/6 font-semibold text-white">Notifications</legend>
  <p class="mt-1 text-sm/6 text-gray-400">How do you prefer to receive notifications?</p>
  <div class="mt-6 space-y-6">
    <div class="flex items-center">
      <input id="email" type="radio" name="notification-method" checked class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden" />
      <label for="email" class="ml-3 block text-sm/6 font-medium text-white">Email</label>
    </div>
    <div class="flex items-center">
      <input id="sms" type="radio" name="notification-method" class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden" />
      <label for="sms" class="ml-3 block text-sm/6 font-medium text-white">Phone (SMS)</label>
    </div>
    <div class="flex items-center">
      <input id="push" type="radio" name="notification-method" class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden" />
      <label for="push" class="ml-3 block text-sm/6 font-medium text-white">Push notification</label>
    </div>
  </div>
</fieldset>
```
## List with description
```html
<fieldset aria-label="Plan">
  <div class="space-y-5">
    <div class="relative flex items-start">
      <div class="flex h-6 items-center">
        <input id="small" type="radio" name="plan" checked aria-describedby="small-description" class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden" />
      </div>
      <div class="ml-3 text-sm/6">
        <label for="small" class="font-medium text-white">Small</label>
        <p id="small-description" class="text-gray-400">4 GB RAM / 2 CPUS / 80 GB SSD Storage</p>
      </div>
    </div>
    <div class="relative flex items-start">
      <div class="flex h-6 items-center">
        <input id="medium" type="radio" name="plan" aria-describedby="medium-description" class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden" />
      </div>
      <div class="ml-3 text-sm/6">
        <label for="medium" class="font-medium text-white">Medium</label>
        <p id="medium-description" class="text-gray-400">8 GB RAM / 4 CPUS / 160 GB SSD Storage</p>
      </div>
    </div>
    <div class="relative flex items-start">
      <div class="flex h-6 items-center">
        <input id="large" type="radio" name="plan" aria-describedby="large-description" class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden" />
      </div>
      <div class="ml-3 text-sm/6">
        <label for="large" class="font-medium text-white">Large</label>
        <p id="large-description" class="text-gray-400">16 GB RAM / 8 CPUS / 320 GB SSD Storage</p>
      </div>
    </div>
  </div>
</fieldset>
```
## Simple table
```html
<fieldset aria-label="Pricing plans" class="relative -space-y-px rounded-md bg-gray-800/50">
  <label aria-label="Startup" aria-description="$29 per month, $290 per year, Up to 5 active job postings" class="group flex flex-col border border-gray-700 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-800 has-checked:bg-indigo-600/10 md:grid md:grid-cols-3 md:pr-6 md:pl-4">
    <span class="flex items-center gap-3 text-sm">
      <input type="radio" name="pricing-plan" value="startup" checked class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden" />
      <span class="font-medium text-white group-has-checked:text-indigo-300">Startup</span>
    </span>
    <span class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
      <span class="font-medium text-white group-has-checked:text-indigo-300">$29 / mo</span>
      <span class="text-gray-400 group-has-checked:text-indigo-300/75">($290 / yr)</span>
    </span>
    <span class="ml-6 pl-1 text-sm text-gray-400 group-has-checked:text-indigo-300/75 md:ml-0 md:pl-0 md:text-right">Up to 5 active job postings</span>
  </label>
  <label aria-label="Business" aria-description="$99 per month, $990 per year, Up to 25 active job postings" class="group flex flex-col border border-gray-700 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-800 has-checked:bg-indigo-600/10 md:grid md:grid-cols-3 md:pr-6 md:pl-4">
    <span class="flex items-center gap-3 text-sm">
      <input type="radio" name="pricing-plan" value="business" class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden" />
      <span class="font-medium text-white group-has-checked:text-indigo-300">Business</span>
    </span>
    <span class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
      <span class="font-medium text-white group-has-checked:text-indigo-300">$99 / mo</span>
      <span class="text-gray-400 group-has-checked:text-indigo-300/75">($990 / yr)</span>
    </span>
    <span class="ml-6 pl-1 text-sm text-gray-400 group-has-checked:text-indigo-300/75 md:ml-0 md:pl-0 md:text-right">Up to 25 active job postings</span>
  </label>
  <label aria-label="Enterprise" aria-description="$249 per month, $2490 per year, Unlimited active job postings" class="group flex flex-col border border-gray-700 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-800 has-checked:bg-indigo-600/10 md:grid md:grid-cols-3 md:pr-6 md:pl-4">
    <span class="flex items-center gap-3 text-sm">
      <input type="radio" name="pricing-plan" value="enterprise" class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden" />
      <span class="font-medium text-white group-has-checked:text-indigo-300">Enterprise</span>
    </span>
    <span class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
      <span class="font-medium text-white group-has-checked:text-indigo-300">$249 / mo</span>
      <span class="text-gray-400 group-has-checked:text-indigo-300/75">($2490 / yr)</span>
    </span>
    <span class="ml-6 pl-1 text-sm text-gray-400 group-has-checked:text-indigo-300/75 md:ml-0 md:pl-0 md:text-right">Unlimited active job postings</span>
  </label>
</fieldset>
```

## Color picker
```html
<fieldset>
  <legend class="block text-sm/6 font-semibold text-white">Choose a label color</legend>
  <div class="mt-6 flex items-center gap-x-3">
    <div class="flex rounded-full outline -outline-offset-1 outline-black/10">
      <input type="radio" name="color" value="pink" checked aria-label="Pink" class="size-8 appearance-none rounded-full bg-pink-500 forced-color-adjust-none checked:outline-2 checked:outline-offset-2 checked:outline-pink-500 focus-visible:outline-3 focus-visible:outline-offset-3" />
    </div>
    <div class="flex rounded-full outline -outline-offset-1 outline-black/10">
      <input type="radio" name="color" value="purple" aria-label="Purple" class="size-8 appearance-none rounded-full bg-purple-500 forced-color-adjust-none checked:outline-2 checked:outline-offset-2 checked:outline-purple-500 focus-visible:outline-3 focus-visible:outline-offset-3" />
    </div>
    <div class="flex rounded-full outline -outline-offset-1 outline-black/10">
      <input type="radio" name="color" value="blue" aria-label="Blue" class="size-8 appearance-none rounded-full bg-blue-500 forced-color-adjust-none checked:outline-2 checked:outline-offset-2 checked:outline-blue-500 focus-visible:outline-3 focus-visible:outline-offset-3" />
    </div>
    <div class="flex rounded-full outline -outline-offset-1 outline-black/10">
      <input type="radio" name="color" value="green" aria-label="Green" class="size-8 appearance-none rounded-full bg-green-500 forced-color-adjust-none checked:outline-2 checked:outline-offset-2 checked:outline-green-500 focus-visible:outline-3 focus-visible:outline-offset-3" />
    </div>
    <div class="flex rounded-full outline -outline-offset-1 outline-black/10">
      <input type="radio" name="color" value="yellow" aria-label="Yellow" class="size-8 appearance-none rounded-full bg-yellow-500 forced-color-adjust-none checked:outline-2 checked:outline-offset-2 checked:outline-yellow-500 focus-visible:outline-3 focus-visible:outline-offset-3" />
    </div>
  </div>
</fieldset>
```
## Cards
```html
<fieldset>
  <legend class="text-sm/6 font-semibold text-white">Select a mailing list</legend>
  <div class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
    <label aria-label="Newsletter" aria-description="Last message sent an hour ago to 621 users" class="group relative flex rounded-lg border border-white/10 bg-gray-800/50 p-4 has-checked:bg-indigo-500/10 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-indigo-500 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:bg-gray-800 has-disabled:opacity-25">
      <input type="radio" name="mailing-list" value="newsletter" checked class="absolute inset-0 appearance-none focus:outline-none" />
      <div class="flex-1">
        <span class="block text-sm font-medium text-white">Newsletter</span>
        <span class="mt-1 block text-sm text-gray-400">Last message sent an hour ago</span>
        <span class="mt-6 block text-sm font-medium text-white">621 users</span>
      </div>
      <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="invisible size-5 text-indigo-500 group-has-checked:visible">
        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" fill-rule="evenodd" />
      </svg>
    </label>

    <label aria-label="Existing customers" aria-description="Last message sent 2 weeks ago to 1200 users" class="group relative flex rounded-lg border border-white/10 bg-gray-800/50 p-4 has-checked:bg-indigo-500/10 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-indigo-500 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:bg-gray-800 has-disabled:opacity-25">
      <input type="radio" name="mailing-list" value="existing-customers" class="absolute inset-0 appearance-none focus:outline-none" />
      <div class="flex-1">
        <span class="block text-sm font-medium text-white">Existing customers</span>
        <span class="mt-1 block text-sm text-gray-400">Last message sent 2 weeks ago</span>
        <span class="mt-6 block text-sm font-medium text-white">1200 users</span>
      </div>
      <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="invisible size-5 text-indigo-500 group-has-checked:visible">
        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" fill-rule="evenodd" />
      </svg>
    </label>

    <label aria-label="Trial users" aria-description="Last message sent 4 days ago to 2740 users" class="group relative flex rounded-lg border border-white/10 bg-gray-800/50 p-4 has-checked:bg-indigo-500/10 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-indigo-500 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:bg-gray-800 has-disabled:opacity-25">
      <input type="radio" name="mailing-list" value="trial-users" class="absolute inset-0 appearance-none focus:outline-none" />
      <div class="flex-1">
        <span class="block text-sm font-medium text-white">Trial users</span>
        <span class="mt-1 block text-sm text-gray-400">Last message sent 4 days ago</span>
        <span class="mt-6 block text-sm font-medium text-white">2740 users</span>
      </div>
      <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="invisible size-5 text-indigo-500 group-has-checked:visible">
        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" fill-rule="evenodd" />
      </svg>
    </label>
  </div>
</fieldset>
```
