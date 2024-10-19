<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <div class="flex-grow pt-28">
      <h1 class="text-4xl font-bold text-center my-8">My Trips</h1>
      <MyTripsWrapper />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import MyTripsWrapper from "~/components/MyTripsWrapper.vue";
import Footer from "~/components/Footer.vue";

useHead({
  title: 'My Trips',
  meta: [
    { name: 'description', content: 'WonderGuide my trips page' },
    { property: 'og:image', content: '/images/Wonderguide-logo.png' }, //needs to be hosted on a cdn or the whole app
  ],
});


definePageMeta({
  middleware: ["auth"],
});
</script>
