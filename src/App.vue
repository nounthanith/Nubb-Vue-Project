<template>
  <Navbar/>
  <main class="max-w-7xl mx-auto min-h-screen p-4 py-24">
    <RouterView/>
  </main>
</template>
<script setup>
import Navbar from "./layouts/Navbar.vue";

const warningTitle = `
  color: #db2777;
  font-size: 50px;
  font-weight: bold;
  -webkit-text-stroke: 1px black;
  font-family: sans-serif;
`;

console.log('%cSTOP!', warningTitle);

</script>
