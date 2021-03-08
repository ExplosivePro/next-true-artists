// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Custom Components
import BodyContent from "../../components/BodyContent";
import Carousels from "../../components/Carousels";
import CardCarousels from "../../components/CardCarousels";

import { getStudioList } from "../../api";

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

export default function Studios() {
  const classes = useStyles();

  /// TODO: Load studios data
  return (
    <BodyContent variant={"div"} className={classes.root}>
      <Carousels name={"Top Cities"} />
      <CardCarousels name={"Featured Studios"} mode={"singleRow"} />
      <CardCarousels name={"Latest Studios"} />
    </BodyContent>
  );
}

export const getStaticProps = async () => {
  // Preload artist list
  const studios = await getStudioList(1);

  return { props: { studios } };
};
