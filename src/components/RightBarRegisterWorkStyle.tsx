// External
import React from "react";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// Custom component
import PrimaryButton from "./PrimaryButton";
import colors from "../palette";

import { workStyles } from "../constants";

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
    marginTop: "25px",
  },
  box: {
    backgroundColor: colors.white,
    borderRadius: "6px",
    padding: "15px",
    margin: "15px 0",
  },
  formControlLabel: {
    width: "100%",
    flexDirection: "inherit",
  },
  checkBox: {
    position: "absolute",
    right: 0,
  },
  checkedIcon: {
    color: colors.standardGreen,
  },
});

export default function RightBarRegisterWorkStyle({ onSkip, onNext }: { onSkip?: () => void; onNext?: () => void }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            Style your work
          </Typography>
          <Typography variant={"subtitle2"}>Add your name and work email to get started with TrueArtists</Typography>
        </div>

        {workStyles.map((workStyle, index) => (
          <Box className={classes.box} key={index}>
            <FormGroup row>
              <FormControlLabel
                value={workStyle.value}
                classes={{ root: classes.formControlLabel }}
                control={
                  <Checkbox
                    classes={{ root: classes.checkBox }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon classes={{ root: classes.checkedIcon }} />}
                  />
                }
                label={workStyle.label}
                labelPlacement="start"
              />
            </FormGroup>
          </Box>
        ))}

        <Grid container spacing={2} className={classes.buttonWrapper}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <PrimaryButton
              type={"button"}
              variant="outlined"
              color="primary"
              size="large"
              bluePastel
              fullWidth
              onClick={onSkip}
            >
              Skip
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
