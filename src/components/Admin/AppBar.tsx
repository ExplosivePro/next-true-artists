// External Import
import React from "react";
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// import { useLocation } from "react-router";
// import qs from "qs";

// Material UI Import
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import SearchIcon from "@material-ui/icons/Search";
// import InputBase from "@material-ui/core/InputBase";

import { useAuth } from "../../contexts";
import color from "../../palette";
import AppBarMenuItems from "./AppBarMenuItems";

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: color.white,
      boxShadow: "0px 1px 0px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      color: color.black,
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
      border: `solid 1px ${color.grey} !important`,
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

export default function PrimarySearchAppBar() {
  /*  // Store
  const { searchInput, setSearchInput, setActiveSearchInput } = useAppStore((state) => ({
    searchInput: state.searchInput,
    setSearchInput: state.setSearchInput,
    setActiveSearchInput: state.setActiveSearchInput,
  })); */

  const classes = useStyles();
  const loggedUser = useAuth().user;
  // const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  /*
  // Map query url to search input
  useEffect(() => {
    // Get query string
    const queryString = location.search.split("?")[1];
    const queryData = qs.parse(queryString);

    if (queryData && queryData.term && queryData.term !== "") {
      setSearchInput(queryData.term.toString());
      setActiveSearchInput();
    }
  }, []); */

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  /* // On search input change
  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value);
    setActiveSearchInput();
  }; */

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <AppBarMenuItems handleMenuClose={handleMenuClose} />
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          classes={{ root: classes.profileButton }}
        >
          <Avatar alt={loggedUser?.full_name || "Avatar"} src={loggedUser?.avatar?.image_url} />
        </IconButton>
        <p>{loggedUser?.full_name}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div>
            <img src={"/images/icons/logo.svg"} className={classes.logo} alt={"logo"} />
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              classes={{ root: classes.profileButton }}
            >
              <Avatar alt={loggedUser?.full_name || "Avatar"} src={loggedUser?.avatar?.image_url} />
              <Typography className={classes.accountName}>{loggedUser?.full_name}</Typography>
              <ArrowDropDownIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
