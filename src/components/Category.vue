<script setup>
import {ref, onMounted} from "vue";

const categories = ref([]);
const loading = ref(false);
const error = ref(null);

const getCategories = async () => {
  loading.value = true;
  error.value = null;

  try {
    const apiEndpoint = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiEndpoint}/api/category`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    const jsonResponse = await response.json();
    const data = jsonResponse?._value?.data || jsonResponse?.data || jsonResponse;
    categories.value = Array.isArray(data) ? data : [];
  } catch (err) {
    error.value = "Failed to load categories";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getCategories();
});
</script>

<template>
  <div class="w-full  border-b border-slate-50">
    <div class="max-w-5xl mx-auto px-4">

      <div class="flex justify-center items-center gap-3 overflow-x-auto no-scrollbar pb-2 scroll-smooth">

        <div v-if="loading" class="flex gap-3">
          <div v-for="i in 5" :key="i" class="w-24 h-9 bg-slate-50 animate-pulse rounded-full"></div>
        </div>

        <div
            v-for="item in categories"
            :key="item.id"
            class="shrink-0 cursor-pointer transition-all duration-300 active:scale-90"
        >
          <div
              class="px-6 py-2.5 rounded-full border-2 border-rose-100 bg-rose-50/50 text-[10px] uppercase font-black tracking-widest text-rose-600 shadow-sm hover:border-rose-500 hover:bg-rose-500 hover:text-white whitespace-nowrap transition-all duration-300"
          >
            {{ item.name }}
          </div>
        </div>

        <div v-if="error" class="text-[10px] font-bold text-red-400 uppercase tracking-widest px-4">
          {{ error }}
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Hidden scrollbar but keeps the function */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for iOS */
}
</style>