import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import colors from "../palette";

const useStyles = makeStyles({
  root: {
    margin: "15px",
  },
  loadingIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: colors.standardYellow,
    animation: "sk-rotateplane 1.2s infinite ease-in-out",
  },
});

export default function Loading() {
  const classes = useStyles();
  return (
    <Grid container justify={"center"} className={classes.root}>
      <div className={classes.loadingIcon} />
    </Grid>
  );
}
