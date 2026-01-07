<template>
  <Navbar/>
  <main class="max-w-7xl mx-auto min-h-screen p-4 py-24">
    <RouterView/>
  </main>
</template>
<script setup>
import Navbar from "./layouts/Navbar.vue";

const secureTxt = "Go back!!!";

const style = `
  background-color: #db2777;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 14px;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
`;

console.log('%cHey what you wanna do?🫵🫵🫵', style);
</script>
