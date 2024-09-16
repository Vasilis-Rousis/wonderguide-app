<template>
  <div>
    <input
      type="text"
      ref="autocompleteInput"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="form-input w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Enter a place',
  },
});

const emit = defineEmits(['update:modelValue', 'placeSelected']);

const autocompleteInput = ref(null);
let autocomplete;

const { $loadGoogleMaps } = useNuxtApp();

onMounted(async () => {
  try {
    await $loadGoogleMaps();
    initAutocomplete();
  } catch (error) {
    console.error('Error loading Google Maps:', error);
  }
});

function initAutocomplete() {
  const options = {
    types: ['(cities)'],
    fields: ['address_components', 'formatted_address', 'geometry', 'name'],
  };
  autocomplete = new google.maps.places.Autocomplete(
    autocompleteInput.value,
    options
  );
  autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
  const place = autocomplete.getPlace();
  if (place.geometry) {
    emit('update:modelValue', place.formatted_address || place.name);
    emit('placeSelected', place);
  }
}

function onInput(event) {
  const value = event.target.value;
  emit('update:modelValue', value);
  if (!value) {
    emit('placeSelected', null);
  }
}

// Keep the input value in sync when modelValue changes from outside
watch(
  () => props.modelValue,
  (newVal) => {
    if (autocompleteInput.value && autocompleteInput.value.value !== newVal) {
      autocompleteInput.value.value = newVal;
    }
  }
);
</script>
