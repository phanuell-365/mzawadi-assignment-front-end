<script lang="ts" setup>
import SidebarLayout from "./layouts/SidebarLayout.vue";
import { useDark, useToggle } from "@vueuse/core";
import SidebarContainer from "./components/sidebar/SidebarContainer.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="dark:bg-zinc-600 bg-zinc-50 h-screen">
    <SidebarLayout>
      <template #navProps>
        <SidebarContainer />
      </template>
      <template #pages>
        <Suspense>
          <template #default>
            <RouterView></RouterView>
          </template>
          <template #fallback></template>
        </Suspense>
      </template>
    </SidebarLayout>
  </div>
</template>

<style scoped></style>
