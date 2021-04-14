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
import { useRouter } from "next/router";

const StyledMenuItem = withStyles(() => ({
  root: {},
}))(MenuItem);

// eslint-disable-next-line react/display-name
const AppBarMenuItems = React.forwardRef((props: any, ref) => {
  const { handleMenuClose, ...rest } = props;
  const { user, logOut } = useAuth();
  const { push } = useRouter();

  return (
    <div>
      <StyledMenuItem
        onClick={(e) => {
          handleMenuClose(e);
          push("/dashboard/profile");
        }}
        ref={ref}
        {...rest}
      >
        <ListItemIcon>
          <Avatar alt={user?.full_name || "Avatar"} src={user?.avatar?.image_url} />
        </ListItemIcon>
        <ListItemText primary={user?.full_name} />
      </StyledMenuItem>

      <Divider />
      <StyledMenuItem onClick={logOut} ref={ref} {...rest}>
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
});

export default AppBarMenuItems;
