<template>
  <div class="min-h-screen flex flex-col">
    <div
      class="flex flex-grow items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="w-full max-w-md space-y-8">
        <div>
          <img
            class="mx-auto h-32 w-auto"
            src="/images/Wonderguide-logo.png"
            alt="Your Company"
          />
          <h2
            class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
          >
            Create a new account
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="signUp">
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                v-model="email"
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <!-- Display error message if sign-up fails -->
          <p v-if="signUpError" class="text-red-500 text-sm text-center">
            {{ signUpError }}
          </p>

          <div>
            <button
              type="submit"
              class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <!-- Heroicon name: user-add -->
                <svg
                  class="h-5 w-5 text-blue-500 group-hover:text-blue-400 transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a5 5 0 00-5 5v1h10v-1a5 5 0 00-5-5zm9-3a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign up
            </button>
          </div>
        </form>
        <p class="mt-8 text-center text-sm text-gray-600">
          Already have an account?
          <NuxtLink
            to="/login"
            class="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
          >
            Sign in instead!
          </NuxtLink>
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

// Reactive state
const email = ref("");
const password = ref("");
const signUpError = ref("");
const router = useRouter();

// Get Supabase client
const supabase = useSupabaseClient();

// Sign up method
const signUp = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      throw error;
    }

    // Redirect to home page after successful sign-up
    router.push("/");
  } catch (error) {
    console.error(error);
    signUpError.value = error.message || "An error occurred during sign-up.";
  }
};
</script>