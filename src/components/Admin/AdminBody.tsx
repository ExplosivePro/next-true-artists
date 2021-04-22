import React from "react";

import Drawer from "@material-ui/core/Drawer";

import AppBar from "src/components/Admin/AppBar";
import LeftBar from "src/components/Admin/LeftBar";
import { useLayoutStyles } from "src/pages/admin/styles";

interface Props {
  children: JSX.Element[];
}

export default function AdminBody({ children }: Props) {
  const classes = useLayoutStyles();
  // const { user, logOut } = useAuth();

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

  /*   // if (user?.role?.toLowerCase() === "admin")
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
    ); */
}
