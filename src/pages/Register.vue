<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const form = ref({
  name: '',      // Added name for register
  email: '',
  password: ''
});

const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const handleRegister = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const apiEndpoint = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiEndpoint}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(form.value),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Success: Redirect to login
    router.push('/login');

  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-[80vh] p-6">
    <div class="w-full max-w-md">
      <div class="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">

        <div class="mb-8">
          <h1 class="text-2xl font-semibold text-slate-900">Sign up</h1>
          <p class="text-sm text-slate-500 mt-1">Please enter your details below to join.</p>
        </div>

        <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <input
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <input
                v-model="form.email"
                type="email"
                placeholder="name@company.com"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                required
            />
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700 block mb-1.5">Password</label>
            <div class="relative">
              <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all text-slate-900"
                  required
              />
              <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                {{ showPassword ? 'HIDE' : 'SHOW' }}
              </button>
            </div>
          </div>

          <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors duration-200 mt-2 disabled:opacity-50"
          >
            {{ isLoading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <p class="text-center text-sm text-slate-600 mt-6">
          Already have an account?
          <RouterLink class="text-pink-600 font-semibold hover:underline" to="/login">Sign in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles removed as per your request for a clean look */
</style>