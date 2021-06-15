import { makeStyles, createStyles, Theme, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

import colors from "src/palette";

const drawerWidth = 180;

export const useLayoutStyles = makeStyles((theme: Theme) =>
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
      backgroundColor: colors.white,
    },
  }),
);

export const useAppBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: colors.white,
      boxShadow: "0px 1px 0px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      color: colors.black,
    },
    grow: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    accountName: {
      marginLeft: "10px",
      marginRight: "40px",
      fontWeight: 500,
      fontSize: ".8rem",
    },
    profileButton: {
      borderRadius: "10px",
      border: `solid 1px ${colors.standardGreySubFooter}`,
      backgroundColor: colors.standardGreyFooter,
    },
    menuItems: {
      marginRight: "20px",
    },
    logo: {
      width: "244px",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "180px",
      },
    },
  }),
);

export const useMenuStyles = makeStyles(() =>
  createStyles({
    root: {
      marginRight: "5px",
    },
    listItem: {
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
      cursor: "pointer",
    },
    activeBar: {
      backgroundColor: colors.primaryColor,
      color: colors.white,
      "&:hover": {
        backgroundColor: colors.primaryColor,
      },
      "& svg": {
        fill: colors.white,
      },
    },
    listItemIcon: {
      minWidth: "35px",
    },
  }),
);

export const StyledMenuItem = withStyles(() => ({
  root: {
    "&:focus": {
      backgroundColor: colors.primaryColor,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: colors.white,
      },
    },
  },
}))(MenuItem);
