<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <aside
        class="hidden fixed lg:block z-20 bg-white dark:bg-gray-700 inset-0 pb-10 px-8 right-auto w-[19.5rem] left-[max(0px,calc(50%-45rem))]">
      <slot name="navProps"/>
    </aside>
    <main class="lg:pl-[19.5rem] ">
      <div>
        <ToggleDark/>
      </div>
      <div>
        <slot name="pages"/>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import ToggleDark from "../components/buttons/ToggleDark.vue";</script>

<style scoped>

</style>
