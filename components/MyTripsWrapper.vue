<template>
  <div class="max-w-4xl mx-auto mb-8">
    <div class="space-y-4">
      <TripCard v-for="(trip, index) in travelPlan" :key="index" :trip="trip" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TripCard from "./TripCard.vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const travelPlan = ref([]);

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
  }
};

onMounted(async () => {
  await getUserTrips();
});
</script>
