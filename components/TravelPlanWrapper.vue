<template>
  <div class="flex justify-center">
    <div class="w-full max-w-4xl">
      <!-- Transition between loading skeletons and content -->
      <transition name="fade" mode="out-in">
        <!-- Use a key to help Vue identify the elements -->
        <div :key="loading ? 'loading' : 'loaded'">
          <!-- Show skeleton loaders when loading -->
          <template v-if="loading">
            <div
              v-for="n in userInputStore.days"
              :key="n"
              class="bg-white p-5 rounded-lg shadow-md animate-pulse mb-4"
            >
              <div class="h-7 bg-gray-200 rounded w-16 mb-4"></div>
              <div class="h-6 bg-gray-200 rounded w-24 mb-3"></div>
              <div class="h-5 bg-gray-200 rounded w-full mb-3"></div>
              <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div class="h-6 bg-gray-200 rounded w-24 mb-3"></div>
              <div class="h-5 bg-gray-200 rounded w-full mb-3"></div>
              <div class="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div class="h-6 bg-gray-200 rounded w-24 mb-3"></div>
              <div class="h-5 bg-gray-200 rounded w-full mb-3"></div>
              <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
            </div>
          </template>

          <!-- Show day cards when data is loaded -->
          <template v-else>
            <DayCard
              v-for="(day, index) in parsedPlan"
              :key="index"
              :dayTitle="day.dayTitle"
              :activities="day.activities"
            />
          </template>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import DayCard from "./DayCard.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});

const travelPlanStore = useTravelPlanStore();
const userInputStore = useUserInput();

// Use a computed property for parsing the plan
const parsedPlan = computed(() => {
  const parsed = [];
  let currentDay = null;
  travelPlanStore.plan.forEach((line) => {
    if (line.startsWith("Day")) {
      if (currentDay) {
        parsed.push(currentDay);
      }
      currentDay = { dayTitle: line, activities: [] };
    } else if (currentDay) {
      currentDay.activities.push(line);
    }
  });
  if (currentDay) {
    parsed.push(currentDay);
  }
  return parsed;
});
</script>

<style scoped>
/* Fade transition */
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
