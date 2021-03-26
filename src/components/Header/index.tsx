// External Import
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";

// Material UI Components
import { AppBar, Toolbar } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

// Custom Components
import AppBarMenuItems from "./AppBarMenuItems";
import PrimaryButton from "../PrimaryButton";

// Styles
import useStyles from "./styles";

// Constants
import { navLinks } from "../../constants";

export default function Header({ userProfile }: Props) {
  const classes = useStyles();
  const router = useRouter();

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

  // Desktop menu
  const menuId = "primary-account-menu";
  const renderMenu = userProfile && (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <AppBarMenuItems handleMenuClose={handleMenuClose} />
    </Menu>
  );

  // Mobile menu
  const mobileMenuId = "primary-account-menu-mobile";
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
      {userProfile && (
        <MenuItem onClick={handleProfileMenuOpen}>
          <Avatar alt={userProfile.full_name || "Avatar"} src={userProfile.avatar?.image_url} />
          <Typography className={classes.mobileDisplayName}>{userProfile.full_name}</Typography>
        </MenuItem>
      )}

      {!userProfile && (
        <MenuItem
          onClick={() => {
            goToPage("/login");
          }}
          className={classes.linkTextMenu}
        >
          <Typography>Login</Typography>
        </MenuItem>
      )}
      {!userProfile && (
        <MenuItem
          onClick={() => {
            goToPage("/register");
          }}
          className={classes.linkTextMenu}
        >
          <Typography>Register</Typography>
        </MenuItem>
      )}
      {navLinks.map(({ title, path }, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            goToPage(path);
          }}
          className={clsx(classes.linkTextMenu, { [classes.active]: router.pathname.includes(path) })}
        >
          <Typography>{title}</Typography>
        </MenuItem>
      ))}
      {userProfile && (
        <MenuItem
          onClick={() => {
            goToPage("/login");
          }}
          className={classes.linkTextMenu}
        >
          <Typography color={"error"}>
            <b>Logout</b>
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Link href={"/artists"}>
            <img src={"/images/icons/logo.svg"} className={classes.logo} alt={"logo"} />
          </Link>

          <Grid container alignItems={"center"} justify={"center"}>
            <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
              {navLinks.map(({ title, path }) => (
                <a
                  href={path}
                  key={title}
                  className={clsx(classes.linkText, { [classes.active]: router.pathname.includes(path) })}
                >
                  <ListItem>
                    <ListItemText primary={title} classes={{ primary: classes.listItemText }} />
                  </ListItem>
                </a>
              ))}
            </List>
          </Grid>
          <IconButton edge="end" aria-label="search" color="inherit" className={classes.searchButton}>
            <SearchIcon />
          </IconButton>

          {!userProfile && (
            <PrimaryButton
              variant="contained"
              color="primary"
              size="large"
              bluePastel
              className={classes.operationButton}
              href={"/register"}
            >
              Register
            </PrimaryButton>
          )}

          {!userProfile && (
            <PrimaryButton
              variant="outlined"
              color="primary"
              size="large"
              bluePastel
              className={classes.operationButton}
              href={"/login"}
            >
              Login
            </PrimaryButton>
          )}

          {userProfile && (
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
                <Avatar alt={userProfile.full_name || "Avatar"} src={userProfile.avatar?.image_url} />
                <Typography className={classes.accountName}>{userProfile.full_name}</Typography>

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
