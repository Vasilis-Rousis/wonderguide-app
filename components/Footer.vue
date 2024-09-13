<template>
  <footer class="w-full bg-gray-800 mt-auto">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center">
        <!-- Left Section: Logo -->
        <div class="flex items-center">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <span class="ml-2 text-sm font-medium text-gray-300"
            >Your Company</span
          >
        </div>
        <!-- Center Section: Navigation Links -->
        <div class="hidden sm:flex space-x-4 mr-12">
          <a
            v-for="item in footerLinks"
            :key="item.name"
            :href="item.href"
            class="text-gray-300 hover:text-white text-sm"
            >{{ item.name }}</a
          >
        </div>
        <!-- Right Section: Social Media Icons -->
        <div class="flex space-x-4">
          <a href="#" class="text-gray-300 hover:text-white">
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22.46 6c-.77.35-1.6.58-2.46.68a4.15 4.15 0 0 0 1.82-2.28 8.27 8.27 0 0 1-2.61 1 4.14 4.14 0 0 0-7.05 3.77 11.75 11.75 0 0 1-8.53-4.33 4.12 4.12 0 0 0 1.28 5.51 4.11 4.11 0 0 1-1.88-.52v.05a4.14 4.14 0 0 0 3.32 4.06 4.12 4.12 0 0 1-1.88.07 4.14 4.14 0 0 0 3.87 2.88A8.31 8.31 0 0 1 2 19.54a11.75 11.75 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.37 8.37 0 0 0 24 4.57a8.27 8.27 0 0 1-2.54.7z"
              />
            </svg>
          </a>
          <a href="#" class="text-gray-300 hover:text-white">
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2a10 10 0 0 0-3.16 19.5c.5.09.69-.22.69-.48v-1.73c-2.82.61-3.41-1.37-3.41-1.37-.46-1.16-1.13-1.47-1.13-1.47-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.54 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.25-.26-4.6-1.13-4.6-5a3.92 3.92 0 0 1 1.04-2.7 3.65 3.65 0 0 1 .1-2.67s.85-.27 2.8 1.04a9.7 9.7 0 0 1 5.1 0c1.95-1.31 2.8-1.04 2.8-1.04a3.65 3.65 0 0 1 .1 2.67 3.92 3.92 0 0 1 1.04 2.7c0 3.88-2.36 4.73-4.61 4.98.36.31.68.92.68 1.85v2.73c0 .26.19.57.7.47A10 10 0 0 0 12 2z"
              />
            </svg>
          </a>
          <a href="#" class="text-gray-300 hover:text-white">
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387v-8.05H5.797V12h2.408v-2.205c0-2.377 1.419-3.675 3.573-3.675 1.035 0 2.121.188 2.121.188v2.333h-1.194c-1.178 0-1.543.731-1.543 1.481V12h2.619l-.419 3.337h-2.2v8.05C20.563 21.8 24 17.303 24 12 24 5.37 18.63 0 12 0z"
              />
            </svg>
          </a>
        </div>
      </div>
      <div class="mt-4 text-center text-sm text-gray-300">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const footerLinks = [
  { name: "About", href: "#" },
  { name: "Services", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Contact", href: "#" },
];
</script>
