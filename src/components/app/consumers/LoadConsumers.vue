<template>
  <div>
    <slot :consumers="consumersArr" name="consumers" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from "vue";
import { ConsumerObject } from "../../../stores/consumers/interfaces";
import { useConsumersStore } from "../../../stores/consumers";
import { useRouter } from "vue-router";

const consumersStore = useConsumersStore();

const router = useRouter();

const consumersArr: Ref<ConsumerObject[] | undefined> = ref();

onMounted(async () => {
  try {
    consumersArr.value = await consumersStore.fetchConsumers();
    // consumersArr.value = consumersStore.consumers;
    console.error("consumersStore.consumers", consumersStore.consumers);
  } catch (error: any) {
    if (error.statusCode === 401) {
      await router.push("/login");
    }
  }
});
</script>

<style scoped></style>
