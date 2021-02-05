// External import
import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// Material UI Components
import Container from "@material-ui/core/Container";
import { Grid, Typography } from "@material-ui/core";

// Custom Components
import Header from "../components/Header";
import BodyContent from "../components/BodyContent";
import TatooArtistList from "../components/TatooArtistList/TatooArtistList";
import PrimaryButton from "../components/PrimaryButton";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 200px",
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    seeMoreButton: {
      width: "191px",
    },
  }),
);

export default function Artists() {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth={false} className={classes.root}>
        <Header />
        <BodyContent>
          <Grid container>
            <Typography variant={"h6"}>
              <b>Browse Tatoo Artist</b>
            </Typography>

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

export const getStaticProps = async () => {
  // TODO: Call APIs here to get artist list
  return { props: { artists: [] } };
};
