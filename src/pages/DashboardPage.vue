<template>
  <div class="pt-5">
    <div
      class="mt-2 mb-5 py-5 mx-2 px-6 rounded-lg shadow bg-white dark:bg-zinc-700"
    >
      <h2
        class="text-stone-600 dark:text-stone-50 text-3xl font-bold antialiased"
      >
        Dashboard
      </h2>
    </div>
  </div>
  <div>
    <div class="md:flex flex-row flex-nowrap justify-between items-center">
      <div
        class="group hover:bg-sky-400 rounded-lg shadow py-4 my-2 px-6 mx-2 basis-1/3 bg-white flex flex-row items-center dark:bg-zinc-700 dark:hover:bg-sky-900 dark:shadow-zinc-700 transition hover:-translate-y-0.5 hover:scale-x-105 duration-150 ease-in-out"
      >
        <DistributorsIcon
          class="w-10 h-10 mr-6 inline-block text-sky-400 group-hover:stroke-white dark:group-hover:stroke-sky-200 group-hover:fill-sky-400 dark:group-hover:fill-sky-900 group-hover:stroke-width-1 group-hover:text-white dark:group-hover:text-sky-200"
        />
        <div>
          <div
            class="text-stone-400 dark:text-stone-300 font-inter-semi-bold text-sm group-hover:text-sky-50 dark:group-hover:text-sky-300"
          >
            Total Distributors
          </div>

          <div
            class="text-2xl font-inter-bold dark:text-stone-50 group-hover:text-white dark:group-hover:text-sky-200"
          >
            71, 897
          </div>
        </div>
      </div>
      <div
        class="group hover:bg-red-400 rounded-lg shadow py-4 my-2 px-6 mx-2 basis-1/3 bg-white flex flex-row items-center dark:bg-zinc-700 dark:hover:bg-red-900 dark:shadow-zinc-700 transition hover:-translate-y-0.5 hover:scale-x-105 duration-150 ease-in-out"
      >
        <ConsumersIcon
          class="w-10 h-10 mr-6 inline-block text-red-400 group-hover:text-white dark:group-hover:text-red-200"
        />
        <div>
          <div
            class="text-stone-400 dark:text-stone-300 font-inter-semi-bold text-sm group-hover:text-red-50 dark:group-hover:text-red-300"
          >
            Total Consumers
          </div>
          <div
            class="text-2xl font-inter-bold dark:text-stone-50 group-hover:text-white dark:group-hover:text-red-200"
          >
            71, 897
          </div>
        </div>
      </div>
      <div
        class="group hover:bg-emerald-400 rounded-lg shadow py-4 my-2 px-6 mx-2 basis-1/3 bg-white flex flex-row items-center dark:bg-zinc-700 dark:hover:bg-emerald-900 dark:shadow-zinc-700 transition hover:-translate-y-0.5 hover:scale-x-105 duration-150 ease-in-out"
      >
        <ShoppingCartIcon
          class="w-10 h-10 mr-6 inline-block text-emerald-400 group-hover:text-white dark:group-hover:text-emerald-200"
        />
        <div>
          <div
            class="text-stone-400 dark:text-stone-300 font-inter-semi-bold text-sm group-hover:text-emerald-50 dark:group-hover:text-emerald-300"
          >
            Total Products
          </div>
          <div
            class="text-2xl font-inter-bold dark:text-stone-50 group-hover:text-white dark:group-hover:text-emerald-200"
          >
            71, 897
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-row flex-nowrap mt-5 py-2 font-poppins-light text-3xs">
    <div v-for="table in 2" :key="table">
      <div
        class="group/table shadow-xl dark:shadow-2xl mx-3 py-2 px-3 bg-white dark:bg-zinc-700"
      >
        <div>
          <div
            class="m-1 p-2 dark:text-stone-50 text-sm uppercase font-bold tracking-widest"
          >
            distributors
          </div>
          <div class="m-1 p-2">
            <div class="overflow-x-auto relative">
              <table
                class="w-full text-3xs text-left text-zinc-500 dark:text-zinc-400"
              >
                <thead
                  class="text-xs text-stone-700 uppercase bg-gray-100 dark:bg-zinc-600 dark:text-stone-400"
                >
                  <tr>
                    <th
                      v-for="prod in 4"
                      :key="prod"
                      class="py-1.5 px-3"
                      scope="col"
                    >
                      Product name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="taRow in 4"
                    :key="taRow"
                    class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700"
                  >
                    <th
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      scope="row"
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td v-for="taData in 3" :key="taData" class="py-2 px-3">
                      Sliver
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          class="flex invisible group-hover/table:visible justify-end text-3xs font-poppins-light px-4 my-1"
        >
          <button
            class="flex group/view-all relative items-center whitespace-nowrap rounded-full py-1 px-4 pr-3 text-sm text-stone-500 dark:text-stone-300 transition hover:bg-stone-200 dark:hover:bg-zinc-600 hover:bg-stone text-stone-500 dark:text-stone-300 transition"
          >
            <span
              class="font-semibold transition hover:text-stone-700 dark:hover:text-stone-100"
            >
              {{ startCase("view all") }}
            </span>
            <ChevronRightIcon
              class="w-5 h-5 transition group-hover/view-all:translate-x-1 mt-px"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserIcon as DistributorsIcon } from "@heroicons/vue/20/solid";
import {
  ChevronRightIcon,
  ShoppingCartIcon,
  UserIcon as ConsumersIcon,
} from "@heroicons/vue/24/outline";

import { useRoutingStore } from "../stores/routing";
import { useRoute } from "vue-router";
import { startCase } from "lodash";

const routingStore = useRoutingStore();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(route?.name as string);
</script>

<style scoped></style>
