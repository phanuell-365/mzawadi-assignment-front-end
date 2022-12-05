<template>
  <div class="pt-5">
    <div
      class="mt-2 mb-5 py-5 mx-3 px-6 rounded-lg shadow bg-white dark:bg-zinc-700"
    >
      <div class="flex justify-between items-center">
        <div class="heading">
          <h2
            class="text-3xl text-stone-600 dark:text-stone-50 font-bold antialiased"
          >
            {{ startCase(routeInfo.description) }}s
          </h2>
        </div>
        <div v-if="canAdd">
          <AddResourceButton @click="onClickHandler" />
        </div>
        <LoginModal />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddResourceButton from "../buttons/AddResourceButton.vue";
import { computed, reactive, ref, Ref } from "vue";
import { Routes, useRoutingStore } from "../../stores/routing";
import { startCase } from "lodash";
import LoginModal from "../app/users/LoginModal.vue";

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
  "sale",
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
