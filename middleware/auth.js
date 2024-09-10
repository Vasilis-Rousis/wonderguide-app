// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient();

  // Get the current user
  const { data: user, error } = await supabase.auth.getUser();

  console.log("USERRR", user);

  // List of public routes that do not require authentication
  const publicPaths = ["/login", "/sign-up"];

  if (error) {
    console.error("Authentication error:", error.message);
    return navigateTo("/login");
  }

  // If there's an error or no user, and they're trying to access a protected route, redirect to login
  if (!user && !publicPaths.includes(to.path)) {
    return navigateTo("/login");
  }
});
