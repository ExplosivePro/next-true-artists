// External import
import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import clsx from "clsx";

// Material components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import PeopleIcon from "@material-ui/icons/People";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

import { menuAdminBar } from "../../constants";
import color from "../../palette";

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      paddingRight: "10px",
    },
    listItem: {
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
      cursor: "pointer",
    },
    nested: {
      paddingLeft: theme.spacing(8),
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
      "& .MuiListItemText-root": {
        paddingLeft: "10px",
      },
    },
    activeBar: {
      backgroundColor: color.defaultColor,
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: color.defaultColor,
        borderTopRightRadius: "25px",
        borderBottomRightRadius: "25px",
      },
      "& span": {
        fontWeight: "bold",
      },
      "& svg": {
        fill: color.white,
      },
    },
    activeSubBar: {
      "& .MuiListItemText-root": {
        borderLeft: `solid 4px ${color.defaultColor}`,
        color: color.defaultColor,
      },
    },
    listItemRoot: {
      minWidth: "35px",
    },
  }),
);

interface NavigationType {
  mainBar: string;
}

export default function LeftBar() {
  const classes = useStyles();
  const router = useRouter();

  const [currentActiveBar, setCurrentActiveBar] = useState(router.pathname);

  // On admin menus click
  const handleAdminMenuClick = (menuItem: string) => {
    switch (menuItem) {
      case "dashboard":
        if (currentActiveBar !== menuAdminBar.DASHBOARD) {
          goToPage(`/admin`, { mainBar: menuAdminBar.DASHBOARD });
        }
        break;

      case "users":
        if (currentActiveBar !== menuAdminBar.USERS) {
          goToPage(`/admin/users`, { mainBar: menuAdminBar.USERS });
        }
        break;

      case "artists":
        if (currentActiveBar !== menuAdminBar.ARTISTS) {
          goToPage(`/admin/artists`, { mainBar: menuAdminBar.ARTISTS });
        }
        break;

      case "studios":
        if (currentActiveBar !== menuAdminBar.STUDIOS) {
          goToPage(`/admin/studios`, { mainBar: menuAdminBar.STUDIOS });
        }
        break;

      default:
        break;
    }
  };

  // Go to specific page
  const goToPage = (url: string, key: NavigationType) => {
    // Set current active bar
    setCurrentActiveBar(key.mainBar);

    router.push({
      pathname: url,
      // search: qs.stringify({ ...queryData, ...state }),
    });
  };

  return (
    <div>
      <List classes={{ root: classes.list }}>
        <ListItem
          button
          key={"Dashboard"}
          onClick={() => handleAdminMenuClick("dashboard")}
          className={clsx(classes.listItem, { [classes.activeBar]: currentActiveBar === menuAdminBar.DASHBOARD })}
        >
          <ListItemIcon classes={{ root: classes.listItemRoot }}>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>

        <ListItem
          button
          key={"Users"}
          onClick={() => handleAdminMenuClick("users")}
          className={clsx(classes.listItem, { [classes.activeBar]: currentActiveBar === menuAdminBar.USERS })}
        >
          <ListItemIcon classes={{ root: classes.listItemRoot }}>
            <SupervisorAccountOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Users"} />
        </ListItem>

        <ListItem
          button
          key={"Artists"}
          onClick={() => handleAdminMenuClick("artists")}
          className={clsx(classes.listItem, { [classes.activeBar]: currentActiveBar === menuAdminBar.ARTISTS })}
        >
          <ListItemIcon classes={{ root: classes.listItemRoot }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={"Artists"} />
        </ListItem>

        <ListItem
          button
          key={"Studios"}
          onClick={() => handleAdminMenuClick("studios")}
          className={clsx(classes.listItem, { [classes.activeBar]: currentActiveBar === menuAdminBar.STUDIOS })}
        >
          <ListItemIcon classes={{ root: classes.listItemRoot }}>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary={"Studios"} />
        </ListItem>
      </List>
    </div>
  );
}
