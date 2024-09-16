<template>
  <div class="flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Plan Your Trip
      </h1>
      <div class="space-y-6">
        <div>
          <label
            for="place"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Place to Visit
          </label>
          <AutocompleteInput v-model="userInputStore.place" class="w-full" />
        </div>
        <div>
          <label
            for="days"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of Days
          </label>
          <input
            type="number"
            id="days"
            v-model="userInputStore.days"
            placeholder="Enter number of days"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          @click="getTravelPlan"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Get Travel Plan
        </button>
        <p v-if="error" class="text-red-500 text-center text-sm mt-2">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AutocompleteInput from "./AutocompleteInput.vue";

// Global store
const travelPlanStore = useTravelPlanStore();
const userInputStore = useUserInput();
const buttonsVisibilityStore = useButtonsVisibilityStore();

// Reactive state
const loading = ref(false);
const error = ref(null);

// Emit event to parent component
const emit = defineEmits([
  "loading",
  "clearTravelPlan",
  "travelPlan",
  "showButtons",
]);

// Function to get the travel plan
const getTravelPlan = async () => {
  error.value = null; // Reset error message
  if (!userInputStore.place || !userInputStore.days) {
    error.value = "Please fill in all fields";
    return;
  }

  loading.value = true;
  emit("loading", true);
  buttonsVisibilityStore.showButtons(false);
  emit("clearTravelPlan");

  try {
    const response = await $fetch("/api/getTravelPlan", {
      method: "POST",
      body: {
        place: userInputStore.place,
        days: userInputStore.days,
      },
    });

    // Store the plan globally
    travelPlanStore.setTravelPlan(response.plan);
    userInputStore.setUserInput({
      place: userInputStore.place,
      days: userInputStore.days,
    });

    emit("travelPlan", response.plan);
    emit("showButtons", true);
  } catch (e) {
    error.value = "Failed to fetch travel plan. Please try again.";
    console.error("Error getting travel plan:", e);
  } finally {
    loading.value = false;
    emit("loading", false);
    buttonsVisibilityStore.showButtons(true);
  }
};
</script>
