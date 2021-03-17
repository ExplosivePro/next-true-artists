// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// Material UI Components
import { Grid } from "@material-ui/core";

// Custom Components
import BodyContent from "../../components/BodyContent";
import ProfileCover from "../../components/ProfileCover";
import ProfileBasicInfo from "../../components/ProfileBasicInfo";
import ProfileTab from "../../components/ProfileTab";
import Loading from "../../components/Loading";

import { getArtistList, getArtistById } from "../../api";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
);

export default function Artists({ currentArtist }: Props) {
  const classes = useStyles();
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <BodyContent>
        <Grid container className={classes.root}>
          <Loading />
        </Grid>
      </BodyContent>
    );
  }

  return (
    <BodyContent>
      <Grid container className={classes.root}>
        <ProfileCover data={currentArtist} />
        <ProfileBasicInfo data={currentArtist} />
        <ProfileTab data={currentArtist} />
      </Grid>
    </BodyContent>
  );
}

interface Props {
  currentArtist: Resource.ArtistDetail;
}

interface PageParams {
  id: string;
}

export const getStaticProps = async ({ params: { id } }: { params: PageParams }) => {
  const currentArtist = await getArtistById(parseInt(id));
  return {
    props: { currentArtist },
    revalidate: 60,
  }; // Re-generate the artist detail at most once per 60 second if a request comes in
};

export const getStaticPaths = async () => {
  // Get all available artist list, just load first 100 artist to prepload
  const { artists } = await getArtistList(1);

  // Take all artist id to path arrays
  const paths = artists.map((artists: Resource.ArtistDetail) => ({ params: { id: artists.id.toString() } }));

  return {
    paths,
    fallback: true, //The paths that have not been generated at build time will not result in a 404 page.
  };
};
