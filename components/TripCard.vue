<template>
  <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-center">
      <div class="flex flex-col justify-between gap-4">
        <h1 class="font-semibold text-2xl text-gray-800">
          Your trip to {{ trip.place }}
        </h1>
        <p class="text-xl text-gray-600 mr-4">Duration: {{ trip.days }} days</p>
      </div>
      <button
        @click="toggleCollapse"
        class="bg-gray-100 rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        <!-- Display trip details here -->
        <div v-for="day in parsedTrip" :key="day.dayTitle" class="mb-6">
          <h4 class="text-lg text-gray-700 font-semibold mb-2">{{ day.dayTitle }}</h4>
          <div v-for="period in day.periods" :key="period.periodTitle" class="ml-2 mb-4">
            <div class="flex items-center mb-1">
              <h5 class="text-lg text-gray-600 font-medium">{{ period.periodTitle }}</h5>
              <span class="text-xl ml-2">
                <span v-if="period.periodTitle === 'Morning'">🌅</span>
                <span v-else-if="period.periodTitle === 'Afternoon'">🌞</span>
                <span v-else-if="period.periodTitle === 'Evening'">🌙</span>
              </span>
            </div>
            <p v-for="(activity, index) in period.activities" :key="index" class="text-gray-700">{{ activity }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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

// Parse the trip data into a structured format
const parsedTrip = computed(() => {
  let tripData = props.trip.trip;

  // Check if tripData is an array or a JSON string
  if (typeof tripData === "string") {
    try {
      tripData = JSON.parse(tripData);
    } catch (e) {
      console.error("Error parsing trip data", e);
      return [];
    }
  }

  if (!Array.isArray(tripData)) {
    console.error("tripData is not an array after parsing");
    return [];
  }

  const parsed = [];
  let currentDay = null;
  let currentPeriod = null;

  tripData.forEach((line) => {
    if (line.startsWith("Day")) {
      // Start a new day
      if (currentDay) {
        parsed.push(currentDay);
      }
      currentDay = { dayTitle: line, periods: [] };
      currentPeriod = null;
    } else if (["Morning", "Afternoon", "Evening"].includes(line)) {
      // Start a new period
      currentPeriod = { periodTitle: line, activities: [] };
      currentDay.periods.push(currentPeriod);
    } else if (currentPeriod) {
      // Add activity to current period
      currentPeriod.activities.push(line);
    }
  });

  // Push the last day
  if (currentDay) {
    parsed.push(currentDay);
  }

  return parsed;
});
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
  max-height: 1000px; /* Adjusted to accommodate larger content */
  opacity: 1;
}
</style>
