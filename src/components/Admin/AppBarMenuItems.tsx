import React, { forwardRef } from "react";
import { useRouter } from "next/router";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { useAuth } from "../../contexts";

import { StyledMenuItem } from "./styles";

// eslint-disable-next-line react/display-name
const AppBarMenuItems = forwardRef((props: any, ref) => {
  const { handleMenuClose, ...rest } = props;
  const router = useRouter();
  const { logOut } = useAuth();
  const loggedUser = useAuth().user;

  return (
    <List>
      <StyledMenuItem ref={ref} {...rest} onClick={handleMenuClose}>
        <ListItemIcon>
          <Avatar alt={loggedUser?.full_name || "Avatar"} src={loggedUser?.avatar?.image_url} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </StyledMenuItem>

      <Divider />
      <StyledMenuItem ref={ref} {...rest} onClick={() => router.push("/dashboard")}>
        <ListItemIcon>
          <ArrowBackIcon />
        </ListItemIcon>
        <ListItemText primary="Exit Admin" />
      </StyledMenuItem>

      <Divider />
      {loggedUser ? (
        <StyledMenuItem ref={ref} {...rest} onClick={logOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </StyledMenuItem>
      ) : (
        <StyledMenuItem ref={ref} {...rest} onClick={() => router.push("/login")}>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Log in" />
        </StyledMenuItem>
      )}
    </List>
  );
});

export default AppBarMenuItems;
