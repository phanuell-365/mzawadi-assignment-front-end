<template>
  <table class="w-full text-3xs text-left text-zinc-500 dark:text-zinc-400">
    <!--  The head of the table  -->
    <thead
      class="text-xs text-stone-700 uppercase bg-gray-100 dark:bg-zinc-600 dark:text-stone-400"
    >
      <tr>
        <th
          v-for="attribute in attributes"
          :key="attribute"
          class="py-1.5 px-3"
          scope="col"
        >
          {{ startCase(attribute) }}
        </th>
      </tr>
    </thead>

    <!--  The body of the table  -->
    <tbody>
      <tr
        v-for="record in tableRecords"
        :key="record.id"
        class="bg-white border-b dark:bg-zinc-700 dark:border-zinc-600"
      >
        <DashboardTableData
          :table-attributes="attributes"
          :table-object="record"
        />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import DashboardTableData from "./DashboardTableData.vue";
import { startCase } from "lodash";

interface DashboardTableProps {
  tableAttributes: string[];
  tableRecords: object[];
}

const props = defineProps<DashboardTableProps>();

const attributes = props.tableAttributes.filter(
  (value) => value !== "id" && value !== "email"
);
</script>

<style scoped></style>
