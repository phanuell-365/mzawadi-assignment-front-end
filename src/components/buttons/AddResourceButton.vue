<template>
  <button
    class="px-4 py-1.5 flex items-baseline justify-between text-stone-600 dark:bg-zinc-50 rounded-full border border-zinc-200 dark:border-zinc-50 hover:text-stone-50 dark:hover:text-stone-600 hover:bg-zinc-600 dark:hover:bg-zinc-600 dark:hover:text-stone-50 hover:border-transparent hover:shadow-lg dark:hover-shadow-lg focus:outline-none focus:border-0 focus:ring-2 dark:focus:ring-1 focus:ring-zinc-600 dark:focus:ring-zinc-50 focus:ring-offset-2 dark:focus:bg-zinc-600 dark:focus:text-zinc-50 transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
    @click="onClickHandler"
  >
    <span class="pr-1">
      <svg
        class="w-6 h-6 inline-block"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></path>
      </svg>
    </span>
    <span class="text-sm font-semibold">
      Add {{ startCase(routeInfo.description) }}
    </span>
  </button>
</template>

<script lang="ts" setup>
import { reactive, ref, Ref } from "vue";
import { Routes, useRoutingStore } from "../../stores/routing";
import { startCase } from "lodash";

const routingStore = useRoutingStore();

const currentRoute: Ref<Routes | undefined> = ref(routingStore.getCurrentRoute);

const routeInfo = reactive({
  path: currentRoute.value?.path,
  name: currentRoute.value?.name,
  description: currentRoute.value?.description,
});

const emits = defineEmits(["click"]);

const onClickHandler = async () => {
  emits("click");
};
</script>

<style scoped></style>
