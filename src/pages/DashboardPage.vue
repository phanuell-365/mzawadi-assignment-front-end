<template>
  <SidebarLayout>
    <template #navProps>
      <SidebarContainer />
    </template>
    <template #pages>
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
          <RouterLink
            class="group hover:bg-sky-400 rounded-lg shadow py-4 my-2 px-6 mx-2 basis-1/3 bg-white flex flex-row items-center dark:bg-zinc-700 dark:hover:bg-sky-900 dark:shadow-zinc-700 transition hover:-translate-y-0.5 hover:scale-x-105 duration-150 ease-in-out"
            to="/distributors"
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
                {{ distributorsArray?.length }}
              </div>
            </div>
          </RouterLink>

          <RouterLink
            class="group hover:bg-red-400 rounded-lg shadow py-4 my-2 px-6 mx-2 basis-1/3 bg-white flex flex-row items-center dark:bg-zinc-700 dark:hover:bg-red-900 dark:shadow-zinc-700 transition hover:-translate-y-0.5 hover:scale-x-105 duration-150 ease-in-out"
            to="/consumers"
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
                {{ consumersArray?.length }}
              </div>
            </div>
          </RouterLink>

          <RouterLink
            class="group hover:bg-emerald-400 rounded-lg shadow py-4 my-2 px-6 mx-2 basis-1/3 bg-white flex flex-row items-center dark:bg-zinc-700 dark:hover:bg-emerald-900 dark:shadow-zinc-700 transition hover:-translate-y-0.5 hover:scale-x-105 duration-150 ease-in-out"
            to="/products"
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
                {{ productsArray?.length }}
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <DashboardTablesContainer>
        <DashTableComponent
          v-for="table in dashboardTables"
          :key="table.tableName"
          :table-name="table.tableName"
        >
          <template #table>
            <DashboardTable
              :table-attributes="table.tableAttributes"
              :table-records="table.tableRecords"
            />
          </template>
        </DashTableComponent>
      </DashboardTablesContainer>
    </template>
  </SidebarLayout>
</template>

<script lang="ts" setup>
import { UserIcon as DistributorsIcon } from "@heroicons/vue/20/solid";
import {
  ShoppingCartIcon,
  UserIcon as ConsumersIcon,
} from "@heroicons/vue/24/outline";

import { useRoutingStore } from "../stores/routing";
import { useRoute, useRouter } from "vue-router";
import { useDistributorsStore } from "../stores/distributors";
import { useConsumersStore } from "../stores/consumers";
import { useProductsStore } from "../stores/products";
import { reactive, Ref, ref } from "vue";
import { DistributorObject } from "../stores/distributors/interfaces";
import { ConsumerObject } from "../stores/consumers/interfaces";
import { ProductObject } from "../stores/products/interfaces";
import DashboardTablesContainer from "../components/dashboard/DashboardTablesContainer.vue";
import DashTableComponent from "../components/dashboard/DashTableComponent.vue";
import DashboardTable from "../components/dashboard/DashboardTable.vue";
import SidebarLayout from "../layouts/SidebarLayout.vue";
import SidebarContainer from "../components/sidebar/SidebarContainer.vue";

const router = useRouter();

const distributorsStore = useDistributorsStore();

const consumersStore = useConsumersStore();

const productsStore = useProductsStore();

const distributorsArray: Ref<DistributorObject[] | undefined> = ref([]);

const consumersArray: Ref<ConsumerObject[] | undefined> = ref([]);

const productsArray: Ref<ProductObject[] | undefined> = ref([]);

try {
  distributorsArray.value = await distributorsStore.fetchDistributors();
  consumersArray.value = await consumersStore.fetchConsumers();
  productsArray.value = await productsStore.fetchProducts();
} catch (error: any) {
  if (error.statusCode === 401) {
    distributorsArray.value = [];
    consumersArray.value = [];
    productsArray.value = [];
    router.push("/login");
  }
}

// get the first 4 distributors
const distributors = distributorsArray.value?.slice(0, 4);

// get the first 4 consumers
const consumers = consumersArray.value?.slice(0, 4);

const dashboardTables = reactive([
  {
    tableName: "distributors",
    tableRecords: distributors,
    tableAttributes: distributorsStore.getDistributorAttributes,
  },
  {
    tableName: "consumers",
    tableRecords: consumers,
    tableAttributes: consumersStore.getConsumersAttributes,
  },
]);

const routingStore = useRoutingStore();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(route?.name as string);
</script>

<style scoped></style>
