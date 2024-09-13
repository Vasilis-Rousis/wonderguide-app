import { defineStore } from "pinia";

export const useTravelPlanStore = defineStore("travelPlan", {
  state: () => ({
    plan: null, // Store the travel plan here
  }),
  actions: {
    setTravelPlan(newPlan) {
      this.plan = newPlan;
    },
    clearTravelPlan() {
      this.plan = null;
    },
  },
});
