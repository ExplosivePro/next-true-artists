// External
import React, { createContext, useContext } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// Material UI Components
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Custom Components
import PrimaryButton from "../components/PrimaryButton";
import AppBarMenuItems from "../components/Header/AppBarMenuItems";

// Contexts
import { AuthState, useAuth } from "./auth";

// Constants
import { dashboardRoutes, mainItems, helpItems, dashboardRouteDetails, drawerWidth } from "../constants";

import colors from "../palette";

// @ts-ignore
const context = createContext<Context>({});

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: colors.standardGreySubFooter,
    },
    bottomList: {
      position: "absolute",
      bottom: 0,
      width: "100%",
    },
    operationContainer: {
      margin: "0 0 24px",
    },
    button: {
      marginLeft: "auto",
      borderRadius: "15px",
      color: colors.black,
      padding: "10px 25px",
      backgroundColor: colors.white,
      "&:hover": {
        backgroundColor: colors.white,
      },
    },
    profileButton: {
      padding: "3px 8px 1px 5px",
      borderRadius: "35px",
      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 15%)",
      border: `solid 1px ${colors.standardGreySubFooter}`,
      backgroundColor: colors.standardGreyFooter,
      marginLeft: "20px",
    },
    accountName: {
      marginLeft: "10px",
      marginRight: "10px",
      fontWeight: 500,
      fontSize: ".8rem",
    },
  }),
);

// Get current dashboard route detail
const getRouteDetail = (path: string) => {
  if (!AuthState.authenticated) {
    return {
      name: "",
      backButton: false,
    };
  }
  const detail: any = dashboardRouteDetails.filter((route) => route.path === path);
  return detail.length > 0 ? detail[0] : { name: "", backButton: false };
};

export function DashboardContext({ children }: Props) {
  const { status, user } = useAuth();
  const classes = useStyles();
  const { pathname, push } = useRouter();

  const {
    name,
    backButton: { enable: enableBackButton, path: backButtonPath },
  } = getRouteDetail(pathname);

  // Side bar open
  const [open, setOpen] = React.useState(false);
  // Anchor to show profile drop down menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Drop down menu open
  const isMenuOpen = Boolean(anchorEl);

  // Open sidebar
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Close side bar
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Close drop down menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open drop down menu
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Drop down menu components
  const menuId = "dashboard-account-menu";
  const renderMenu = user && (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <AppBarMenuItems handleMenuClose={handleMenuClose} />
    </Menu>
  );

  return (
    <context.Provider value={{}}>
      {status === AuthState.authenticated && dashboardRoutes.includes(pathname) && (
        <div className={classes.root}>
          <CssBaseline />
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            onMouseEnter={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <List>
              {mainItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    push(item.url);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
            <List className={classes.bottomList}>
              {helpItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    push(item.url);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <main className={classes.content}>
            <Grid container item alignItems={"center"} className={classes.operationContainer}>
              {enableBackButton && (
                <IconButton
                  onClick={() => {
                    push(backButtonPath);
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Typography variant={"h5"}>
                <b>{name}</b>
              </Typography>

              <PrimaryButton variant="contained" startIcon={<AddIcon />} className={classes.button}>
                Upload
              </PrimaryButton>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={handleProfileMenuOpen}
                classes={{ root: classes.profileButton }}
              >
                <Avatar alt={user?.full_name || "Avatar"} src={user?.avatar?.image_url} />
                <Typography className={classes.accountName}>{user?.full_name}</Typography>

                <ExpandMoreIcon />
              </IconButton>
              {renderMenu}
            </Grid>
            {children}
          </main>
        </div>
      )}

      {(status !== AuthState.authenticated || !dashboardRoutes.includes(pathname)) && children}
    </context.Provider>
  );
}

export function useDashboard() {
  return useContext(context);
}

interface Props {
  children: JSX.Element;
}

interface Context {}
