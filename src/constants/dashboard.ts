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
];
