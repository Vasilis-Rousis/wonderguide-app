// plugins/google-maps.client.js
import { Loader } from '@googlemaps/js-api-loader';

export default defineNuxtPlugin(() => {
  const loader = new Loader({
    apiKey: useRuntimeConfig().public.GOOGLE_MAPS_API_KEY,
    version: 'weekly', // Use 'weekly' to get the latest features and updates
    libraries: ['places'],
  });

  let googleMapsPromise = null;

  return {
    provide: {
      loadGoogleMaps: () => {
        if (!googleMapsPromise) {
          googleMapsPromise = loader.load();
        }
        return googleMapsPromise;
      },
    },
  };
});
