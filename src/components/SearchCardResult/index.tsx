// External import
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

// Material UI Import
import { Typography } from "@material-ui/core";

// Customer Import
import CardCarouselsItem from "./CarouselItem";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: "50px",
    },
    title: {
      marginBottom: "30px",
    },
    singleCardItem: {
      margin: theme.spacing(2),
    },
    cardItem: {
      boxShadow: `0 4px 4px 0 rgb(136 118 118 / 15%)`,
    },
  });

const useStyles = makeStyles(styles);

export default function SearchCardResult({ name, data }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container item justify={"flex-start"} alignItems={"center"} className={classes.title}>
        <Typography variant={"h5"} display={"inline"}>
          <b>{name}</b>
        </Typography>
      </Grid>

      {data.length === 0 && (
        <Grid container justify={"center"}>
          <Typography>No data</Typography>
        </Grid>
      )}
      {data.map((item, index) => {
        return <CardCarouselsItem key={index} className={clsx(classes.cardItem, classes.singleCardItem)} data={item} />;
      })}
    </div>
  );
}

interface Props {
  name: string;
  data: any[];
}
