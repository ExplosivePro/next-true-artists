import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "45px 0",
  },
});

import ArtistItem from "./ArtistItem";

export default function TatooArtistList() {
  const classes = useStyles();
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <Grid container alignItems={"center"} spacing={4} className={classes.root}>
      {list.map((item, index) => {
        return (
          <Grid item lg={4} md={6} sm={6} xs={6} key={index}>
            <ArtistItem />
          </Grid>
        );
      })}
    </Grid>
  );
}
