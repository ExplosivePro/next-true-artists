import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/Business";

enum Roles {
  ARTIST = "artist",
  STUDIO = "studio_manager",
  REGULAR = "regular",
}

export const mainItems = [
  {
    name: "Dashboard",
    icon: <HomeOutlinedIcon />,
    url: "/dashboard",
    acceptRoles: [Roles.ARTIST, Roles.STUDIO],
  },
  {
    name: "Tattoo Gallery",
    icon: <PhotoLibraryIcon />,
    url: "/dashboard/gallery",
    acceptRoles: [Roles.ARTIST, Roles.STUDIO],
  },
  {
    name: "Tattoo Profile",
    icon: <PersonOutlineIcon />,
    url: "/dashboard/profile",
    acceptRoles: [Roles.ARTIST, Roles.STUDIO],
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
    acceptRoles: [Roles.REGULAR],
  },
  {
    name: "Inbox",
    icon: <ChatOutlinedIcon />,
    url: "/inbox",
    acceptRoles: [Roles.ARTIST, Roles.STUDIO],
  },
];

export const helpItems = [
  {
    name: "Help Center",
    icon: <ContactSupportOutlinedIcon />,
    url: "/help-center",
    acceptRoles: [Roles.ARTIST, Roles.STUDIO, Roles.REGULAR],
  },
  {
    name: "Settings",
    icon: <SettingsOutlinedIcon />,
    url: "/settings",
    acceptRoles: [Roles.ARTIST, Roles.STUDIO, Roles.REGULAR],
  },
];

// Default side bar width
export const drawerWidth = 240;
