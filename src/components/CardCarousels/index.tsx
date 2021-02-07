import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginTop: "50px",
  },
  title: {
    marginBottom: "30px",
  },
});

import CardCarouselsItem from "./CarouselItem";
import { Typography } from "@material-ui/core";

export default function CardCarousels({ name }: Props) {
  const classes = useStyles();

  // TODO: load all tatoo artist list here
  const list = [1, 2, 3];

  return (
    <div className={classes.root}>
      <Typography variant={"h5"} className={classes.title}>
        <b>{name}</b>
      </Typography>
      <Grid container alignItems={"center"} spacing={4}>
        {list.map((item, index) => {
          return (
            <Grid container item lg={4} md={6} sm={6} xs={12} key={index} justify={"center"}>
              <CardCarouselsItem />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

interface Props {
  name: string;
}
