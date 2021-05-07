import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/Business";

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
    acceptRoles: [Roles.ARTIST],
  },
  {
    name: "My Artists",
    icon: <GroupIcon />,
    url: "/dashboard/my-artists",
    acceptRoles: [Roles.STUDIO],
  },
  {
    name: "Profile",
    icon: <PersonOutlineIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Role.REGULAR],
  },
  {
    name: "Inbox",
    icon: <ChatOutlinedIcon />,
    url: "/inbox",
    acceptRoles: [Role.ARTIST, Role.STUDIO],
  },
];

export const helpItems = [
  {
    name: "Help Center",
    icon: <ContactSupportOutlinedIcon />,
    url: "/help-center",
    acceptRoles: [Role.ARTIST, Role.STUDIO, Role.REGULAR],
  },
  {
    name: "Settings",
    icon: <SettingsOutlinedIcon />,
    url: "/settings",
    acceptRoles: [Role.ARTIST, Role.STUDIO, Role.REGULAR],
  },
];

// Default side bar width
export const drawerWidth = 240;
