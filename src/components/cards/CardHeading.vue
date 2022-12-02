<template>
  <div class="flex justify-between items-center">
    <div class="heading my-3 pb-3 pt-5">
      <h2
        class="text-3xl text-stone-600 dark:text-stone-50 font-bold antialiased"
      >
        {{ startCase(currentRouteDescription) }}s
      </h2>
    </div>
    <div>
      <AddResourceButton @click="onClickHandler" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddResourceButton from "../buttons/AddResourceButton.vue";
import { ref, Ref } from "vue";
import { useRoutingStore } from "../../stores/routing";
import { startCase } from "lodash";

const routingStore = useRoutingStore();

const currentRouteDescription: Ref<string | undefined> = ref(
  routingStore.getCurrentRouteDescription
);

const emit = defineEmits(["add-click"]);

const onClickHandler = () => {
  emit("add-click");
};
</script>

<style scoped></style>
