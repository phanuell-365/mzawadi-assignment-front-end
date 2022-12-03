<template>
  <div class="flex justify-between items-center">
    <div class="heading my-3 pb-3 pt-5">
      <h2
        class="text-3xl text-stone-600 dark:text-stone-50 font-bold antialiased"
      >
        {{ startCase(routeInfo.description) }}s
      </h2>
    </div>
    <div v-if="canAdd">
      <AddResourceButton @click="onClickHandler" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddResourceButton from "../buttons/AddResourceButton.vue";
import { computed, reactive, ref, Ref } from "vue";
import { Routes, useRoutingStore } from "../../stores/routing";
import { startCase } from "lodash";

const routingStore = useRoutingStore();

const currentRoute: Ref<Routes | undefined> = ref(routingStore.getCurrentRoute);

const routeInfo = reactive({
  path: currentRoute.value?.path,
  name: currentRoute.value?.name,
  description: currentRoute.value?.description,
});

const thatCanAdd = ref([
  "target",
  "distributor",
  "consumer",
  "user",
  "product",
]);

const canAdd = computed(() =>
  thatCanAdd.value.includes(routeInfo?.description as string)
);

const emit = defineEmits(["add-click"]);

const onClickHandler = () => {
  emit("add-click");
};
</script>

<style scoped></style>
