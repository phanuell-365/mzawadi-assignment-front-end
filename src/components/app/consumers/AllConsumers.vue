<template>
  <div>
    <div class="overflow-x-auto relative sm:rounded-lg">
      <div class="pb-4 p-4 bg-white dark:bg-zinc-900">
        <label class="sr-only" for="table-search">Search</label>
        <div class="relative mt-1">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-stone-500 dark:text-stone-400" fill="currentColor"
                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    fill-rule="evenodd"></path>
            </svg>
          </div>
          <input id="table-search"
                 class="block p-2 pl-10 w-80 text-sm text-stone-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Search for items"
                 type="text">
        </div>
      </div>
      <table class="w-full text-sm text-left text-stone-500 dark:text-stone-400">
        <thead class="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-stone-400">
        <tr>
          <th class="p-4" scope="col">
            <div class="flex items-center">
              <input id="checkbox-all-search"
                     class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                     type="checkbox">
              <label class="sr-only" for="checkbox-all-search">checkbox</label>
            </div>
          </th>
          <th class="py-3 px-6" scope="col">
            Product name
          </th>
          <th class="py-3 px-6" scope="col">
            Color
          </th>
          <th class="py-3 px-6" scope="col">
            Category
          </th>
          <th class="py-3 px-6" scope="col">
            Price
          </th>
          <th class="py-3 px-6" scope="col">
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input id="checkbox-table-search-1"
                     class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                     type="checkbox">
              <label class="sr-only" for="checkbox-table-search-1">checkbox</label>
            </div>
          </td>
          <th class="py-4 px-6 font-medium text-stone-900 whitespace-nowrap dark:text-white" scope="row">
            Apple MacBook Pro 17"
          </th>
          <td class="py-4 px-6">
            Sliver
          </td>
          <td class="py-4 px-6">
            Laptop
          </td>
          <td class="py-4 px-6">
            $2999
          </td>
          <td class="py-4 px-6">
            <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">Edit</a>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input id="checkbox-table-search-2"
                     class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                     type="checkbox">
              <label class="sr-only" for="checkbox-table-search-2">checkbox</label>
            </div>
          </td>
          <th class="py-4 px-6 font-medium text-stone-900 whitespace-nowrap dark:text-white" scope="row">
            Microsoft Surface Pro
          </th>
          <td class="py-4 px-6">
            White
          </td>
          <td class="py-4 px-6">
            Laptop PC
          </td>
          <td class="py-4 px-6">
            $1999
          </td>
          <td class="py-4 px-6">
            <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">Edit</a>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input id="checkbox-table-search-3"
                     class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                     type="checkbox">
              <label class="sr-only" for="checkbox-table-search-3">checkbox</label>
            </div>
          </td>
          <th class="py-4 px-6 font-medium text-stone-900 whitespace-nowrap dark:text-white" scope="row">
            Magic Mouse 2
          </th>
          <td class="py-4 px-6">
            Black
          </td>
          <td class="py-4 px-6">
            Accessories
          </td>
          <td class="py-4 px-6">
            $99
          </td>
          <td class="py-4 px-6">
            <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">Edit</a>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input id="checkbox-table-3"
                     class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                     type="checkbox">
              <label class="sr-only" for="checkbox-table-3">checkbox</label>
            </div>
          </td>
          <th class="py-4 px-6 font-medium text-stone-900 whitespace-nowrap dark:text-white" scope="row">
            Apple Watch
          </th>
          <td class="py-4 px-6">
            Silver
          </td>
          <td class="py-4 px-6">
            Accessories
          </td>
          <td class="py-4 px-6">
            $179
          </td>
          <td class="py-4 px-6">
            <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">Edit</a>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input id="checkbox-table-3"
                     class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                     type="checkbox">
              <label class="sr-only" for="checkbox-table-3">checkbox</label>
            </div>
          </td>
          <th class="py-4 px-6 font-medium text-stone-900 whitespace-nowrap dark:text-white" scope="row">
            iPad
          </th>
          <td class="py-4 px-6">
            Gold
          </td>
          <td class="py-4 px-6">
            Tablet
          </td>
          <td class="py-4 px-6">
            $699
          </td>
          <td class="py-4 px-6">
            <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">Edit</a>
          </td>
        </tr>
        <tr class="bg-white dark:border-b dark:border-gray-700 dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-600">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input id="checkbox-table-3"
                     class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-gray-600"
                     type="checkbox">
              <label class="sr-only" for="checkbox-table-3">checkbox</label>
            </div>
          </td>
          <th class="py-4 px-6 font-medium text-stone-900 whitespace-nowrap dark:text-white" scope="row">
            Apple iMac 27"
          </th>
          <td class="py-4 px-6">
            Silver
          </td>
          <td class="py-4 px-6">
            PC Desktop
          </td>
          <td class="py-4 px-6">
            $3999
          </td>
          <td class="py-4 px-6">
            <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">Edit</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script lang="ts" setup></script>

<style scoped>

</style>
