// External import
import React, { useState } from "react";
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

import { menuAdminBar } from "src/constants";
import { useMenuStyles } from "src/pages/admin/styles";

interface NavigationType {
  mainBar: string;
}

export default function LeftBar() {
  const classes = useMenuStyles();
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
          className={clsx(classes.listItem, { [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.USERS) > -1 })}
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
          className={clsx(classes.listItem, {
            [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.ARTISTS) > -1,
          })}
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
          className={clsx(classes.listItem, {
            [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.STUDIOS) > -1,
          })}
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
