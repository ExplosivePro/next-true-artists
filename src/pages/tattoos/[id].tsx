// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Material UI Components
import { Grid } from "@material-ui/core";

// Custom Components
import BodyContent from "../../components/BodyContent";
import TattooImage from "../../components/TattooImage";

// APIs
import { getTattooList, getTattooById } from "../../api";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    galleryWrapper: {
      width: "200px",
      height: "200px",
    },
  }),
);

export default function Artists({ currentTattoo }: Props) {
  const classes = useStyles();

  return (
    <BodyContent>
      <Grid container className={classes.root}>
        <TattooImage data={currentTattoo} />
      </Grid>
    </BodyContent>
  );
}

interface Props {
  currentTattoo: Resource.TattooDetail;
}

export const getStaticProps = async ({ params: { id } }: { params: PageParams }) => {
  const currentTattoo = await getTattooById(parseInt(id));
  return { props: { currentTattoo } };
};

export const getStaticPaths = async () => {
  const { tattoos } = await getTattooList(1);
  const paths = tattoos.map((tattoo) => ({ params: { id: tattoo.id.toString() } }));
  return {
    paths,
    fallback: true,
  };
};

interface PageParams {
  id: string;
}
