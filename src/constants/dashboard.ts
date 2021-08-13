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
    name: "Upload Tattoos Photos",
    backButton: {
      enable: true,
      path: "/dashboard",
    },
  },
  {
    path: "/dashboard/gallery",
    name: "Tattoo Gallery",
    backButton: {
      enable: true,
      path: "/dashboard",
    },
  },
  {
    path: "/dashboard/my-studios",
    name: "My Studios",
    backButton: {
      enable: true,
      path: "/dashboard",
    },
  },
  {
    path: "/dashboard/my-artists",
    name: "Studio Artists",
    backButton: {
      enable: true,
      path: "/dashboard",
    },
  },
  {
    path: "/dashboard/manage-clients",
    name: "Clients",
    backButton: {
      enable: true,
      path: "/dashboard",
    },
  },
  {
    path: "/dashboard/invitations",
    name: "Studio Invitations",
    backButton: {
      enable: true,
      path: "/dashboard",
    },
  },
];
