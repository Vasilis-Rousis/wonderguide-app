<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <h1>My Trips</h1>
    <MyTripsWrapper />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import MyTripsWrapper from "~/components/MyTripsWrapper.vue";
import Footer from "~/components/Footer.vue";

definePageMeta({
  middleware: ["auth"],
});
</script>
