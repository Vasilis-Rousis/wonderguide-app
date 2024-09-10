<template>
  <div>
    <input
      type="text"
      ref="autocompleteInput"
      :placeholder="placeholder"
      @input="onInput"
      class="form-input w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useHead } from "@vueuse/head";
import { useRuntimeConfig } from "#app";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Enter a place",
  },
});

const autocompleteInput = ref(null);
let autocomplete;

// Define emits
const emit = defineEmits(["placeSelected"]);

const config = useRuntimeConfig();

useHead({
  script: [
    {
      src: `https://maps.googleapis.com/maps/api/js?key=${config.public.GOOGLE_MAPS_API_KEY}&libraries=places`,
      async: true,
      defer: true,
    },
  ],
});

onMounted(() => {
  // Ensure the Google script is loaded before initializing
  if (!window.google || !window.google.maps) {
    const checkGoogleMaps = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(checkGoogleMaps);
        initAutocomplete();
      }
    }, 100);
  } else {
    initAutocomplete();
  }
});

function initAutocomplete() {
  const options = { types: ["(cities)"] }; // Restrict suggestions to cities
  autocomplete = new google.maps.places.Autocomplete(
    autocompleteInput.value,
    options
  );
  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
  const place = autocomplete.getPlace();
  if (place.geometry) {
    emit("placeSelected", place); // Emit the selected place to the parent
  }
}

function onInput(event) {
  if (!event.target.value) {
    emit("placeSelected", null); // Emit null when input is cleared
  }
}
</script>
