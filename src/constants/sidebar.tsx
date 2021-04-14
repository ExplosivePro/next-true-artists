import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

export const mainItems = [
  {
    name: "Dashboard",
    icon: <HomeOutlinedIcon />,
    url: "/dashboard",
  },
  {
    name: "Inbox",
    icon: <ChatOutlinedIcon />,
    url: "/inbox",
  },
];

export const helpItems = [
  {
    name: "Help Center",
    icon: <ContactSupportOutlinedIcon />,
    url: "/help-center",
  },
  {
    name: "Settings",
    icon: <SettingsOutlinedIcon />,
    url: "/settings",
  },
];

// Default side bar width
export const drawerWidth = 240;
