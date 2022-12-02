<script lang="ts" setup>
import SidebarLayout from "./layouts/SidebarLayout.vue";
import {useDark, useToggle} from '@vueuse/core'
import {useRoutingStore} from "./stores/routing";
import {onUpdated, ref, Ref} from "vue";

const isDark = useDark()
const toggleDark = useToggle(isDark)

const routingStore = useRoutingStore();

const currentRouteName: Ref<string | undefined> = ref(routingStore.getCurrentRouteName)

onUpdated(() => {
  currentRouteName.value = routingStore.getCurrentRouteName
})

// console.error({currentRouteName})
</script>

<template>
  <div class="dark:bg-zinc-600 bg-zinc-50 h-screen">
    <SidebarLayout>
      <template #navProps>
        <h3 class="p-2 m-2 bg-zinc-50 dark:bg-zinc-600 text-stone-800 dark:text-stone-50 rounded">
          Route Name:{{ currentRouteName }}</h3>
      </template>
      <template #pages="{routeName}">
        <RouterView>
        </RouterView>
      </template>
    </SidebarLayout>
  </div>
</template>

<style scoped>

</style>
