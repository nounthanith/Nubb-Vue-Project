<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router'; // Added router for redirection

const router = useRouter();
const form = ref({
  email: '',
  password: ''
});

const showPassword = ref(false); // Added this so your template works
const isLoading = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const apiEndpoint = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiEndpoint}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // MUST add this to match your app.use(cors({ credentials: true }))
      credentials: 'include',
      body: JSON.stringify(form.value),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // If login is successful
    console.log('Success:', data);

    // Store token if your backend provides one in the JSON body
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    router.push('/'); // Redirect to home/dashboard

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
          <h1 class="text-2xl font-semibold text-slate-900">Sign in</h1>
          <p class="text-sm text-slate-500 mt-1">Please enter your details below.</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
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
            <div class="flex justify-between mb-1.5">
              <label class="text-sm font-medium text-slate-700">Password</label>
              <a href="#" class="text-sm font-medium text-pink-600 hover:text-pink-700">Forgot?</a>
            </div>
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
              class="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors duration-200 mt-2"
          >
            Continue
          </button>
        </form>

        <p class="text-center text-sm text-slate-600 mt-6">
          Don't have an account?
          <a href="#" class="text-pink-600 font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Removed all animation and blob CSS for a clean look */
</style>