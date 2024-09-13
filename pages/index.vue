<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <InputForm
      @travelPlan="setTravelPlan"
      @loading="setLoading"
      @clearTravelPlan="clearTravelPlan"
      @showButtons="showFunctionalButtons"
    />
    <TravelPlanWrapper class="flex-grow" v-if="travelPlan" :plan="travelPlan" />
    <FunctionalButtonsContainer v-if="showButtons" />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputForm from "~/components/InputForm.vue";
import TravelPlanWrapper from "~/components/TravelPlanWrapper.vue";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import FunctionalButtonsContainer from "~/components/FunctionalButtonsContainer.vue";

definePageMeta({
  middleware: ["auth"],
});

// Reactive state variables using the Composition API
const travelPlan = ref(null);
const loading = ref(false);
const showButtons = ref(false);

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

const showFunctionalButtons = (isShowing) => {
  showButtons.value = isShowing;
};
</script>
