<template>
  <div class="overflow-y-auto h-96 scroll-auto scrollbar:w-1.5">
    <table class="w-full text-sm text-left text-stone-500 dark:text-stone-400">
      <TableHead class="sticky top-0">
        <th v-for="attribute in attributes" :key="attribute" class="py-2 px-6">
          {{ startCase(attribute) }}
        </th>
        <th class="px-6 py-3">action</th>
      </TableHead>
      <tbody>
        <TableRow :col-count="attributes.length" :records="records">
          <template #row="{ record }">
            <TableData :record="record" />
            <td class="px-6 py-3">
              <slot :record-id="record.id" name="edit" />
            </td>
          </template>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";
import TableData from "./TableData.vue";
import { startCase } from "lodash";

interface TableContainerProps {
  itemAttributes: string[];
  records: object[];
}

const props = defineProps<TableContainerProps>();

const attributes = props.itemAttributes.filter((value) => value !== "id");
</script>

<style scoped></style>
