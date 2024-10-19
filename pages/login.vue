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
            Sign in to your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="signIn">
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
                autocomplete="current-password"
                required
                class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <!-- Display error message if login fails -->
          <p v-if="signInError" class="text-red-500 text-sm text-center">
            {{ signInError }}
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out py-3 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <!-- Heroicon name: lock-closed -->
                <svg
                  class="h-5 w-5 text-blue-500 group-hover:text-blue-400 transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v2H8V6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        <p class="mt-8 text-center text-sm text-gray-600">
          Not a member?
          <NuxtLink
            to="/sign-up"
            class="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
          >
            Sign up today!
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

const email = ref("");
const password = ref("");
const signInError = ref(null);

const router = useRouter();

// Use the Supabase client
const supabase = useSupabaseClient();

const signIn = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      signInError.value = "Invalid login credentials";
      console.error(error);
    } else {
      router.push("/");
    }
  } catch (error) {
    signInError.value = error.message || "An error occurred during sign-in.";
    console.error(error);
  }
};
</script>
