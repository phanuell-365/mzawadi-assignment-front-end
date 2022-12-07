<template>
  <div
    id="toast-danger"
    class="flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    role="alert"
  >
    <div
      class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          fill-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Error icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">{{ description }}</div>
    <button
      aria-label="Close"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-danger"
      type="button"
    >
      <span class="sr-only">Close</span>
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          fill-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, Ref } from "vue";

interface ToastErrorProps {
  description: string;
}

const props = defineProps<ToastErrorProps>();

const toastRef: Ref<HTMLDivElement | null> = ref(null);

const triggerEl: Ref<HTMLDivElement | null> = ref(null);

const options = reactive({
  triggerEl: triggerEl.value,
  transition: "transition-opacity",
  duration: 1000,
  timing: "ease-out",

  // callback functions
  onHide: (context: any, targetEl: any) => {
    console.log("element has been dismissed");
    console.log(targetEl);
  },
});

onMounted(() => {
  const toast = Dismiss(toastRef.value, options);
});

defineExpose({
  show: () => {
    // on show, simulate a click event on the triggerEl element
    triggerEl.value?.click();
  },
});
</script>

<style scoped></style>
