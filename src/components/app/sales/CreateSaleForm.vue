<template>
  <form autocomplete="off" novalidate @submit.prevent>
    <div
      :class="{
        visible: toastErrorDescription.length > 0,
        invisible: toastErrorDescription.length === 0,
      }"
      class="pb-3 mb-1 rounded text-pink-600 dark:text-pink-400 flex flex-col items-center justify-center"
    >
      <br />
      <span class="text-2xl block">
        {{ toastErrorDescription }}
      </span>
      <span class="block text-sm">
        Please view available
        <RouterLink class="underline" to="/targets"> /targets </RouterLink>
      </span>
    </div>
    <div class="md:flex flex-row flex-wrap mx-3">
      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Quantity Sold</span
        >
        <input
          id="salesTarget"
          v-model="quantitySold"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!quantitySoldMeta.valid && quantitySoldMeta.validated) ||
              (!quantitySoldMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!quantitySoldMeta.valid && quantitySoldMeta.validated) ||
                (!quantitySoldMeta.validated && !formIsValid)
              ),
          }"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="salesTarget"
          required
          type="tel"
        />
        <small
          v-if="!quantitySoldMeta.valid && quantitySoldMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ quantitySoldErrorMessage }}
        </small>
        <small
          v-else-if="!quantitySoldMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>

      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Distributor</span
        >
        <select
          id="distributor"
          v-model="distributorId"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!distributorIdMeta.valid && distributorIdMeta.validated) ||
              (!distributorIdMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!distributorIdMeta.valid && distributorIdMeta.validated) ||
                (!distributorIdMeta.validated && !formIsValid)
              ),
          }"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="distributor"
        >
          <option
            v-for="distributorX in distributors"
            :key="distributorX.id"
            :value="distributorX.id"
            class="py-2"
          >
            {{ distributorX.name }}
          </option>
        </select>
        <small
          v-if="!distributorIdMeta.valid && distributorIdMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ distributorIdErrorMessage }}
        </small>
        <small
          v-else-if="!distributorIdMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>

      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Product</span
        >
        <select
          id="product"
          v-model="productId"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!productIdMeta.valid && productIdMeta.validated) ||
              (!productIdMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!productIdMeta.valid && productIdMeta.validated) ||
                (!productIdMeta.validated && !formIsValid)
              ),
          }"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="product"
        >
          <option
            v-for="productObject in products"
            :key="productObject.id"
            :value="productObject.id"
            class="py-2"
          >
            {{ productObject.name }}
          </option>
        </select>
        <small
          v-if="!productIdMeta.valid && productIdMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ productIdErrorMessage }}
        </small>
        <small
          v-else-if="!productIdMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>

      <!--  create another input for the consumer    -->
      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Consumer</span
        >
        <select
          id="consumer"
          v-model="consumerId"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!consumerIdMeta.valid && consumerIdMeta.validated) ||
              (!consumerIdMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!consumerIdMeta.valid && consumerIdMeta.validated) ||
                (!consumerIdMeta.validated && !formIsValid)
              ),
          }"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="consumer"
        >
          <option
            v-for="consumerObject in consumers"
            :key="consumerObject.id"
            :value="consumerObject.id"
            class="py-2"
          >
            {{ consumerObject.name }}
          </option>
        </select>
        <small
          v-if="!consumerIdMeta.valid && consumerIdMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ consumerIdErrorMessage }}
        </small>
        <small
          v-else-if="!consumerIdMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>
    </div>

    <div class="py-3 flex justify-end">
      <button
        class="py-1 px-4 m-2 rounded-full border border-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-500 focus:ring focus:ring-red-300 dark:focus:ring-red-500 active:ring-red-300 dark:active:ring-red-400 hover:text-white dark:hover:text-stone-50 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
        @click="onCancelClick(false)"
      >
        Cancel
      </button>
      <button
        class="py-1 px-4 m-2 rounded-full bg-sky-400 focus:ring focus:ring-sky-200 active:ring-sky-300 hover:bg-sky-600 hover:text-white focus:outline-none transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
        @click="onCreateClick(false)"
      >
        Create
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { onMounted, ref, Ref } from "vue";
import { CreateSale } from "../../../stores/sales/interfaces";
import { useSalesStore } from "../../../stores/sales";
import { useRequest } from "vue-request";
import { useDistributorsStore } from "../../../stores/distributors";
import { useProductsStore } from "../../../stores/products";
import { useConsumersStore } from "../../../stores/consumers";
import { startCase } from "lodash";

const salesStore = useSalesStore();

const distributorsStore = useDistributorsStore();

const productsStore = useProductsStore();

const consumersStore = useConsumersStore();

const {
  value: distributorId,
  errorMessage: distributorIdErrorMessage,
  meta: distributorIdMeta,
} = useField("distributorId");

const {
  value: productId,
  errorMessage: productIdErrorMessage,
  meta: productIdMeta,
} = useField("productId");

const {
  value: consumerId,
  errorMessage: consumerIdErrorMessage,
  meta: consumerIdMeta,
} = useField("consumerId");

const quantitySoldValidation = (value: string) => {
  if (!value) return "This is a required field!";

  if (!/^\d+$/.test(value)) {
    return "The sales target should be a number!";
  }

  const numValue = Number.parseInt(value);

  if (numValue <= 0) {
    return "The sales target must be a positive number!";
  }

  return true;
};

const {
  value: quantitySold,
  errorMessage: quantitySoldErrorMessage,
  meta: quantitySoldMeta,
} = useField("quantitySold", quantitySoldValidation);

const {
  data: distributors,
  loading: distributorsLoading,
  error: distributorsError,
} = useRequest(distributorsStore.fetchDistributors(), {
  refreshOnWindowFocus: true,
  pollingInterval: 60000,
});

console.error(distributorsError);

const {
  data: products,
  loading: productsLoading,
  error: productsError,
} = useRequest(productsStore.fetchProducts(), {
  refreshOnWindowFocus: true,
  pollingInterval: 60000,
});

console.error(productsError);

const {
  data: consumers,
  loading: consumersLoading,
  error: consumersError,
} = useRequest(consumersStore.fetchConsumers(), {
  refreshOnWindowFocus: true,
  pollingInterval: 60000,
});

console.error(consumersError);

const emits = defineEmits<{
  (e: "name-input", input: HTMLElement | null): void;
  (e: "close-modal", value: boolean): void;
}>();

const nameInputRef: Ref<HTMLInputElement | null> = ref(null);

onMounted(() => {
  emits("name-input", nameInputRef.value);
});

const formIsValid: Ref<boolean> = ref(true);

const onCancelClick = (value: boolean) => {
  emits("close-modal", value);
};

const validateForm = () => {
  formIsValid.value =
    distributorIdMeta.valid && productIdMeta.valid && quantitySoldMeta.valid;
};

const createSalesPayload = () => {
  const payload: CreateSale = {
    DistributorId: distributorId.value as string,
    ProductId: productId.value as string,
    quantitySold: Number.parseInt(quantitySold.value),
    ConsumerId: consumerId.value as string,
  };

  return payload;
};

const toastErrorDescription: Ref<string> = ref("");

const onCreateClick = async (value: boolean) => {
  validateForm();
  if (formIsValid.value) {
    try {
      await salesStore.createSale({ ...createSalesPayload() });
      emits("close-modal", value);
    } catch (error: any) {
      if (error.statusCode === 404) {
        toastErrorDescription.value =
          startCase(error.message.toLowerCase()) + "!";
      }
    }
  }
};
</script>

<style scoped></style>
