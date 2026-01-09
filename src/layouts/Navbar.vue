<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "./../hooks/useProfile.js";

const router = useRouter();
const auth = useAuth();
const isMenuOpen = ref(false);

const linkItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Profile", link: "/profile" },
];

onMounted(() => {
  auth.getProfile(); // 🔥 fetch profile once
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleLogout = () => {
  const confirmed = window.confirm("Do you really want to logout?");
  if (confirmed) {
    auth.logout();
  }
};
</script>

<template>
  <nav class="fixed top-4 inset-x-0 z-50 max-w-5xl mx-auto px-4">
    <div
        class="flex items-center justify-between px-6 py-3 rounded-2xl
             bg-black/10 backdrop-blur-md border border-white/20
             shadow-[0_8px_32px_0_rgba(219,39,119,0.1)]"
    >
      <!-- Logo -->
      <div
          class="text-xl font-black bg-linear-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent"
      >
        BRAND
      </div>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="item in linkItems" :key="item.link">
          <RouterLink
              :to="item.link"
              class="text-sm font-medium text-slate-700 hover:text-pink-600
                   transition-colors relative group"
              active-class="text-pink-600 font-bold"
          >
            {{ item.name }}
            <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500
                     transition-all duration-300 group-hover:w-full"
            ></span>
          </RouterLink>
        </li>

        <!-- 🔐 Admin Only -->
        <RouterLink
            v-if="auth.isAdmin()"
            to="/admin"
            class="text-sm font-bold text-red-600"
        >
          Admin
        </RouterLink>
      </ul>

      <!-- Desktop Auth -->
      <div class="hidden md:flex items-center gap-4">
        <RouterLink
            v-if="!auth.profile"
            to="/login"
            class="px-5 py-2 text-sm font-semibold text-white
                 bg-pink-600 rounded-xl hover:bg-pink-700
                 hover:shadow-lg transition-all active:scale-95"
        >
          Login
        </RouterLink>

        <button
            v-else
            @click="handleLogout"
            class="px-5 py-2 text-sm font-semibold text-slate-700
                 bg-slate-100 rounded-xl hover:bg-slate-200
                 transition-all active:scale-95"
        >
          Logout
        </button>
      </div>

      <!-- Mobile Toggle -->
      <button @click="toggleMenu" class="md:hidden p-2 text-pink-600">
        <svg
            v-if="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7" />
        </svg>

        <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
    >
      <div
          v-if="isMenuOpen"
          class="md:hidden mt-2 p-4 rounded-2xl bg-white
               border border-pink-100 shadow-xl"
      >
        <ul class="flex flex-col gap-4">
          <li v-for="item in linkItems" :key="item.link">
            <RouterLink
                :to="item.link"
                class="block text-slate-700 font-medium px-2 py-1"
                @click="isMenuOpen = false"
            >
              {{ item.name }}
            </RouterLink>
          </li>

          <!-- 🔐 Admin Only -->
          <li v-if="auth.isAdmin()">
            <RouterLink
                to="/admin"
                class="block text-red-600 font-bold px-2 py-1"
                @click="isMenuOpen = false"
            >
              Admin
            </RouterLink>
          </li>

          <hr class="border-pink-50" />

          <RouterLink
              v-if="!auth.profile"
              to="/login"
              class="w-full text-center py-3 bg-pink-600
                   text-white rounded-xl font-bold"
              @click="isMenuOpen = false"
          >
            Login
          </RouterLink>

          <button
              v-else
              @click="handleLogout"
              class="w-full text-center py-3 bg-slate-800
                   text-white rounded-xl font-bold"
          >
            Logout
          </button>
        </ul>
      </div>
    </Transition>
  </nav>
</template>
