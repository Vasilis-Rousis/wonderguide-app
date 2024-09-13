<template>
  <div class="bg-rose-200 p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
    <TripCard
      v-for="(trip, index) in travelPlan"
      :key="index"
      :place="trip.place"
      :days="trip.days"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TripCard from "./TripCard.vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const travelPlan = ref(null);

const getUserTrips = async () => {
  try {
    const { data, error: saveError } = await supabase
      .from("trips")
      .select("trip, place, days")
      .eq("email", user.value.email);

    if (saveError) {
      throw saveError; // Trigger catch block if there's an error
    } else {
      travelPlan.value = data;
      console.log("DATAAAAA", data);
    }
  } catch (e) {
    console.error("Error getting trips", e);
    error.value = "Failed to fetch the trips. Please try again."; // Show error message
  }
};

onMounted(async () => {
  await getUserTrips();
});
</script>
