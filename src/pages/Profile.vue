<script setup>
import {onMounted} from "vue";
import {useAuth} from "../hooks/useProfile.js";

const {profile, loading, error, getProfile} = useAuth();

onMounted(() => {
  getProfile();
});
</script>


<template>
  <div class="max-w-5xl mx-auto antialiased px-4">
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      <div v-if="loading" class="p-6 md:p-10 flex flex-col md:flex-row justify-between gap-6 animate-pulse">
        <div v-for="i in 4" :key="i" class="h-12 bg-slate-50 rounded-xl w-full md:w-32"></div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium">
          <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          {{ error }}
        </div>
      </div>

      <div v-else-if="profile" class="flex flex-col md:flex-row md:items-center p-6 md:p-10 gap-6 md:gap-12">

        <div class="flex-1">
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">Full Name</label>
          <p class="text-[15px] md:text-base font-semibold text-slate-900">{{ profile.name }}</p>
        </div>

        <div class="block md:hidden h-px bg-slate-100 w-full"></div>

        <div class="flex-1">
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">Email
            Address</label>
          <p class="text-[15px] md:text-base font-semibold text-slate-900 truncate">{{ profile.email }}</p>
        </div>

        <div class="block md:hidden h-px bg-slate-100 w-full"></div>

        <div class="flex-1">
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">Joined</label>
          <p class="text-[15px] md:text-base font-semibold text-slate-900">
            {{
              new Date(profile.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            }}
          </p>
        </div>

        <div class="flex-shrink-0 pt-2 md:pt-0">
          <div
              class="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-emerald-50 rounded-full border border-emerald-100/50">
            <span class="relative flex h-2 w-2">
              <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">Active</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>