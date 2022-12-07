<template>
  <div>Loading...</div>
</template>

<script lang="ts" setup>
interface WithSuspenseProps {
  time: number;
}

const props = defineProps<WithSuspenseProps>();

await new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve();
  }, props.time);
});
</script>

<style scoped></style>
