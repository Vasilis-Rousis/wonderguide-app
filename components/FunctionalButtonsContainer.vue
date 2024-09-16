<template>
  <div class="flex justify-center w-full mb-6">
    <div class="flex flex-wrap justify-center gap-6">
      <button
        :class="{
          'bg-blue-600 hover:bg-blue-700':
            !buttonsVisibilityStore.isButtonSaved,
          'bg-green-600': buttonsVisibilityStore.isButtonSaved,
        }"
        :disabled="isSaving || buttonsVisibilityStore.isButtonSaved"
        class="text-white font-semibold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        @click="saveTrip"
      >
        <span class="transition duration-150 ease-in-out">
          {{ buttonsVisibilityStore.isButtonSaved ? "Saved!" : "Save Trip" }}
        </span>
      </button>
      <button
        :disabled="isGenerating"
        class="bg-white border border-blue-600 hover:bg-blue-50 text-blue-600 font-semibold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        @click="getTravelPlan"
      >
        <span class="transition duration-150 ease-in-out">
          {{ isGenerating ? "Generating..." : "Generate Again" }}
        </span>
      </button>
    </div>
    <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const travelPlanStore = useTravelPlanStore();
const userInputStore = useUserInput();
const buttonsVisibilityStore = useButtonsVisibilityStore();

// Emit event to parent component
const emit = defineEmits(["loading"]);

const isSaving = ref(false);
const isGenerating = ref(false);
const error = ref(null);

const saveTrip = async () => {
  isSaving.value = true;
  error.value = null;
  buttonsVisibilityStore.setSaveButton(false);

  try {
    const { data, error: saveError } = await supabase
      .from("trips")
      .insert([
        {
          email: user.value.email,
          user_id: user.value.id,
          trip: travelPlanStore.plan,
          place: userInputStore.place,
          days: userInputStore.days,
        },
      ])
      .select();

    if (saveError) {
      throw saveError; // Trigger catch block if there's an error
    }

    buttonsVisibilityStore.setSaveButton(true);
  } catch (e) {
    console.error("Error saving trip:", e);
    error.value = "Failed to save the trip. Please try again.";
  } finally {
    isSaving.value = false;
  }
};

// Function to get the travel plan
const getTravelPlan = async () => {
  error.value = null;

  isGenerating.value = true;
  emit("loading", true); // Emit loading event

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
  } catch (e) {
    error.value = "Failed to fetch travel plan. Please try again.";
    console.error("Error getting travel plan:", e);
  } finally {
    isGenerating.value = false;
    isSaving.value = false;
    buttonsVisibilityStore.setSaveButton(false);
    emit("loading", false); // Emit loading event
  }
};
</script>
