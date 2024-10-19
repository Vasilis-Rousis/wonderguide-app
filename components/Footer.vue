<template>
  <footer class="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-row md:flex-row justify-between items-center">
        <!-- Left Section: Logo and Company Name -->
         <div class="basis-1/4">
          <NuxtLink to="/">
            <img
              class="h-20 w-auto"
              src="/images/Wonderguide-logo.png"
              alt="Your Company"
            />
          </NuxtLink>
        </div>
        <!-- Center Section: Navigation Links -->
        <div class="basis-1/2 space-x-6 text-center">
          <NuxtLink
            v-for="item in footerLinks"
            :key="item.name"
            :to="item.href"
            class="text-gray-600 hover:text-gray-900 text-base font-medium transition duration-150 ease-in-out"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        <div class="basis-1/4 text-center text-sm text-gray-500">
          &copy; 2024 WonderGuide. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];
</script>
