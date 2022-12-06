<template>
  <div class="rounded-lg shadow-lg bg-gray-50 dark:bg-zinc-900">
    <div class="relative">
      <div class="flex justify-between items-center pb-4 p-4">
        <div class="relative">
          <span class="text-zinc-500 dark:text-zinc-50 mx-2"> Search by </span>
          <select
            v-model="selectedKey"
            class="text-zinc-500 bg-white dark:zinc-900 border border-zinc-300 focus:outline-none hover:bg-stone-100 focus:ring-4 focus:ring-zinc-200 font-medium rounded-lg text-sm px-3 py-1.5 w-32 dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-zinc-600 dark:focus:ring-zinc-700"
          >
            <option v-for="key in searchKeys" :key="key" :value="key">
              {{ startCase(key) }}
            </option>
          </select>
        </div>
        <label class="sr-only" for="table-search">Search</label>
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-zinc-500 dark:text-zinc-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            id="table-search"
            v-model="query"
            autocomplete="off"
            class="block p-2 pl-10 w-80 text-sm text-zinc-900 bg-white rounded-lg border border-zinc-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            type="text"
          />
        </div>
      </div>
    </div>
    <div>
      <TableContainer
        :item-attributes="itemAttributes"
        :records="filteredRecords"
      >
        <template #edit="{ recordId }">
          <slot :record-id="recordId" name="edit" />
        </template>
      </TableContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TableContainer from "../tables/TableContainer.vue";
import { reactive, ref, watch } from "vue";
import Fuse from "fuse.js";
import { startCase } from "lodash";

interface SearchContainerProps {
  itemAttributes: string[];
  records: object[];
  searchKeys: string[];
}

const props = defineProps<SearchContainerProps>();

const selectedKey = ref(props.searchKeys[0]);

const query = ref("");

const options = reactive({
  keys: [selectedKey.value],
});

const filteredRecords = ref(props.records);

// watch(
//   () => [props.records, selectedKey.value],
//   ([records, selectedKey]) => {
//     options.keys = [selectedKey];
//     const fuse = new Fuse(records, options);
//     filteredRecords.value = fuse.search(query.value);
//   },
//   { immediate: true }
// );

// watch for the selectedKey
watch(selectedKey, (selectedKey) => {
  options.keys = [selectedKey];
  // console.log(selectedKey);
  // const fuse = new Fuse(props.records, options);
  // filteredRecords.value = fuse.search(query.value);
});

watch(query, (value) => {
  const fuse = new Fuse(props.records, options);
  const result = fuse.search(value.toLowerCase()).map((value1) => value1.item);
  filteredRecords.value = value === "" ? props.records : result;
});

//
//
// const filteredRecords = computed(() => {
//   return query.value === "" ? props.records : fuse.search(query.value);
// });
//
// console.log({ ...filteredRecords.value });
</script>

<style scoped></style>
