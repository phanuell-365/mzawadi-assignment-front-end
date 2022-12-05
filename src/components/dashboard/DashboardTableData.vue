<template>
  <DashboardTableRowHeader :key="dashboardTableRowHeaderKey">
    {{ dashboardTableRowHeaderValue }}
  </DashboardTableRowHeader>
  <td v-for="(val, index) in values" :key="keys[index]" class="py-2 px-3">
    {{ val }}
  </td>
</template>

<script lang="ts" setup>
import DashboardTableRowHeader from "./DashboardTableRowHeader.vue";
import { ref } from "vue";

interface DashboardTableDataProps {
  tableObject: object;
  tableAttributes: string[];
}

const props = defineProps<DashboardTableDataProps>();

const newObject = ref(
  Object.assign(
    {},
    ...props.tableAttributes.map((value) => {
      return {
        [value]: props.tableObject[value],
      };
    })
  )
);

const values = ref(Object.values(newObject.value));
const keys = ref(Object.keys(newObject.value));

// get the name property of the object
const dashboardTableRowHeaderValue = ref(values.value.shift());
const dashboardTableRowHeaderKey = ref(keys.value.shift());
</script>

<style scoped></style>
