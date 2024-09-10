// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  supabase: {
    redirect: false, // Disable automatic redirection
    redirectOptions: {
      login: "/login", // Change to a custom login path if desired
      callback: "/confirm",
      exclude: [], // If you want to exclude any paths from redirection
    },
    cookieOptions: {
      maxAge: 28800,
      sameSite: "lax",
      secure: true,
    },
  },
  compatibilityDate: "2024-09-10",
});