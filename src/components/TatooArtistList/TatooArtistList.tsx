import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import ArtistItem from "./ArtistItem";

const useStyles = makeStyles({
  root: {
    margin: "45px 0",
  },
});

export default function TattooArtistList({ data }: Props) {
  const classes = useStyles();

  return (
    <Grid container alignItems={"center"} spacing={4} className={classes.root}>
      <Grid container justify={"center"}>
        <Typography>No data</Typography>
      </Grid>
      {data.map((item, index) => {
        return (
          <Grid container item lg={4} md={4} sm={6} xs={12} key={index} justify={"center"}>
            <ArtistItem />
          </Grid>
        );
      })}
    </Grid>
  );
}

interface Props {
  data: Resource.ArtistDetail[];
}
