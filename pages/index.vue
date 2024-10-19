<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <div class="flex-grow flex flex-col gap-4 pt-28">
      <InputForm
        @travelPlan="setTravelPlan"
        @loading="setLoading"
        @clearTravelPlan="clearTravelPlan"
        @showButtons="showFunctionalButtons"
      />
      <TravelPlanWrapper v-if="loading || isTravelPlan" :loading="loading" />
      <FunctionalButtonsContainer
        v-if="buttonsVisibilityStore.buttonVisibility"
        @loading="setLoading"
      />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import InputForm from "~/components/InputForm.vue";
import TravelPlanWrapper from "~/components/TravelPlanWrapper.vue";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import FunctionalButtonsContainer from "~/components/FunctionalButtonsContainer.vue";

definePageMeta({
  middleware: ["auth"],
});

const travelPlan = ref(null);
const loading = ref(false);
const showButtons = ref(false);
const travelPlanStore = useTravelPlanStore();
const buttonsVisibilityStore = useButtonsVisibilityStore();
const isTravelPlan = computed(() => travelPlanStore.plan !== null);

// Methods for handling travel plan and loading state
const setTravelPlan = (plan) => {
  travelPlan.value = plan;
};

const setLoading = (isLoading) => {
  loading.value = isLoading;
};

const clearTravelPlan = () => {
  travelPlan.value = null;
  buttonsVisibilityStore.showButtons(false);
};

const showFunctionalButtons = (isShowing) => {
  showButtons.value = isShowing;
};
</script>
