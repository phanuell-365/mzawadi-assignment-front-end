<template>
  <div>

    <h2 class="text-rose-700 dark:text-rose-600 text-2xl">Dashboard</h2>
    <div>
      <CreateModalContainer ref="modalContainerRef" :options="options"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {Ref} from "vue";
import {reactive, ref} from "vue";
import CreateModalContainer from "../components/modals/create/CreateModalContainer.vue";
import {ModalOptions} from "../components/modals/interfaces";
import {useRoutingStore} from "../stores/routing";
import {RouteRecordName, useRoute} from "vue-router";

const modalContainerRef: Ref<InstanceType<typeof CreateModalContainer>> = ref();

const options = reactive({
  placement: 'center',
  backdrop: 'dynamic',
  backdropClasses: 'bg-zinc-900 dark:bg-zinc-200 antialiased bg-opacity-20 dark:bg-opacity-20 fixed inset-0 z-40 backdrop-blur-sm',
  onHide: () => {
    console.log('modal is hidden');
  },
  onShow: () => {
    console.log('modal is shown');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  }
} as ModalOptions);


const routingStore = useRoutingStore();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(<RouteRecordName>route?.name as string);

</script>

<style scoped>

</style>
