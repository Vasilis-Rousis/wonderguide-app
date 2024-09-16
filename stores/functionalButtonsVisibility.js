import { defineStore } from "pinia";

export const useButtonsVisibilityStore = defineStore("buttonVisibility", {
  state: () => ({
    buttonVisibility: false, // Store the travel plan here
    isButtonSaved: false
  }),
  actions: {
    showButtons(newValue) {
      this.buttonVisibility = newValue;
    },
    setSaveButton(newValue) {
      this.isButtonSaved = newValue;
    }
  },
});