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
    name: "Edit Profile",
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
];
