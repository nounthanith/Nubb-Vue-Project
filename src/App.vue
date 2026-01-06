<template>
  <!-- Navbar -->
  <nav
      class="max-w-7xl mx-auto sticky top-3 z-50
           flex items-center justify-between
           px-6 py-4
           rounded-3xl
           bg-pink-500/15 backdrop-blur-xl
           border border-pink-300/40
           shadow-lg shadow-pink-500/10"
  >
    <!-- Logo -->
    <div
        class="text-lg font-semibold tracking-wide text-pink-600 select-none"
    >
      Logo
    </div>

    <!-- Links -->
    <ul class="flex gap-8">
      <li
          v-for="item in linkItem"
          :key="item.link"
          class="relative group"
      >
        <RouterLink
            :to="item.link"
            class="relative font-mono text-sm tracking-widest uppercase
                 text-pink-600 transition-colors duration-300
                 hover:text-pink-500
                 router-link-active:text-pink-500"
        >
          {{ item.name }}

          <!-- underline -->
          <span
              class="absolute left-1/2 -bottom-1 h-[2px] w-0
                   bg-pink-500 rounded-full
                   transition-all duration-300 ease-out
                   group-hover:w-full group-hover:left-0
                   router-link-active:w-full router-link-active:left-0"
          ></span>
        </RouterLink>
      </li>
    </ul>
  </nav>

  <!-- Page Content -->
  <main class="max-w-7xl mx-auto min-h-screen p-4 mt-8">
    <RouterView/>
  </main>
</template>

<script setup>
const linkItem = [
  {name: "Home", link: "/"},
  {name: "About", link: "/about"},
];
</script>
