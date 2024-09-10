<template>
  <div class="container mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">Sign In</h1>
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
      class="bg-blue-500 text-white p-3 rounded hover:bg-blue-700 w-full mb-2"
      @click="signIn"
    >
      Sign In
    </button>
    <p v-if="signInError" class="text-red-500">Invalid login credentials</p>
    <p class="text-center">
      Not a member?
      <nuxt-link to="/sign-up" class="text-blue-500 hover:text-blue-700"
        >Sign up here</nuxt-link
      >
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const signInError = ref(null);

const router = useRouter();

// Use the Supabase client from the utility file
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
