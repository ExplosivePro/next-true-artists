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

// Contexts
import { AuthState, useAuth } from "./auth";

// Constants
import { dashboardRoutes, mainItems, helpItems } from "../constants";

const drawerWidth = 240;

// @ts-ignore
const context = createContext<Context>({});

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
    },
    bottomList: {
      position: "absolute",
      bottom: 0,
      width: "100%",
    },
  }),
);

export function DashboardContext({ children }: Props) {
  const { status } = useAuth();
  const classes = useStyles();
  const { pathname, push } = useRouter();

  // Side bar open
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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
          <main className={classes.content}>{children}</main>
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
