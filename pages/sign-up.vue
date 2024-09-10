<template>
  <div class="container mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">Sign Up</h1>
    <input
      class="border p-2 rounded w-full mb-2"
      v-model="email"
      type="email"
      placeholder="Email"
    />
    <input
      class="border p-2 rounded w-full mb-4"
      v-model="password"
      type="password"
      placeholder="Password"
    />
    <button
      class="bg-green-500 text-white p-3 rounded hover:bg-green-700 w-full mb-2"
      @click="signUp"
    >
      Sign Up
    </button>
    <p v-if="signUpError" class="text-red-500">{{ signUpError }}</p>
    <p class="text-center">
      Already a member?
      <nuxt-link to="/login" class="text-green-500 hover:text-green-700"
        >Sign in here</nuxt-link
      >
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

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
