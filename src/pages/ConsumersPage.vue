<template>
  <div class="flex justify-between items-center">
    <div class="heading my-3 pb-3 pt-5">
      <h2 class="text-3xl text-stone-600 dark:text-stone-50 font-bold antialiased">Consumers</h2>
    </div>
    <div>
      <AddResourceButton/>
    </div>
  </div>
  <MainCard>
    <AllConsumers/>
  </MainCard>
  <div></div>
</template>

<script lang="ts" setup>
import MainCard from "../components/cards/MainCard.vue";
import AllConsumers from "../components/app/consumers/AllConsumers.vue";
import AddResourceButton from "../components/buttons/AddResourceButton.vue";
import {useRoutingStore} from "../stores/routing";
import {RouteRecordName, useRoute} from "vue-router";

const routingStore = useRoutingStore();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(<RouteRecordName>route?.name as string);
</script>

<style scoped>

</style>
