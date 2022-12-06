<template>
  <form autocomplete="off" novalidate @submit.prevent>
    <div class="md:flex flex-row flex-wrap mx-3">
      <label
        v-for="(value, key) in saleObj"
        :key="key"
        class="inline-block basis-1/2 p-3"
      >
        <span
          class="block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >{{ startCase(key) }}</span
        >
        <input
          id="valueOfPoints"
          :value="value"
          class="peer block bg-white dark:bg-zinc-500 dark:text-stone-100 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm disabled:bg-stone-100 disabled:text-zinc-500 disabled:border-zinc-300 disabled:shadow-none"
          disabled
          name="valueOfPoints"
          readonly
          type="text"
        />
      </label>
    </div>

    <div class="py-3 flex justify-end">
      <button
        class="py-1 px-4 m-2 rounded-full border border-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-500 focus:ring focus:ring-red-300 dark:focus:ring-red-500 active:ring-red-300 dark:active:ring-red-400 hover:text-white dark:hover:text-stone-50 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
        @click="onCloseClick(false)"
      >
        Close
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from "vue";
import { SaleObjectWithConsumerDistributorAndProduct } from "../../../stores/sales/interfaces";
import { useSalesStore } from "../../../stores/sales";
import { startCase } from "lodash";

interface ManageSaleProps {
  saleId: string;
}

const props = defineProps<ManageSaleProps>();

const salesStore = useSalesStore();

const sale: Ref<SaleObjectWithConsumerDistributorAndProduct | undefined> =
  ref();

const saleObj = ref({});

try {
  sale.value = await salesStore.fetchSaleWithConsumerAndDistributorById(
    props.saleId
  );

  saleObj.value = Object.fromEntries(
    Object.entries(sale.value).filter(([key]) => {
      return key !== "id";
    })
  );
} catch (error: any) {
  console.error(error);
}

const emits = defineEmits<{
  (e: "name-input", input: HTMLElement | null): void;
  (e: "close-modal", value: boolean): void;
}>();

const nameInputRef: Ref<HTMLInputElement | null> = ref(null);

onMounted(() => {
  emits("name-input", nameInputRef.value);
});

const onCloseClick = (value: boolean) => {
  emits("close-modal", value);
};
</script>

<style scoped></style>
