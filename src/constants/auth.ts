// any route in this list is considered as unauthenticated routes, outside this list, app will redirect user to register page if user has not logged in yet
export const unauthRoutes = ["/_error", "/forgot-password", "/register-selection", "/password/[type]"];

// Only these routes can access to dashboard side bar
export const dashboardRoutes = ["/dashboard", "/dashboard/profile", "/dashboard/upload-tattoos"];

export const PasswordValidationRegex = /(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}/;
