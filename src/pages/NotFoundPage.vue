<template>
  <div
    class="h-screen mx-auto flex flex-col justify-center items-center bg-zinc-50 dark:bg-zinc-600"
  >
    <CodeBracketIcon
      class="h-24 w-24 my-4 font-poppins-extra-bold text-stone-700 dark:text-stone-100"
    />
    <h1 class="text-6xl font-bold text-stone-600 dark:text-stone-50">404</h1>
    <h1 class="my-5 text-5xl font-bold text-stone-500 dark:text-stone-50">
      Page not found
    </h1>
    <p class="text-lg text-stone-400 dark:text-stone-50">
      The page you are looking for does not exist.
    </p>
    <p class="text-lg text-stone-400 dark:text-stone-50">
      You may have mistyped the address or the page may have moved.
    </p>
    <div class="flex justify-center items-center mt-5">
      <router-link
        class="text-lg text-stone-400 dark:text-stone-50 hover:text-stone-500 dark:hover:text-stone-100"
        to="/dashboard"
      >
        Go to dashboard page
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CodeBracketIcon } from "@heroicons/vue/24/outline";
</script>

<style scoped></style>
