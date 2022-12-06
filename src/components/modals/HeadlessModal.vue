<template>
  <Dialog :open="isOpen" @close="setIsOpen">
    <DialogPanel>
      <DialogTitle>activate account</DialogTitle>
      <DialogDescription>
        This will permanently activate your account
      </DialogDescription>

      <p>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </p>

      <button @click="setIsOpen(false)">Deactivate</button>
      <button @click="setIsOpen(false)">Cancel</button>
    </DialogPanel>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const isOpen = ref(true);

function setIsOpen(value: boolean) {
  isOpen.value = value;
}
</script>

<style scoped></style>
