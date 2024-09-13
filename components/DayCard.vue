<template>
  <div class="bg-white p-5 rounded-lg shadow-lg mb-4">
    <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ dayTitle }}</h3>
    <div v-for="(activity, index) in activities" :key="index">
      <h4 v-if="isHeader(activity)" class="text-lg font-medium text-gray-700">
        {{ activity }}
      </h4>
      <p v-else class="text-gray-600 mt-1">{{ activity }}</p>
    </div>
  </div>
</template>

<script setup>
// Define props using `defineProps`
const props = defineProps({
  dayTitle: {
    type: String,
    required: true,
  },
  activities: {
    type: Array,
    required: true,
  },
});

// Helper method to determine if the text is a header
const isHeader = (text) => {
  return (
    text.startsWith("Morning") ||
    text.startsWith("Afternoon") ||
    text.startsWith("Evening")
  );
};
</script>
