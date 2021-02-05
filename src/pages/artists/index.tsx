// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";

// Custom Components
import BodyContent from "../../components/BodyContent";
import TatooArtistList from "../../components/TatooArtistList/TatooArtistList";
import PrimaryButton from "../../components/PrimaryButton";

const useStyles = makeStyles(() =>
  createStyles({
    seeMoreButton: {
      width: "191px",
    },
  }),
);

export default function Artists() {
  const classes = useStyles();

  return (
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
  );
}

export const getStaticProps = async () => {
  // TODO: Call APIs here to get artist list
  return { props: { artists: [] } };
};
