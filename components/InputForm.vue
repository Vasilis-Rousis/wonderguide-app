<template>
  <div class="max-w-full px-4 py-8">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Where to...</h1>
      <div class="mb-4">
        <label for="place" class="block text-gray-700 font-medium mb-2"
          >Place to Visit:</label
        >
        <AutocompleteInput
          @placeSelected="setPlace"
          placeholder="Enter a city"
        />
      </div>
      <div class="mb-6">
        <label for="days" class="block text-gray-700 font-medium mb-2"
          >Number of Days:</label
        >
        <input
          type="number"
          id="days"
          v-model="days"
          placeholder="Enter days"
          class="form-input w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          @click="getTravelPlan"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Get Travel Plan
        </button>
        <div v-if="loading" class="loader"></div>
        <p v-show="error" class="text-red-500 text-sm">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AutocompleteInput from "./AutocompleteInput.vue";

// Reactive state
const place = ref("");
const days = ref("");
const loading = ref(false);
const error = ref(null);

// Global store
const travelPlanStore = useTravelPlanStore();
const userInputStore = useUserInput();
const buttonsVisibilityStore = useButtonsVisibilityStore();

// Emit event to parent component
const emit = defineEmits([
  "loading",
  "clearTravelPlan",
  "travelPlan",
]);

// Function to set the place
const setPlace = (selectedPlace) => {
  place.value = selectedPlace ? selectedPlace.name : "";
};

// Function to get the travel plan
const getTravelPlan = async () => {
  error.value = null; // Reset error message
  if (!place.value || !days.value) {
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
        place: place.value,
        days: days.value,
      },
    });

    // Store the plan globally
    travelPlanStore.setTravelPlan(response.plan);
    userInputStore.setUserInput({ place: place.value, days: days.value });

    emit("travelPlan", response.plan);
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

<style scoped>
.loader {
  width: 40px;
  aspect-ratio: 2;
  --circle1: no-repeat radial-gradient(circle closest-side, #42b883 90%, #0000);
  --circle2: no-repeat radial-gradient(circle closest-side, #ff6f61 90%, #0000);
  --circle3: no-repeat radial-gradient(circle closest-side, #f39c12 90%, #0000);
  background: var(--circle1) 0% 50%, var(--circle2) 50% 50%,
    var(--circle3) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: l3 0.7s infinite linear;
}
@keyframes l3 {
  20% {
    background-position: 0% 0%, 50% 50%, 100% 50%;
  }
  40% {
    background-position: 0% 100%, 50% 0%, 100% 50%;
  }
  60% {
    background-position: 0% 50%, 50% 100%, 100% 0%;
  }
  80% {
    background-position: 0% 50%, 50% 50%, 100% 100%;
  }
}
.button-loader {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
}
</style>
