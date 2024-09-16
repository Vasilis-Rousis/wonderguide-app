<template>
  <div class="flex flex-col gap-12 bg-gray-50">
    <Navbar />
    <InputForm
      @travelPlan="setTravelPlan"
      @loading="setLoading"
      @clearTravelPlan="clearTravelPlan"
      @showButtons="showFunctionalButtons"
    />
    <!-- Modify the condition to render TravelPlanWrapper when loading or when travel plan is available -->
    <TravelPlanWrapper
      class="flex-grow"
      v-if="loading || isTravelPlan"
      :loading="loading"
    />
    <!-- Listen for loading events from FunctionalButtonsContainer -->
    <FunctionalButtonsContainer
      v-if="buttonsVisibilityStore.buttonVisibility"
      @loading="setLoading"
    />
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
