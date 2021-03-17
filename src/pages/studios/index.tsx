// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Head from "next/head";

// Custom Components
import BodyContent from "../../components/BodyContent";
import Carousels from "../../components/Carousels";
import CardCarousels, { Mode } from "../../components/CardCarousels";

import { getStudioList, getTopCityList, getFeaturedStudioList } from "../../api";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "15px",
    },
    seeMoreButton: {
      width: "191px",
    },
  }),
);

export default function Studios({ studios, topCities, featuredStudios }: Props) {
  const classes = useStyles();

  return (
    <BodyContent variant={"div"} className={classes.root}>
      <Head>
        <title>Studio List</title>
        <meta name="description" content={"Studio list"} />
        <meta key="og:title" property="og:title" content={"Studio List"} />
        <meta key="og:description" property="og:description" content={"Studio list"} />
      </Head>
      <Carousels name={"Top Cities"} data={topCities} />
      <CardCarousels name={"Featured Studios"} mode={Mode.SINGLE_ROW} data={featuredStudios} />
      <CardCarousels name={"Latest Studios"} data={studios} />
    </BodyContent>
  );
}

interface Props {
  studios: Resource.StudioListResponse;
  featuredStudios: Resource.StudioListResponse;
  topCities: Resource.TopCity[];
}

export const getStaticProps = async () => {
  // Preload studios, top cities, feature studios list
  const studios = await getStudioList(1);
  const topCities = await getTopCityList();
  const featuredStudios = await getFeaturedStudioList(1);

  return { props: { studios, topCities, featuredStudios } };
};
