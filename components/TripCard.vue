<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <h3 class="font-semibold text-gray-800">Your trip to {{ trip.place }}</h3>
      <div class="flex items-center">
        <p class="text-gray-600 mr-4">Duration: {{ trip.days }} days</p>
        <button
          @click="toggleCollapse"
          class="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <ChevronDownIcon
            class="w-6 h-6 transform transition-transform duration-300"
            :class="{ 'rotate-180': !isCollapsed }"
          />
        </button>
      </div>
    </div>
    <!-- Content reveal transition -->
    <transition name="fade">
      <div v-if="!isCollapsed" class="mt-4">
        <p class="text-gray-600 whitespace-pre-line">{{ trip.trip }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
});

const isCollapsed = ref(true);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
/* Content fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
