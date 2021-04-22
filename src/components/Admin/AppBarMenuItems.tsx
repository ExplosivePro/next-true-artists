import React from "react";
import { useRouter } from "next/router";

import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { useAuth } from "../../contexts";

import { StyledMenuItem } from "./styles";

declare interface BarItems {
  handleMenuClose(): void;
}

export default function AppBarMenuItems({ handleMenuClose }: BarItems) {
  const router = useRouter();
  const { logOut } = useAuth();
  const loggedUser = useAuth().user;

  return (
    <div>
      <StyledMenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Avatar alt={loggedUser?.full_name || "Avatar"} src={loggedUser?.avatar?.image_url} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </StyledMenuItem>

      <Divider />
      {loggedUser ? (
        <StyledMenuItem onClick={logOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText color={"error"} primary="Log out" />
        </StyledMenuItem>
      ) : (
        <StyledMenuItem onClick={() => router.push("/login")}>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Log in" />
        </StyledMenuItem>
      )}
    </div>
  );
}
