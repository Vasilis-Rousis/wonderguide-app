// middleware/auth.js
export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser();

  // If there's an error or no user, and they're trying to access a protected route, redirect to login
  if (!user.value) {
    return navigateTo("/login");
  }
});
