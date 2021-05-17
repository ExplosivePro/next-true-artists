import { makeStyles, createStyles, Theme, withStyles, fade } from "@material-ui/core/styles";
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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "350px",
      },
      border: `solid 1px ${colors.grey} !important`,
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      paddingLeft: "10px",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
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
      borderRadius: "5px",
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

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
