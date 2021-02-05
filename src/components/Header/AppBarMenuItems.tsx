import React from "react";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useAuth } from "../../contexts";

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

declare interface BarItems {
  handleMenuClose(): void;
}

export default function AppBarMenuItems({ handleMenuClose }: BarItems) {
  // auth
  const { logOut } = useAuth();
  // @ts-ignore
  // @ts-ignore
  return (
    <div>
      <StyledMenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Avatar alt={"User"} src="/images/james.png" />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </StyledMenuItem>

      <Divider />
      <StyledMenuItem onClick={logOut}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </StyledMenuItem>
    </div>
  );
}
