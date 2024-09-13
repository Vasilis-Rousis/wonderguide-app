import { defineStore } from "pinia";

export const useUserInput = defineStore("userInput", {
  state: () => ({
    place: null, // Store the user input here
    days: null,
  }),
  actions: {
    setUserInput(newInput) {
      this.place = newInput.place;
      this.days = newInput.days;
    },
    clearUserInput() {
      this.place = null;
      this.plan = null;
    },
  },
});
