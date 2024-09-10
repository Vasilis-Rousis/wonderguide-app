<template>
  <div>
    <Navbar />
    <div class="max-w-4xl mx-auto px-4 py-8">
      <InputForm
        @travelPlan="setTravelPlan"
        @loading="setLoading"
        @clearTravelPlan="clearTravelPlan"
      />
      <TravelPlanWrapper v-if="travelPlan" :plan="travelPlan" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputForm from "~/components/InputForm.vue";
import TravelPlanWrapper from "~/components/TravelPlanWrapper.vue";
import Navbar from "~/components/Navbar.vue";

definePageMeta({
  middleware: ['auth']
});

// Reactive state variables using the Composition API
const travelPlan = ref(null);
const loading = ref(false);

// Methods for handling travel plan and loading state
const setTravelPlan = (plan) => {
  travelPlan.value = plan;
};

const setLoading = (isLoading) => {
  loading.value = isLoading;
};

const clearTravelPlan = () => {
  travelPlan.value = null;
};
</script>
