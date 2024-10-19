<template>
  <Disclosure
    as="nav"
    class="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg fixed w-full z-50 shadow-sm"
    v-slot="{ open }"
  >
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16">
        <!-- Left section: Logo -->
        <div class="flex items-center">
          <NuxtLink to="/">
            <img
              class="h-16 w-auto"
              src="/images/Wonderguide-logo.png"
              alt="Your Company"
            />
          </NuxtLink>
        </div>
        <!-- Center section: Navigation Links -->
        <div class="flex-1 flex justify-center sm:flex sm:space-x-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              item.current
                ? 'border-blue-600 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150 ease-in-out',
            ]"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        <!-- Right section: Profile dropdown -->
        <div class="flex items-center justify-end">
          <!-- Mobile menu button -->
          <div class="sm:hidden">
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <!-- Desktop profile dropdown -->
          <Menu as="div" class="ml-4 relative">
            <div>
              <MenuButton
                class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1603415526960-f0b7d3eeed1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/profile"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    Your Profile
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/settings"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    Settings
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    @click="signOut"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                    ]"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            item.current
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
            'block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition duration-150 ease-in-out',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

// No need to import NuxtLink; it's globally available in Nuxt.js

const router = useRouter();
const route = useRoute();
const supabase = useSupabaseClient();

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "My Trips", href: "/my-trips", current: false },
  { name: "Projects", href: "/projects", current: false },
  { name: "Calendar", href: "/calendar", current: false },
];

// Update navigation items based on current route
navigation.forEach((item) => {
  item.current = item.href === route.path;
});

// Sign-out method
const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    } else {
      console.error("Sign out error:", error);
    }
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};
</script>