export enum Role {
  USERS = "users",
  ARTIST = "artist",
  STUDIO = "studio_manager",
  REGULAR = "regular",
  ADMIN = "admin",
}

// any route in this list is considered as unauthenticated routes, outside this list, app will redirect user to register page if user has not logged in yet
export const unauthRoutes = [
  "/_error",
  "/register",
  "/forgot-password",
  "/register-selection",
  "/dashboard/gallery",
  "/dashboard/gallery/[id]",
  "/dashboard/upload-tattoos",
  "/dashboard/profile",
  "/dashboard/my-studios",
  "/dashboard/my-artists",
  "/dashboard/manage-clients",
  "/dashboard/manage-clients/create",
  "/dashboard/manage-clients/[id]",
  "/dashboard/invitations",
  "/password/change_password",
];

// Outside this list, route will be remember if they access to page without login, after login, they will be redirected to previous page
export const nonRememberRoutes = ["/login", "/register", "/register-selection"];

// Only these routes can access to dashboard side bar
export const dashboardRoutes = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/gallery",
  "/dashboard/gallery/[id]",
  "/dashboard/my-studios",
  "/dashboard/my-artists",
  "/dashboard/upload-tattoos",
  "/dashboard/manage-clients",
  "/dashboard/manage-clients/create",
  "/dashboard/manage-clients/[id]",
  "/dashboard/invitations",
];

// Route to Admin component
export const adminRoute = "/admin";

export const PasswordValidationRegex = /(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}/;
