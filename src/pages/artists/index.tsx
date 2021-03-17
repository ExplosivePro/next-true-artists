// External import
import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Head from "next/head";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";

// Custom Components
import BodyContent from "../../components/BodyContent";
import TattooArtistList from "../../components/TatooArtistList/TatooArtistList";
import PrimaryButton from "../../components/PrimaryButton";
import Loading from "../../components/Loading";

import { getArtistList } from "../../api";

const useStyles = makeStyles(() =>
  createStyles({
    seeMoreButton: {
      width: "191px",
      marginTop: "20px",
    },
  }),
);

export default function Artists({
  artists: {
    artists,
    meta: { last_page, current_page },
  },
}: Props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [artistList, setArtistList] = useState(artists);
  const [currentPage, setCurrentPage] = useState(current_page);
  const [lastPage, setLastPage] = useState(last_page);

  const loadMore = async () => {
    setLoading(true);

    // Increase current page
    setCurrentPage(currentPage + 1);

    // Get artist by current page
    const {
      artists,
      meta: { last_page },
    } = await getArtistList(currentPage + 1);

    setArtistList(artistList.concat(artists));
    setLastPage(last_page);

    setLoading(false);
  };

  return (
    <BodyContent>
      <Head>
        <title>Artist List</title>
        <meta name="description" content={"Artist list"} />
        <meta key="og:title" property="og:title" content={"Tattoo Artist List"} />
        <meta key="og:description" property="og:description" content={"Artist list"} />
      </Head>
      <Grid container>
        <Typography variant={"h6"}>
          <b>Browse Tattoo Artist</b>
        </Typography>

        <TattooArtistList data={artistList} />

        {loading && <Loading />}

        {!lastPage && (
          <Grid container alignItems={"center"} justify={"center"}>
            <PrimaryButton
              variant="contained"
              color="primary"
              size="medium"
              yellow
              className={classes.seeMoreButton}
              onClick={loadMore}
            >
              See More
            </PrimaryButton>
          </Grid>
        )}
      </Grid>
    </BodyContent>
  );
}

interface Props {
  artists: Resource.ArtistListResponse;
}

export const getStaticProps = async () => {
  // Preload artist list
  const artists = await getArtistList(1);

  return { props: { artists }, revalidate: 300 };
};
