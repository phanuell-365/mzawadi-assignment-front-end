<script lang="ts" setup></script>

<template>
  <RouterView name="LoginPage"></RouterView>
  <Suspense>
    <template #default>
      <div>
        <RouterView></RouterView>
      </div>
    </template>
    <template #fallback>
      <div
        class="dark:bg-zinc-600 bg-zinc-50 h-screen mx-auto flex flex-col justify-center items-center"
      >
        <span class="text-2xl"> Loading... </span>
      </div>
    </template>
  </Suspense>
</template>

<style scoped></style>
