// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Material UI Components
import { Grid } from "@material-ui/core";

// Custom Components
import BodyContent from "../../components/BodyContent";
import TattooImage from "../../components/TattooImage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    galleryWrapper: {
      width: "200px",
      height: "200px",
    },
  }),
);

export default function Artists() {
  const classes = useStyles();

  // TODO: Load data currentArtist to profile

  return (
    <BodyContent>
      <Grid container className={classes.root}>
        <TattooImage />
      </Grid>
    </BodyContent>
  );
}

export const getStaticProps = async ({ params: { id } }: { params: PageParams }) => {
  // TODO: Call API to get artist by their id
  // const currentArtist = await getArtistById(artist);
  return { props: { currentArtist: { id: id, name: "Test" } } };
};

export const getStaticPaths = async () => {
  // TODO: Call API to get all available artists here
  // const artists = await getAll();
  // const paths = artists.map((artists) => ({ params: { artists: artists.id } }));
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true,
  };
};

interface PageParams {
  id: string;
  name: string;
}
