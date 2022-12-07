<template>
  <Switch
    v-model="enabled"
    :class="
      enabled
        ? 'bg-zinc-800 border border-zinc-500 bg-zinc-600'
        : 'bg-stone-200 border border-zinc-400'
    "
    class="relative inline-flex h-[30px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    <span class="sr-only">Use setting</span>

    <div
      :class="
        enabled ? 'translate-x-9 bg-zinc-800 text-stone-100' : 'translate-x-0'
      "
      aria-hidden="true"
      class="pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
    >
      <MoonIcon v-if="enabled" class="p-0.5 w-6" />
      <SunIcon v-else class="p-0.5 w-6" />
    </div>
  </Switch>
</template>

<script lang="ts" setup>
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { Switch } from "@headlessui/vue";
import { useDark } from "@vueuse/core";

const enabled = useDark();
</script>

<style scoped></style>
