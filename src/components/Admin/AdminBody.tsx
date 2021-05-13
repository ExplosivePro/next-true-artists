import React, { createContext } from "react";
import { useRouter } from "next/router";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import AppBar from "src/components/Admin/AppBar";
import LeftBar from "src/components/Admin/LeftBar";
import { useLayoutStyles } from "./styles";
import { AuthState, useAuth } from "src/contexts/auth";

const context = createContext<Context>({});

const admin = { route: "/admin", role: "admin" };

interface Props {
  children: JSX.Element[];
}

interface Context {}

export default function AdminBody({ children }: Props) {
  const classes = useLayoutStyles();
  const { status, user } = useAuth();
  const { pathname } = useRouter();

  return (
    <context.Provider value={{}}>
      {status === AuthState.authenticated && pathname.indexOf(admin.route) > -1 && (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar />
          {user?.role?.toLowerCase() === admin.role ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : (
            <NotAdmin />
          )}
        </div>
      )}
    </context.Provider>
  );
}

function NotAdmin() {
  const classes = useLayoutStyles();
  const { logOut, user } = useAuth();
  const { push } = useRouter();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant={"h6"} align="center" gutterBottom>
            <b>You are not authorized to access resource..</b>
          </Typography>
        </Grid>

        <Grid container item xs={12} justify="center">
          {user ? (
            <Typography component="button" color="textPrimary" variant="h6" align="center" onClick={logOut}>
              Log out
            </Typography>
          ) : (
            <Typography
              component="button"
              color="textPrimary"
              variant="h6"
              align="center"
              onClick={() => push("/login")}
            >
              Log in
            </Typography>
          )}
        </Grid>
      </Grid>
    </main>
  );
}
