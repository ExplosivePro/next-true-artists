// External
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// Material Component UIs
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Typography from "@material-ui/core/Typography";

// Context
import { useAuth } from "../../contexts";

const StyledMenuItem = withStyles(() => ({
  root: {},
}))(MenuItem);

// eslint-disable-next-line react/display-name
const AppBarMenuItems = React.forwardRef((props: any, ref) => {
  const { handleMenuClose, ...rest } = props;
  const { user, logOut } = useAuth();
  const { push } = useRouter();

  // Go to specific page
  const goToPage = (e: any, url: string) => {
    handleMenuClose(e);
    push(url);
  };

  return (
    <div>
      <StyledMenuItem
        onClick={(e) => {
          goToPage(e, "/dashboard/profile");
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
      <StyledMenuItem
        onClick={(e) => {
          goToPage(e, "/dashboard/profile");
        }}
        ref={ref}
        {...rest}
      >
        <ListItemIcon>
          <PersonOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={<Typography>Profile</Typography>} />
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
