<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const loading = ref(false);
const profile = ref(null);
const error = ref(null);

const getProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const apiEndpoint = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiEndpoint}/api/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Standard way to send tokens
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    // console.log(data.user);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
      throw new Error(data.message || "Failed to fetch profile");
    }

    profile.value = data.user;
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getProfile();
});
</script>

<template>
  <div class="max-w-4xl mx-auto mt-10 p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">

    <div v-if="loading" class="space-y-6">
      <div v-for="i in 3" :key="i" class="animate-pulse">
        <div class="h-3 bg-slate-100 rounded w-24 mb-2"></div>
        <div class="h-10 bg-slate-50 rounded-xl w-full"></div>
      </div>
    </div>

    <div v-else-if="error" class="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"/>
      </svg>
      <span class="text-sm font-medium">{{ error }}</span>
    </div>

    <div v-else-if="profile" class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</label>
        <p class="text-slate-800 font-semibold">{{ profile.name }}</p>
      </div>

      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</label>
        <p class="text-slate-800 font-semibold">{{ profile.email }}</p>
      </div>

      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Member Since</label>
        <p class="text-slate-800 font-semibold">
          {{
            new Date(profile.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
          }}
        </p>
      </div>

      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Status</label>
        <div class="flex items-center gap-2 mt-1">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-green-700 text-sm font-bold uppercase">Active</span>
        </div>
      </div>

    </div>
  </div>
</template>