<template>
  <div class="max-w-4xl mx-auto mb-8">
    <div class="space-y-4">
      <!-- Show skeleton loaders when loading -->
      <template v-if="loading">
        <div
          v-for="n in 3"
          :key="n"
          class="bg-white p-6 rounded-lg shadow-md animate-pulse"
        >
          <div class="h-6 bg-gray-200 rounded mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        </div>
      </template>

      <!-- Show trip cards when data is loaded -->
      <template v-else>
        <div v-if="travelPlan.length > 0">
          <TripCard
            v-for="(trip, index) in travelPlan"
            :key="index"
            :trip="trip"
          />
        </div>
        <div v-else class="text-center text-gray-500 mt-8">
          <p>You have no saved trips.</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TripCard from "./TripCard.vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const travelPlan = ref([]);
const loading = ref(true); // Add loading state

const getUserTrips = async () => {
  try {
    const { data, error: saveError } = await supabase
      .from("trips")
      .select("*")
      .eq("email", user.value.email);

    if (saveError) {
      throw saveError;
    } else {
      travelPlan.value = data;
      console.log("DATA:", data);
    }
  } catch (e) {
    console.error("Error getting trips", e);
    // Handle error accordingly
  } finally {
    loading.value = false; // Set loading to false when done
  }
};

onMounted(async () => {
  await getUserTrips();
});
</script>
