<template>
  <div class="bg-rose-200 p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
    <DayCard
      v-for="(day, index) in parsedPlan"
      :key="index"
      :dayTitle="day.dayTitle"
      :activities="day.activities"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import DayCard from "./DayCard.vue";
import { useTravelPlanStore } from "~/stores/travelPlan";

// Define props using `defineProps` in the Composition API
const props = defineProps({
  plan: {
    type: Array,
    required: true,
  },
});

const travelPlanStore = useTravelPlanStore();

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
