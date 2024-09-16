<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <div class="flex flex-col justify-between gap-4">
        <h3 class="font-semibold text-gray-800">
          Your trip to {{ trip.place }}
        </h3>
        <p class="text-gray-600 mr-4">Duration: {{ trip.days }} days</p>
      </div>
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
    <!-- Content reveal transition -->
    <transition name="expand">
      <div v-if="!isCollapsed" class="mt-4 overflow-hidden">
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
/* Expand/collapse transition */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px; /* Adjust to a value that fits your content */
  opacity: 1;
}
</style>
