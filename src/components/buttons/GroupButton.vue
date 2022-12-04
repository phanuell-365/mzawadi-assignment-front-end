<template>
  <button
    class="group/edit group-hover/table-row:visible invisible flex relative items-center whitespace-nowrap rounded-full py-1 px-4 pr-3 text-sm text-stone-500 dark:text-stone-300 transition hover:bg-stone-200 dark:hover:bg-zinc-700"
  >
    <span
      class="font-semibold transition group-hover/edit:text-stone-700 dark:group-hover/edit:text-stone-100"
    >
      {{ startCase(type) }}
    </span>
    <ChevronRightIcon
      class="w-5 h-5 transition group-hover/edit:translate-x-0.5 mt-px"
    />
  </button>
</template>

<script lang="ts" setup>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import { startCase } from "lodash";

interface GroupButtonProps {
  type: "edit" | "view" | "delete";
}

defineProps<GroupButtonProps>();
</script>

<style scoped></style>
