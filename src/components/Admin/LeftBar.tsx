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
import SubjectIcon from "@material-ui/icons/Subject";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";
import Typography from "@material-ui/core/Typography";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SpeakerIcon from "@material-ui/icons/Speaker";

import { menuAdminBar } from "src/constants";
import { useMenuStyles } from "./styles";

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

      case "articles":
        if (currentActiveBar !== menuAdminBar.ARTICLES) {
          goToPage(`/admin/articles`, { mainBar: menuAdminBar.ARTICLES });
        }
        break;

      case "styles":
        if (currentActiveBar !== menuAdminBar.STYLES) {
          goToPage(`/admin/styles`, { mainBar: menuAdminBar.STYLES });
        }
        break;

      case "landingPages":
        if (currentActiveBar !== menuAdminBar.LANDING_PAGES) {
          goToPage(`/admin/landing-pages`, { mainBar: menuAdminBar.LANDING_PAGES });
        }
        break;

      case "conventions":
        if (currentActiveBar !== menuAdminBar.CONVENTIONS) {
          goToPage(`/admin/conventions`, { mainBar: menuAdminBar.CONVENTIONS });
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
    <List className={classes.root}>
      <ListItem
        button
        key={"Dashboard"}
        onClick={() => handleAdminMenuClick("dashboard")}
        className={clsx(classes.listItem, { [classes.activeBar]: currentActiveBar === menuAdminBar.DASHBOARD })}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="inherit">Dashboard</Typography>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        key={"Users"}
        onClick={() => handleAdminMenuClick("users")}
        className={clsx(classes.listItem, { [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.USERS) > -1 })}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <SupervisorAccountOutlinedIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="inherit">Users</Typography>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        key={"Artists"}
        onClick={() => handleAdminMenuClick("artists")}
        className={clsx(classes.listItem, {
          [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.ARTISTS) > -1,
        })}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="inherit">Artists</Typography>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        key={"Studios"}
        onClick={() => handleAdminMenuClick("studios")}
        className={clsx(classes.listItem, {
          [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.STUDIOS) > -1,
        })}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="inherit">Studios</Typography>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        key={"Articles"}
        onClick={() => handleAdminMenuClick("articles")}
        className={clsx(classes.listItem, {
          [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.ARTICLES) > -1,
        })}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="inherit">Articles</Typography>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        key={"Landing-Pages"}
        onClick={() => handleAdminMenuClick("landingPages")}
        className={clsx(classes.listItem, {
          [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.LANDING_PAGES) > -1,
        })}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <EventNoteIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="inherit">Landing Pages</Typography>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        key={"Conventions"}
        onClick={() => handleAdminMenuClick("conventions")}
        className={clsx(classes.listItem, {
          [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.CONVENTIONS) > -1,
        })}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <SpeakerIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="inherit">Conventions</Typography>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        key={"Styles"}
        onClick={() => handleAdminMenuClick("styles")}
        className={clsx(classes.listItem, {
          [classes.activeBar]: currentActiveBar.indexOf(menuAdminBar.STYLES) > -1,
        })}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <FilterVintageIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography color="inherit">Styles</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}
