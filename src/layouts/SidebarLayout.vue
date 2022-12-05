<template>
  <div class="max-w-[82rem] mx-auto px-3 sm:px-4 md:px-3">
    <aside
      class="hidden fixed lg:block z-20 bg-white dark:bg-zinc-700 inset-0 pb-10 px-5 right-auto w-[16rem] left-[max(0px,calc(50%-45rem))]"
    >
      <slot name="navProps" />
    </aside>
    <main class="lg:pl-[16rem]">
      <div>
        <slot name="pages" />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
// import ToggleDark from "../components/buttons/ToggleDark.vue";
</script>

<style scoped></style>
