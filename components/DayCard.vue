<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-2xl font-semibold text-gray-800 mb-2 pb-2 border-b-2">{{ dayTitle }}</h3>
    <div v-for="(activity, index) in activities" :key="index">
      <h4
        v-if="isHeader(activity)"
        class="text-xl font-medium text-gray-700 ml-2 mb-3"
      >
        {{ activity }}
      </h4>
      <p v-else class="text-gray-600 ml-2 mb-2">{{ activity }}</p>
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
