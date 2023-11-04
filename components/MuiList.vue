<template>
  <div>
    <ul class="dark:divide-white px-4">
      <li class="py-1 px-4 dark:bg-fuchsia-800 rounded-full">
        <div class="flex items-center">
          <input
            id="todo1"
            name="todo1"
            type="checkbox"
            class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <label for="todo1" class="ml-3 flex text-gray-900">
            <span class="text-lg font-medium dark:text-white"
              >Finish project proposal</span
            >
            <span class="text-sm font-light text-gray-500 dark:text-white"
              >Due on 4/1/23</span
            >
          </label>
        </div>
      </li>
      <li class="py-4">
        <div class="flex items-center">
          <input
            id="todo1"
            name="todo1"
            type="checkbox"
            class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded dark:text-white"
          />
          <label for="todo1" class="ml-3 block text-gray-900">
            <span class="text-lg font-medium dark:text-white"
              >Finish project proposal</span
            >
            <span class="text-sm font-light text-gray-500 dark:text-white"
              >Due on 4/1/23</span
            >
          </label>
        </div>
      </li>
    </ul>
  </div>
</template>
