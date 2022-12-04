<template>
  <TableRowHeader :key="tableRowHeaderKey"
    >{{ tableRowHeaderValue }}
  </TableRowHeader>
  <td v-for="(value, index) in values" :key="keys[index]" class="py-4 px-6">
    {{ value }}
  </td>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TableRowHeader from "./TableRowHeader.vue";

interface TableDataProps {
  record: object;
}

const props = defineProps<TableDataProps>();

const values = ref(Object.values(props.record));
const keys = ref(Object.keys(props.record));

// remove the id
values.value.shift();
keys.value.shift();

// save the heading of the table row
const tableRowHeaderValue = ref(values.value.shift());
const tableRowHeaderKey = ref(keys.value.shift());
</script>

<style scoped></style>
