<template>
  <!--        <div class="">-->
  <Combobox v-model="selectedDistributor">
    <ComboboxLabel
      class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
      >Distributor
    </ComboboxLabel>
    <div class="relative">
      <div
        class="relative w-full cursor-default overflow-hidden bg-white dark:bg-zinc-600 text-left"
      >
        <ComboboxInput
          :displayValue="(person) => person.name"
          class="w-full py-2 pl-3 pr-10 peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          @change="distributorQuery = $event.target.value"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon aria-hidden="true" class="h-5 w-5 text-gray-400" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="distributorQuery = ''"
      >
        <ComboboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredDistributors?.length === 0 && distributorQuery !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="person in filteredDistributors"
            :key="person.id"
            v-slot="{ selected, active }"
            :value="person"
            as="template"
          >
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
                {{ person.name }}
              </span>
              <span
                v-if="selected"
                :class="{
                  'text-white': active,
                  'text-teal-600': !active,
                }"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <CheckIcon aria-hidden="true" class="h-5 w-5" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
  <!--        </div>-->
</template>

<script lang="ts" setup></script>

<style scoped></style>
