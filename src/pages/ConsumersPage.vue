<template>
  <div>
    <TransitionRoot
        :show="isOpen" as="template">
      <Dialog class="relative z-50" static @close="setIsOpen">

        <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div aria-hidden="true" class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
        </TransitionChild>

        <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
        >
          <div class="fixed inset-0 overflow-y-auto">
            <!-- Full-screen scrollable container -->
            <div class="fixed inset-0 flex items-center justify-center p-4">
              <!-- Container to center the panel -->
              <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full max-w-sm md:max-w-md rounded-lg shadow-lg bg-white px-7 py-5 m-5">
                  <DialogTitle class="my-3 text-2xl font-bold text-zinc-700">Deactivate account</DialogTitle>
                  <DialogDescription class="text-zinc-600">
                    This will permanently deactivate your account
                  </DialogDescription>
                  <p class="my-4 text-zinc-500">
                    Are you sure you want to deactivate your account? All of your data will be
                    permanently removed. This action cannot be undone.
                  </p>

                  <div class="my-3">
                    <button
                        class="py-0.5 px-3 m-2 rounded-full bg-rose-500 focus:ring focus:ring-rose-400 active:ring-rose-300 hover:bg-rose-800 hover:text-white focus:outline-none"
                        @click="setIsOpen(false)">
                      Deactivate
                    </button>
                    <button
                        class="py-0.5 px-3 m-2 rounded-full bg-rose-300 focus:ring active:ring-rose-500 hover:bg-rose-500 focus:outline-none"
                        @click="setIsOpen(false)">
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Dialog, DialogDescription, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'

const isOpen = ref(true)

function setIsOpen(value: any) {
  isOpen.value = value
}
</script>

<style scoped>

</style>
