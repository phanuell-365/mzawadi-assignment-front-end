<template>
  <Combobox v-model="selectedDistributor" name="DistributorId">
    <ComboboxLabel
      class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
      >Distributor
    </ComboboxLabel>
    <div
      class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-300 sm:text-sm"
    >
      <ComboboxInput
        :class="{
          'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
            (distributorQuery.length > 0 &&
              filteredDistributors?.length <= 0) ||
            (!distributorIdMeta.valid && distributorIdMeta.validated) ||
            (!distributorIdMeta.validated && !formIsValid),
          'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
            !(
              (!distributorIdMeta.valid && distributorIdMeta.validated) ||
              (!distributorIdMeta.validated && !formIsValid)
            ),
        }"
        :displayValue="(distributor) => distributor.name"
        class="peer leading-5 block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
        @change="distributorQuery = $event.target.value"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon aria-hidden="true" class="h-5 w-5 text-gray-400" />
      </ComboboxButton>
    </div>
    <ComboboxOptions
      class="rounded-lg shadow-lg my-2 py-1 bg-zinc-50 dark:bg-zinc-600 absolute z-10 inset w-[313px]"
    >
      <!--            <template-->
      <!--              v-if="-->
      <!--                distributorQuery.length > 0 && filteredDistributors?.length > 0-->
      <!--              "-->
      <!--            >-->
      <ComboboxOption
        v-for="filteredDistributor in filteredDistributors"
        :key="filteredDistributor.id"
        v-slot="{ selected, active }"
        :value="filteredDistributor"
      >
        <!--                class="py-2 px-3 bg-white dark:bg-zinc-600 dark:text-stone-50 hover:bg-stone-100 dark:hover:bg-zinc-700 block ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white"-->
        <li
          :class="{
            'bg-teal-600 text-white': active,
            'text-gray-900': !active,
          }"
          class="relative cursor-default select-none py-2 pl-10 pr-4"
        >
          <span
            :class="{
              'font-medium': selected,
              'font-normal': !selected,
            }"
            class="block truncate"
          >
            {{ filteredDistributor.name }}
          </span>
          <span
            v-if="selected"
            :class="{ 'text-white': active, 'text-teal-600': !active }"
            class="absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <CheckIcon aria-hidden="true" class="h-5 w-5" />
          </span>
        </li>
        <!--                {{ // filteredDistributor.name }}-->
      </ComboboxOption>
      <!--            </template>-->
    </ComboboxOptions>
  </Combobox>
  <small
    v-if="!distributorIdMeta.valid && distributorIdMeta.validated"
    class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
  >
    {{ distributorIdErrorMessage }}
  </small>
  <small
    v-else-if="!distributorIdMeta.validated && !formIsValid"
    class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
  >
    This is a required field
  </small>
  <!--        <small-->
  <!--          v-if="-->
  <!--            distributorQuery.length > 0 && filteredDistributors?.length <= 0-->
  <!--          "-->
  <!--          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"-->
  <!--        >-->
  <!--          Distributor not found!-->
  <!--        </small>-->
</template>

<script lang="ts" setup></script>

<style scoped></style>
