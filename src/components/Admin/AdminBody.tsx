// External import
import React from "react";
import Link from "next/link";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

// Components
import AppBar from "src/components/Admin/AppBar";
import LeftBar from "src/components/Admin/LeftBar";
import { useAuth } from "src/contexts";

// Styles
const drawerWidth = 240;
import color from "../../palette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      top: "64px",
      zIndex: 0,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: color.white,
    },
  }),
);

interface Props {
  children: JSX.Element;
}

export default function AdminBody({ children }: Props) {
  const classes = useStyles();
  const { user, logOut } = useAuth();

  if (user?.role?.toLowerCase() === "admin")
    return (
      <div className={classes.root}>
        <AppBar />
        <nav className={classes.drawer}>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <LeftBar />
          </Drawer>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          {children}
        </main>
      </div>
    );
  else
    return (
      <div className={classes.root}>
        <AppBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Typography variant={"h6"} align="center" gutterBottom>
            <b>You are not authorized to access resource..</b>
          </Typography>

          {user ? (
            <Typography component="button" variant={"h6"} align="center" onClick={logOut}>
              Log out
            </Typography>
          ) : (
            <Typography variant={"h6"} align="center">
              <Link href={"/login"}>Login</Link>
            </Typography>
          )}
        </main>
      </div>
    );
}
