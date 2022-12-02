<template>
  <!-- Include the card heading -->
  <CardHeading/>
</template>

<script lang="ts" setup>
import {useRoutingStore} from "../stores/routing";
import {RouteRecordName, useRoute} from "vue-router";
import CardHeading from "../components/cards/CardHeading.vue";

const routingStore = useRoutingStore();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(<RouteRecordName>route?.name as string);
</script>

<style scoped>

</style>
