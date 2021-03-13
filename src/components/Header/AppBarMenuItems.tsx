import React from "react";
import { withStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useAuth } from "../../contexts";
import Typography from "@material-ui/core/Typography";

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
  const { user, logOut } = useAuth();
  // @ts-ignore
  // @ts-ignore
  return (
    <div>
      <StyledMenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Avatar alt={user?.full_name || "Avatar"} src={user?.avatar?.image_url} />
        </ListItemIcon>
        <ListItemText primary={user?.full_name} />
      </StyledMenuItem>

      <Divider />
      <StyledMenuItem onClick={logOut}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography color={"error"}>
              <b>Logout</b>
            </Typography>
          }
        />
      </StyledMenuItem>
    </div>
  );
}
