<script lang="ts" setup>
import SidebarLayout from "./layouts/SidebarLayout.vue";
import {useDark, useToggle} from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<template>
  <div class="dark:bg-gray-700 bg-rose-50">

    <SidebarLayout>
      <template #navProps>
        <h3 class="p-2 m-2 bg-rose-50 dark:bg-gray-600 text-zinc-800 dark:text-rose-100 rounded">
          Route
          Name:</h3>
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
