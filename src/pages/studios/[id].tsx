// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Material UI Components
import { Grid } from "@material-ui/core";

// Custom Components
import BodyContent from "../../components/BodyContent";
import FullWidthCover from "../../components/FullWidthCover";
import StudioProfileHeader from "../../components/StudioProfileHeader";
import StudioProfileTab from "../../components/StudioProfileTab";
import { getStudioById, getStudioList } from "../../api";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
);

export default function Studio({ currentStudio }: Props) {
  const classes = useStyles();

  // TODO: Load data currentArtist to profile

  return (
    <BodyContent>
      <Grid container className={classes.root}>
        <FullWidthCover src={currentStudio.cover || ""} />
        <StudioProfileHeader data={currentStudio} />
        <StudioProfileTab data={currentStudio} />
      </Grid>
    </BodyContent>
  );
}

interface Props {
  currentStudio: Resource.StudioDetail;
}

interface PageParams {
  id: string;
  name: string;
}

export const getStaticProps = async ({ params: { id } }: { params: PageParams }) => {
  const currentStudio = await getStudioById(parseInt(id));
  return {
    props: { currentStudio },
    revalidate: 60,
  }; // Re-generate the artist detail at most once per 60 second if a request comes in
};

export const getStaticPaths = async () => {
  // Get all available artist list, just load first 100 artist to prepload
  const { studios } = await getStudioList(1);

  // Take all artist id to path arrays
  const paths = studios.map((studio: Resource.StudioDetail) => ({ params: { id: studio.id.toString() } }));

  return {
    paths,
    fallback: true, //The paths that have not been generated at build time will not result in a 404 page.
  };
};
