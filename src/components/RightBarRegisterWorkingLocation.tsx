// External
import React from "react";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

// Custom component
import PrimaryButton from "./PrimaryButton";

const useStyles = makeStyles({
  root: {
    height: "100%",
    position: "relative",
  },
  groupInput: {
    marginBottom: "4px",
  },
  titleText: {
    fontWeight: 600,
    marginBottom: "10px",
  },
  titleWrapper: {
    marginBottom: "72px",
  },
  formInput: {
    margin: "12px 0",
  },
  formWrapper: {
    width: "70%",
    height: "100%",
    position: "relative",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
  },
});

export default function RightBarRegisterWorkingLocation({
  onPreviousStep,
  onNext,
}: {
  onPreviousStep?: () => void;
  onNext?: () => void;
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            Location
          </Typography>
          <Typography variant={"subtitle2"}>Add your working location to get started with TrueArtists</Typography>
        </div>

        <Grid container spacing={2} className={classes.buttonWrapper}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <PrimaryButton
              type={"button"}
              variant="outlined"
              color="primary"
              size="large"
              bluePastel
              fullWidth
              onClick={onPreviousStep}
            >
              Previous Step
            </PrimaryButton>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <PrimaryButton variant="contained" color="primary" size="large" onClick={onNext} fullWidth bluePastel>
              Next
            </PrimaryButton>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
