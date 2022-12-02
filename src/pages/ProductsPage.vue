<template>

</template>

<script lang="ts" setup>
import {useRoutingStore} from "../stores/routing";
import {RouteRecordName, useRoute} from "vue-router";

const routingStore = useRoutingStore();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(<RouteRecordName>route?.name as string);
</script>

<style scoped>

</style>
