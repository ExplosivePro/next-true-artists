// External
import React, { useState } from "react";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

// Custom component
import PrimaryButton from "./PrimaryButton";
import GoogleWithSearch from "./GoogleMapWithSearch";
import colors from "../palette";

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
    marginBottom: "43px",
  },
  formInput: {
    margin: "12px 0",
  },
  formWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  buttonWrapper: {
    marginTop: "45px",
  },
  map: {
    height: "400px",
  },
  locationNameContainer: {
    marginTop: "25px",
    padding: "5px",
  },
  locationNameWrapper: {
    padding: "0 35px",
    borderBottom: `solid 1px ${colors.standardLightGrey}`,
  },
  cityName: {
    marginLeft: "40px",
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

  const [cityName, setCityName] = useState("-");

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            Location
          </Typography>
          <Typography variant={"subtitle2"}>Add your working location to get started with TrueArtists</Typography>
        </div>

        <GoogleWithSearch
          onSelectLocation={(name) => {
            setCityName(name);
          }}
        />

        <Grid container item lg={12} md={12} sm={12} justify={"center"} className={classes.locationNameContainer}>
          <div className={classes.locationNameWrapper}>
            <img src={"/images/icons/studio.svg"} alt={"icon"} />
            <Typography display={"inline"} className={classes.cityName}>
              {cityName}
            </Typography>
          </div>
        </Grid>

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
