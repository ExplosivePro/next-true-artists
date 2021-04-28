export const dashboardRouteDetails = [
  {
    path: "/dashboard",
    name: "Dashboard",
    backButton: {
      enable: false,
      path: "",
    },
  },
  {
    path: "/dashboard/profile",
    name: "Profile Settings",
    backButton: {
      enable: true,
      path: "/dashboard",
    },
  },
  {
    path: "/dashboard/upload-tattoos",
    name: "Upload Tattoos",
    backButton: {
      enable: true,
      path: "/dashboard",
    },
  },
  {
    path: "/dashboard/gallery",
    name: "Gallery",
    backButton: {
      enable: true,
      path: "/dashboard",
    },
  },
];
