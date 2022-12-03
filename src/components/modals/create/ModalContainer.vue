<template>
  <TransitionRoot :show="show" as="template">
    <Dialog
      :initial-focus="initialFocus"
      class="relative z-50"
      static
      @close="() => null"
    >
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <!--   Backdrop     -->
        <div
          aria-hidden="true"
          class="fixed inset-0 bg-black/30 backdrop-blur-sm"
        />
      </TransitionChild>

      <TransitionChild
        enter="duration-100 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-80 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            class="w-full md:w-7/12 rounded-lg shadow-lg dark:shadow-xl bg-white dark:bg-zinc-700 px-7 py-5 m-5"
          >
            <DialogTitle
              class="my-3 text-2xl font-bold text-stone-700 dark:text-stone-50"
              >{{ dialogTitle }}
            </DialogTitle>
            <DialogDescription class="text-stone-600 dark:text-stone-100">
              {{ dialogDescription }}
            </DialogDescription>
            <div class="py-2 m-3">
              <slot name="content" />
            </div>
          </DialogPanel>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

interface ModalContainerProps {
  dialogTitle: string;
  dialogDescription?: string;
  show: boolean;
  initialFocus: HTMLElement | null;
}

defineProps<ModalContainerProps>();
</script>

<style scoped></style>
