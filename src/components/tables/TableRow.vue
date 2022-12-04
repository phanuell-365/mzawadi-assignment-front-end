<template>
  <template v-if="records?.length > 0 && hasValue">
    <tr
      v-for="record in records"
      :key="record?.id"
      class="group/table-row bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600"
      tabindex="0"
    >
      <slot :record="record" name="row" />
    </tr>
  </template>
  <template v-else>
    <tr>
      <td
        :colspan="colCount + 1"
        class="flex items-center bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600"
      >
        <p class="">{{ comment }}</p>
      </td>
    </tr>
  </template>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface TableRowProps {
  records: object[];
  colCount: number;
  nullComment?: string;
}

const props = defineProps<TableRowProps>();

const hasValue = computed(() => {
  return props.records.some((value) => value);
});

const comment = computed(() =>
  props.nullComment ? props.nullComment : "No data to display"
);
</script>

<style scoped></style>
