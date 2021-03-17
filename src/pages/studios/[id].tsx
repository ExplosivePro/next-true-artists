// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Head from "next/head";

// Material UI Components
import { Grid } from "@material-ui/core";

// Custom Components
import BodyContent from "../../components/BodyContent";
import FullWidthCover from "../../components/FullWidthCover";
import StudioProfileHeader from "../../components/StudioProfileHeader";
import StudioProfileTab from "../../components/StudioProfileTab";
import { getStudioById, getStudioList, getStudioReviews } from "../../api";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
);

export default function Studio({ currentStudio, reviews }: Props) {
  const classes = useStyles();

  console.log(currentStudio);

  return (
    <BodyContent>
      <Head>
        <title>Studio Profile - {currentStudio.name}</title>
        <meta name="description" content={`Artist ${currentStudio.name} profile`} />
        <meta key="og:title" property="og:title" content={`Artist Profile - ${currentStudio.name}`} />
        <meta key="og:description" property="og:description" content={`Artist ${currentStudio.name} profile`} />
      </Head>
      <Grid container className={classes.root}>
        <FullWidthCover src={currentStudio.cover || ""} />
        <StudioProfileHeader data={currentStudio} />
        <StudioProfileTab data={{ data: currentStudio, reviews }} />
      </Grid>
    </BodyContent>
  );
}

interface Props {
  currentStudio: Resource.StudioDetail;
  reviews: Resource.Review[];
}

interface PageParams {
  id: string;
  name: string;
}

export const getStaticProps = async ({ params: { id } }: { params: PageParams }) => {
  const currentStudio = await getStudioById(parseInt(id));
  const reviews = await getStudioReviews(parseInt(id));
  return {
    props: { currentStudio, reviews },
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
