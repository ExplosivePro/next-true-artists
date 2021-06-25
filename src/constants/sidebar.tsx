import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/Business";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import { Role } from "./auth";

export const mainItems = [
  {
    name: "Dashboard",
    icon: <HomeOutlinedIcon />,
    url: "/dashboard",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
  },
  {
    name: "Tattoo Gallery",
    icon: <PhotoLibraryIcon />,
    url: "/dashboard/gallery",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
  },
  {
    name: "Artist Profile",
    icon: <PersonOutlineIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.ARTIST],
  },
  {
    name: "Studio Profile",
    icon: <PersonOutlineIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.STUDIO],
  },
  {
    name: "My Studios",
    icon: <BusinessIcon />,
    url: "/dashboard/my-studios",
    acceptRoles: [Role.ARTIST],
  },
  {
    name: "My Artists",
    icon: <GroupIcon />,
    url: "/dashboard/my-artists",
    acceptRoles: [Role.STUDIO],
  },
  {
    name: "Profile",
    icon: <PersonOutlineIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.REGULAR],
  },
  {
    name: "Manage Clients",
    icon: <GroupAddOutlinedIcon />,
    url: "/dashboard/manage-clients",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
  },
  {
    name: "Invitations",
    icon: <MailOutlineIcon />,
    url: "/dashboard/invitations",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
  },
];

export const helpItems = [
  {
    name: "Settings",
    icon: <SettingsOutlinedIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
  },
];

// Default side bar width
export const drawerWidth = 240;
