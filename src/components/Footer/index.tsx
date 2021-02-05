import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import FooterItem from "./FooterItem";
import colors from "../../palette";
import React from "react";

const useStyles = makeStyles({
  root: {
    marginTop: "50px",
    backgroundColor: colors.standardGreyFooter,
    "& .MuiListItem-root": {
      paddingLeft: 0,
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
  },
  imageItem: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxWidth: "300px",
  },
});

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

  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={2} md={2} className={classes.relativeWrapper}>
          <div className={classes.imageWrapper}>
            <img className={classes.imageItem} src={"/images/left-bar-register-selection.svg"} alt={"icon"} />
          </div>
        </Grid>
        <Grid item lg={2} md={2}>
          <FooterItem name={"Useful links"} data={footerItems.usefulLinks} />
        </Grid>
        <Grid item lg={2} md={2}>
          <FooterItem name={"True Artists"} data={footerItems.trueArtists} />
        </Grid>
        <Grid item lg={2} md={2}>
          <FooterItem name={"Legal"} data={footerItems.legal} />
        </Grid>
        <Grid item lg={2} md={2}>
          <FooterItem name={"For Artists & Studios"} data={footerItems.forArtistsAndStudios} />
        </Grid>
      </Grid>
    </Container>
  );
}
