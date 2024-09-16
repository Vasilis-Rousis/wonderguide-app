<template>
  <footer class="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Left Section: Logo and Company Name -->
        <div class="flex items-center mb-6 md:mb-0">
          <NuxtLink to="/">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
              alt="Your Company"
            />
          </NuxtLink>
          <span class="ml-3 text-lg font-semibold text-gray-800"
            >Your Company</span
          >
        </div>
        <!-- Center Section: Navigation Links -->
        <div class="flex space-x-6 mb-6 md:mb-0">
          <NuxtLink
            v-for="item in footerLinks"
            :key="item.name"
            :to="item.href"
            class="text-gray-600 hover:text-gray-900 text-base font-medium transition duration-150 ease-in-out"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        <!-- Right Section: Social Media Icons -->
        <div class="flex space-x-6">
          <!-- Social media icons -->
          <!-- Replace '#' with actual links -->
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
          >
            <!-- Twitter Icon SVG -->
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
          >
            <!-- GitHub Icon SVG -->
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
          >
            <!-- LinkedIn Icon SVG -->
          </a>
        </div>
      </div>
      <div class="mt-8 text-center text-sm text-gray-500">
        &copy; 2024 Your Company. All rights reserved.
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
