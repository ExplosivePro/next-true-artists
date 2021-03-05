import React from "react";

import { AppBar, Toolbar } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRouter } from "next/router";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

import AppBarMenuItems from "./AppBarMenuItems";

import colors from "../../palette";
import PrimaryButton from "../PrimaryButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: colors.white,
      boxShadow: "none",
      color: colors.black,
      padding: "50px 0",
    },
    toolBar: {
      paddingLeft: 0,
    },
    navbarDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
    },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    linkText: {
      textDecoration: `none`,
      color: `white`,
    },
    active: {
      borderBottom: `solid 4px ${colors.standardYellow}`,
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("lg")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
    profileButton: {
      padding: "3px 8px 1px 5px",
      borderRadius: "35px",
      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 15%)",
      border: "solid 1px #f2f2f2",
      backgroundColor: "#fafafa",
    },
    accountName: {
      marginLeft: "10px",
      marginRight: "10px",
      fontWeight: 500,
      fontSize: ".8rem",
    },
    logo: {
      width: "244px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "180px",
      },
    },
    listItemText: {
      fontWeight: "bold",
    },
    searchButton: {
      marginRight: "50px",
    },
    operationButton: {
      marginLeft: "10px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  }),
);

export default function Header(props: Props) {
  const classes = useStyles();
  const router = useRouter();

  // TODO: Move this to constants with well comment
  const navLinks = [
    { title: `Home`, path: `/home` },
    { title: `Artists`, path: `/artists` },
    { title: `Studios`, path: `/studios` },
    { title: `Tattoos`, path: `/tattoos` },
    { title: `Awards`, path: `/awards` },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  // Go to specific page
  const goToPage = (url: string) => {
    router.push(url);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = props.userProfile && (
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
      {props.userProfile && (
        <>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              classes={{ root: classes.profileButton }}
            >
              <Avatar alt={"User"} src="/images/james.png" />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              goToPage("/login");
            }}
          >
            <Typography>Logout</Typography>
          </MenuItem>
        </>
      )}

      <MenuItem
        onClick={() => {
          goToPage("/login");
        }}
      >
        <Typography>Login</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          goToPage("/register");
        }}
      >
        <Typography>Register</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <img src={"/images/icons/logo.svg"} className={classes.logo} alt={"logo"} />

          <Grid container alignItems={"center"} justify={"center"}>
            <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
              {navLinks.map(({ title, path }) => (
                <a
                  href={path}
                  key={title}
                  className={clsx(classes.linkText, { [classes.active]: router.pathname.includes(path) })}
                >
                  <ListItem button>
                    <ListItemText primary={title} classes={{ primary: classes.listItemText }} />
                  </ListItem>
                </a>
              ))}
            </List>
          </Grid>
          <IconButton edge="end" aria-label="search" color="inherit" className={classes.searchButton}>
            <SearchIcon />
          </IconButton>

          <PrimaryButton
            variant="contained"
            color="primary"
            size="large"
            bluePastel
            className={classes.operationButton}
            onClick={() => {
              goToPage("/register");
            }}
          >
            Register
          </PrimaryButton>

          <PrimaryButton
            variant="outlined"
            color="primary"
            size="large"
            bluePastel
            className={classes.operationButton}
            onClick={() => {
              goToPage("/register");
            }}
          >
            Login
          </PrimaryButton>

          {props.userProfile && (
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={handleProfileMenuOpen}
                classes={{ root: classes.profileButton }}
              >
                <Avatar alt={"User"} src="/images/james.png" />
                <Typography className={classes.accountName}>James</Typography>

                <ExpandMoreIcon />
              </IconButton>
            </div>
          )}
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

interface Props {
  userProfile: any;
}
