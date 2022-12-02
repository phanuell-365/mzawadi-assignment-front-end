<template>
  <div>
    <div class="py-2 my-3">
      <RouterLink
        class="text-stone-800 dark:text-stone-50 text-3xl font-bold"
        to="/dashboard"
        >Company X.
      </RouterLink>
    </div>
    <div class="py-2">
      <RouterLink
        active-class="bg-zinc-50 dark:bg-zinc-600 text-green-900 dark:text-green-200 transition delay-100 duration-75 ease-in-out"
        class="group hover:bg-green-50 dark:hover:text-green-100 dark:hover:bg-zinc-600 my-3 py-2 rounded flex items-center dark:text-stone-50 transition delay-100 duration-75 ease-in-out"
        to="/dashboard"
      >
        <div class="px-2">
          <HomeIcon
            class="w-6 h-6 inline-block group-hover:fill-green-400 group-hover:text-green-400"
          />
        </div>
        <div class="px-2">Dashboard</div>
      </RouterLink>

      <RouterLink
        active-class="bg-zinc-50 dark:bg-zinc-600 text-lime-900 dark:text-lime-200 transition delay-100 duration-75 ease-in-out"
        class="group hover:bg-lime-50 dark:hover:text-lime-100 dark:hover:bg-zinc-600 my-3 py-2 rounded flex items-center dark:text-stone-50 transition delay-100 duration-75 ease-in-out"
        to="/users"
      >
        <div class="px-2">
          <UsersIcon
            class="w-6 h-6 inline-block group-hover:fill-lime-400 group-hover:text-lime-400"
          />
        </div>
        <div class="px-2">Users</div>
      </RouterLink>

      <RouterLink
        active-class="bg-zinc-50 dark:bg-zinc-600 text-red-900 dark:text-red-200 transition delay-100 duration-75 ease-in-out"
        class="group hover:bg-red-50 dark:hover:text-red-100 dark:hover:bg-zinc-600 my-3 py-2 rounded flex items-center dark:text-stone-50 transition delay-100 duration-75 ease-in-out"
        to="/consumers"
      >
        <div class="px-2">
          <ConsumersIcon
            class="w-6 h-6 inline-block group-hover:fill-red-400 group-hover:text-red-400"
          />
        </div>
        <span class="px-2">Consumers</span>
      </RouterLink>

      <RouterLink
        active-class="bg-zinc-50 dark:bg-zinc-600 text-sky-900 dark:text-sky-200 transition delay-100 duration-75 ease-in-out"
        class="group hover:bg-sky-50 dark:hover:text-sky-100 dark:hover:bg-zinc-600 my-3 py-2 rounded flex items-center dark:text-stone-50 transition delay-100 duration-75 ease-in-out"
        to="/distributors"
      >
        <div class="px-2">
          <DistributorsIcon
            class="w-6 h-6 inline-block group-hover:stroke-sky-400 group-hover:stroke-width-1 group-hover:text-sky-400"
          />
        </div>
        <div class="px-2">Distributors</div>
      </RouterLink>

      <RouterLink
        active-class="bg-zinc-50 dark:bg-zinc-600 text-pink-900 dark:text-pink-200 transition delay-100 duration-75 ease-in-out"
        class="group hover:bg-pink-50 dark:hover:text-pink-100 dark:hover:bg-zinc-600 my-3 py-2 rounded flex items-center dark:text-stone-50 transition delay-100 duration-75 ease-in-out"
        to="/rewards"
      >
        <div class="px-2">
          <GiftIcon
            class="w-6 h-6 inline-block group-hover:fill-pink-400 group-hover:text-pink-400"
          />
        </div>
        <div class="px-2">Rewards</div>
      </RouterLink>

      <RouterLink
        active-class="bg-zinc-50 dark:bg-zinc-600 text-yellow-900 dark:text-yellow-200 transition delay-100 duration-75 ease-in-out"
        class="group hover:bg-yellow-50 dark:hover:text-yellow-100 dark:hover:bg-zinc-600 my-3 py-2 rounded flex items-center dark:text-stone-50 transition delay-100 duration-75 ease-in-out"
        to="/points"
      >
        <div class="px-2">
          <SparklesIcon
            class="w-6 h-6 inline-block group-hover:fill-yellow-400 group-hover:text-yellow-400"
          />
        </div>
        <div class="px-2">Points</div>
      </RouterLink>

      <RouterLink
        active-class="bg-zinc-50 dark:bg-zinc-600 text-teal-900 dark:text-teal-200 transition delay-100 duration-75 ease-in-out"
        class="group hover:bg-teal-50 dark:hover:text-teal-100 dark:hover:bg-zinc-600 my-3 py-2 rounded flex items-center dark:text-stone-50 transition delay-100 duration-75 ease-in-out"
        to="/targets"
      >
        <div class="px-2">
          <ScaleIcon
            class="w-6 h-6 inline-block group-hover:fill-teal-400 group-hover:text-teal-400"
          />
        </div>
        <div class="px-2">Targets</div>
      </RouterLink>

      <RouterLink
        active-class="bg-zinc-50 dark:bg-zinc-600 text-emerald-900 dark:text-emerald-200 transition delay-100 duration-75 ease-in-out"
        class="group hover:bg-emerald-50 dark:hover:text-emerald-100 dark:hover:bg-zinc-600 my-3 py-2 rounded flex items-center dark:text-stone-50 transition delay-100 duration-75 ease-in-out"
        to="/products"
      >
        <div class="px-2">
          <ShoppingCartIcon
            class="w-6 h-6 inline-block group-hover:fill-emerald-400 group-hover:text-emerald-400"
          />
        </div>
        <div class="px-2">Products</div>
      </RouterLink>

      <RouterLink
        active-class="bg-zinc-50 dark:bg-zinc-600 text-blue-900 dark:text-blue-200 transition delay-100 duration-75 ease-in-out"
        class="group hover:bg-blue-50 dark:hover:text-blue-100 dark:hover:bg-zinc-600 my-3 py-2 rounded flex items-center dark:text-stone-50 transition delay-100 duration-75 ease-in-out"
        to="/sales"
      >
        <div class="px-2">
          <CurrencyDollarIcon
            class="w-6 h-6 inline-block group-hover:fill-blue-400 group-hover:text-blue-400"
          />
        </div>
        <div class="px-2">Sales</div>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  CreditCardIcon as CurrencyDollarIcon,
  GiftIcon,
  HomeIcon,
  ScaleIcon,
  ShoppingCartIcon,
  SparklesIcon,
  UserIcon as ConsumersIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
import { UserIcon as DistributorsIcon } from "@heroicons/vue/24/solid";
import { Routes, useRoutingStore } from "../../stores/routing";
import { reactive, ref, Ref } from "vue";

const routingStore = useRoutingStore();

const currentRoute: Ref<Routes | undefined> = ref(routingStore.getCurrentRoute);

const someComponent = import("@heroicons/vue/24/outline/UsersIcon");

const routeInfo = reactive({
  path: currentRoute.value?.path,
  name: currentRoute.value?.name,
  description: currentRoute.value?.description,
});
</script>

<style scoped></style>
