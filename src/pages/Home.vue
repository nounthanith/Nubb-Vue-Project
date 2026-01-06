<script setup>
import useHome from "./js/home.js";

const {products, loading, error} = useHome();
console.log(products);
</script>

<template>
  <div class="min-h-screen bg-black text-white text-center uppercase flex justify-center">
    <div class="w-full max-w-7xl p-6">

      <h1 class="text-2xl font-semibold mb-6 text-center tracking-wide">
        Products
      </h1>

      <p v-if="loading" class="text-center text-gray-400">
        Loading...
      </p>

      <p v-if="error" class="text-center text-red-400">
        {{ error }}
      </p>

      <ul class="space-y-4">
        <li
            v-for="item in products"
            :key="item.id"
            class="group relative py-3 cursor-pointer"
        >
          <!-- Text -->
          <span class="relative z-10 block text-lg tracking-wide">
            {{ item.title }}
          </span>
          <span
              class="absolute left-1/2 bottom-0 h-0.5 w-0 bg-white
                   transition-all duration-300 ease-out
                   group-hover:w-full group-hover:left-0"
          ></span>

        </li>
      </ul>

    </div>
  </div>
</template>

