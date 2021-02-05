// External import
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import Container from "@material-ui/core/Container";
import { Grid, Typography } from "@material-ui/core";

// Custom Components
import Header from "../components/Header";
import BodyContent from "../components/BodyContent";
import TatooArtistList from "../components/TatooArtistList/TatooArtistList";
import PrimaryButton from "../components/PrimaryButton";
import Footer from "../components/Footer";

const useStyles = makeStyles({
  root: {
    padding: "0 200px",
  },
  seeMoreButton: {
    width: "191px",
  },
});

export default function Artists() {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth={false} className={classes.root}>
        <Header />
        <BodyContent>
          <Grid container>
            <Typography variant={"h6"}>Browse Tatoo Artist</Typography>

            <TatooArtistList />

            <Grid container alignItems={"center"} justify={"center"}>
              <PrimaryButton variant="contained" color="primary" size="medium" yellow className={classes.seeMoreButton}>
                See More
              </PrimaryButton>
            </Grid>
          </Grid>
        </BodyContent>
      </Container>
      <Footer />
    </>
  );
}
