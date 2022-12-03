<template>
  <form autocomplete="off" novalidate @submit.prevent>
    <div class="md:flex flex-row flex-wrap mx-3">
      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Sales Target</span
        >
        <input
          id="salesTarget"
          v-model="salesTarget"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!salesTargetMeta.valid && salesTargetMeta.validated) ||
              (!salesTargetMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!salesTargetMeta.valid && salesTargetMeta.validated) ||
                (!salesTargetMeta.validated && !formIsValid)
              ),
          }"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="salesTarget"
          required
          type="tel"
        />
        <small
          v-if="!salesTargetMeta.valid && salesTargetMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ salesTargetErrorMessage }}
        </small>
        <small
          v-else-if="!salesTargetMeta.validated && !formIsValid"
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
          v-model="DistributorName"
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
          v-model="ProductName"
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
          {{ distributorIdErrorMessage }}
        </small>
        <small
          v-else-if="!productIdMeta.validated && !formIsValid"
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
import { computed, onMounted, ref, Ref, watch } from "vue";
import { DistributorObject } from "../../../stores/distributors/interfaces";
import { ProductObject } from "../../../stores/products/interfaces";
import { CreateTarget } from "../../../stores/targets/interfaces";

const {
  value: DistributorName,
  errorMessage: distributorIdErrorMessage,
  meta: distributorIdMeta,
} = useField("DistributorId");

const {
  value: ProductName,
  errorMessage: productIdErrorMessage,
  meta: productIdMeta,
} = useField("productId");

const salesTargetValidation = (value: string) => {
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
  value: salesTarget,
  errorMessage: salesTargetErrorMessage,
  meta: salesTargetMeta,
} = useField("salesTarget", salesTargetValidation);

const distributors: Ref<DistributorObject[]> = ref([
  {
    id: "jo-001",
    name: "John Mutiso",
    email: "johnmutiso@localhost.com",
    phone: "0729291039",
    rewardAmount: 0,
  },
  {
    id: "jay-002",
    name: "Jacklin Akoth",
    email: "jacklineakoth@localhost.com",
    phone: "0730309392",
    rewardAmount: 0,
  },
  {
    id: "fa-003",
    name: "Faustine Smith",
    email: "faustinesmith@localhost.com",
    phone: "0748484829",
    rewardAmount: 0,
  },
  {
    id: "ma-004",
    name: "Mary Austine",
    email: "maryaustine@localhost.com",
    phone: "0739392848",
    rewardAmount: 0,
  },
]);

const products: Ref<ProductObject[]> = ref([
  {
    id: "yo-120",
    name: "Yoghurt",
    price: 120,
  },
  {
    id: "ma-250",
    name: "Margarine",
    price: 250,
  },
  {
    id: "pe-340",
    name: "Peanut Butter",
    price: 340,
  },
  {
    id: "spa-75",
    name: "Spaghetti",
    price: 75,
  },
]);

const selectedDistributor: Ref<DistributorObject> = ref(distributors.value[0]);

watch(selectedDistributor, (value) => {
  DistributorName.value = value.id;
});

const distributorQuery = ref("");

const filteredDistributors = computed(() =>
  distributorQuery.value === ""
    ? distributors
    : distributors.value.filter((value) =>
        value.name.toLowerCase().includes(distributorQuery.value.toLowerCase())
      )
);

const selectedProduct: Ref<ProductObject> = ref(products.value[0]);

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
    distributorIdMeta.valid && productIdMeta.valid && salesTargetMeta.valid;
};

const createTargetPayload = () => {
  const payload: CreateTarget = {
    DistributorId: DistributorName.value as string,
    ProductId: ProductName.value as string,
    salesTarget: Number.parseInt(salesTarget.value),
  };

  return payload;
};

const onCreateClick = (value: boolean) => {
  validateForm();

  if (formIsValid.value) {
    emits("close-modal", value);
    console.log({ ...createTargetPayload() });
  }
};
</script>

<style scoped></style>
