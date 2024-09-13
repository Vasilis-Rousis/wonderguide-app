<template>
  <div class="bg-white p-5 rounded-lg shadow-lg mb-4">
    <h3 class="text-xl font-semibold text-gray-800 mb-3">
      Your trip to {{ place }}
    </h3>
    <p>Trip duration {{ days }} days</p>
  </div>
</template>

<script setup>
// Define props using `defineProps`
const props = defineProps({
  place: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
});
</script>
