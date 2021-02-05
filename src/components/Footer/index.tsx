import React from "react";
import clsx from "clsx";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import { List, ListItem, ListItemText } from "@material-ui/core";

import FooterItem from "./FooterItem";
import colors from "../../palette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "50px",
      padding: "50px 0 0",
      backgroundColor: colors.standardGreyFooter,
      "& .MuiListItem-root": {
        paddingLeft: 0,
      },
    },
    footerItemWrapper: {
      [theme.breakpoints.down("md")]: {
        padding: "0 40px 0 0",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0 40px",
      },
    },
    relativeWrapper: {
      position: "relative",
    },
    imageWrapper: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      zIndex: 2,
    },
    imageItem: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      maxWidth: "300px",
    },
    linkText: {
      textDecoration: `none`,
      color: `white`,
      "& .MuiTypography-root": {
        fontSize: "14px",
      },
    },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
      padding: "0 20% 0 0",
      [theme.breakpoints.down("md")]: {
        padding: "0",
        margin: "0 auto",
      },
    },
    subFooter: {
      position: "absolute",
      bottom: 0,
      backgroundColor: colors.standardGreySubFooter,
    },
    logo: {
      width: "83px",
    },
    listItemText: {
      color: colors.standardGreyBorder,
    },
    gridItem: {
      marginBottom: "45px",
    },
  }),
);

export default function Footer() {
  const classes = useStyles();
  const footerItems = {
    usefulLinks: [
      {
        label: "Tatoos",
        url: "",
      },
      {
        label: "Artists",
        url: "",
      },
      {
        label: "Studios",
        url: "",
      },
      {
        label: "Watch",
        url: "",
      },
      {
        label: "Articles",
        url: "",
      },
      {
        label: "Guides",
        url: "",
      },
    ],
    trueArtists: [
      {
        label: "About",
        url: "",
      },
      {
        label: "Partners",
        url: "",
      },
      {
        label: "Press",
        url: "",
      },
      {
        label: "Careers",
        url: "",
      },
      {
        label: "Help",
        url: "",
      },
    ],
    legal: [
      {
        label: "Term & Conditions",
        url: "",
      },
      {
        label: "Privacy Policy",
        url: "",
      },
    ],
    forArtistsAndStudios: [
      {
        label: "TrueArtist Pro",
        url: "",
      },
    ],
  };

  // TODO: Move this to constants with well comment
  const navLinks = [
    { title: `Privacy`, path: `/privacy` },
    { title: `Term`, path: `/term` },
    { title: `© 2021 TrueArtist`, path: `` },
  ];

  return (
    <Container className={clsx(classes.root, classes.relativeWrapper)} maxWidth={false}>
      <Grid container className={classes.footerItemWrapper}>
        <Hidden smDown>
          <Grid item lg={3} md={3} sm={false} xs={false} className={classes.relativeWrapper}>
            <div className={classes.imageWrapper}>
              <img className={classes.imageItem} src={"/images/left-bar-register-selection.svg"} alt={"icon"} />
            </div>
          </Grid>
        </Hidden>
        <Grid item lg={2} md={2} sm={6} xs={6} className={classes.gridItem}>
          <FooterItem name={"Useful links"} data={footerItems.usefulLinks} />
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6} className={classes.gridItem}>
          <FooterItem name={"True Artists"} data={footerItems.trueArtists} />
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6} className={classes.gridItem}>
          <FooterItem name={"Legal"} data={footerItems.legal} />
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6} className={classes.gridItem}>
          <FooterItem name={"For Artists & Studios"} data={footerItems.forArtistsAndStudios} />
        </Grid>
      </Grid>
      <Grid container alignItems={"center"} justify={"flex-end"} className={classes.subFooter}>
        <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
          {navLinks.map(({ title, path }) => (
            <a href={path} key={title} className={classes.linkText}>
              <ListItem button>
                <ListItemText primary={title} classes={{ primary: classes.listItemText }} />
              </ListItem>
            </a>
          ))}
          <img src={"/images/icons/logo.svg"} className={classes.logo} alt={"logo"} />
        </List>
      </Grid>
    </Container>
  );
}
