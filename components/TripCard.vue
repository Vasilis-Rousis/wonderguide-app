<template>
  <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
    <div class="flex justify-between items-center">
      <div class="flex flex-col justify-between gap-4">
        <h1 class="font-semibold text-2xl text-gray-800">
          Your trip to {{ trip.place }}
        </h1>
        <p class="text-xl text-gray-600 mr-4">Duration: {{ trip.days }} days</p>
      </div>
      <div class="flex items-center gap-4">
        <button
          @click="openDeleteModal"
          class="bg-red-100 text-red-600 rounded-full p-2 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-150 ease-in-out"
        >
          <TrashIcon class="w-6 h-6" />
        </button>
                <button
          @click="toggleCollapse"
          class="bg-gray-100 rounded-full p-2 hover:bg-gray-200 focus:outline-none transition duration-150 ease-in-out"
        >
          <ChevronDownIcon
            class="w-6 h-6 transform transition-transform duration-300"
            :class="{ 'rotate-180': !isCollapsed }"
          />
        </button>
      </div>
    </div>

    <!-- Content reveal transition -->
    <transition name="expand">
      <div v-if="!isCollapsed" class="mt-4 overflow-hidden">
        <div v-for="day in parsedTrip" :key="day.dayTitle" class="mb-6">
          <h4 class="text-lg text-gray-700 font-semibold mb-2">{{ day.dayTitle }}</h4>
          <div v-for="period in day.periods" :key="period.periodTitle" class="ml-2 mb-4">
            <div class="flex items-center mb-1">
              <h5 class="text-lg text-gray-600 font-medium">{{ period.periodTitle }}</h5>
              <span class="text-xl ml-2">
                <span v-if="period.periodTitle === 'Morning'">🌅</span>
                <span v-else-if="period.periodTitle === 'Afternoon'">🌞</span>
                <span v-else-if="period.periodTitle === 'Evening'">🌙</span>
              </span>
            </div>
            <p v-for="(activity, index) in period.activities" :key="index" class="text-gray-700 ml-6">{{ activity }}</p>
          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="modal-fade">
      <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg max-w-md w-full transform transition-transform duration-300 ease-in-out scale-95">
          <h2 class="text-lg text-center font-semibold mb-4 text-gray-800">Are you sure you want to delete this trip?</h2>
          <div class="flex gap-4 justify-center	">
            <button @click="cancelDelete" class="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition duration-150 ease-in-out">
              Cancel
            </button>
            <button @click="confirmDelete" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150 ease-in-out">
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ChevronDownIcon, TrashIcon } from "@heroicons/vue/24/solid";

// Define properties passed to the component
const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
});

// Define events emitted by the component
const emit = defineEmits(['deleted']);

const supabase = useSupabaseClient();
const isCollapsed = ref(true);
const showDeleteModal = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
};

const confirmDelete = async () => {
  try {
    const { error } = await supabase
      .from("trips")
      .delete()
      .eq("id", props.trip.id);
    if (error) {
      throw error;
    }
    // Emit an event to notify parent component to refresh the list
    emit('deleted');
  } catch (e) {
    console.error("Error deleting trip", e);
  } finally {
    showDeleteModal.value = false;
  }
};

// Parse the trip data into a structured format
const parsedTrip = computed(() => {
  let tripData = props.trip.trip;

  // Check if tripData is an array or a JSON string
  if (typeof tripData === "string") {
    try {
      tripData = JSON.parse(tripData);
    } catch (e) {
      console.error("Error parsing trip data", e);
      return [];
    }
  }

  if (!Array.isArray(tripData)) {
    console.error("tripData is not an array after parsing");
    return [];
  }

  const parsed = [];
  let currentDay = null;
  let currentPeriod = null;

  tripData.forEach((line) => {
    if (line.startsWith("Day")) {
      // Start a new day
      if (currentDay) {
        parsed.push(currentDay);
      }
      currentDay = { dayTitle: line, periods: [] };
      currentPeriod = null;
    } else if (["Morning", "Afternoon", "Evening"].includes(line)) {
      // Start a new period
      currentPeriod = { periodTitle: line, activities: [] };
      currentDay.periods.push(currentPeriod);
    } else if (currentPeriod) {
      // Add activity to current period
      currentPeriod.activities.push(line);
    }
  });

  // Push the last day
  if (currentDay) {
    parsed.push(currentDay);
  }

  return parsed;
});
</script>

<style scoped>
/* Expand/collapse transition */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px; /* Adjusted to accommodate larger content */
  opacity: 1;
}

/* Modal fade transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>