// External
import React, { useState } from "react";

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

// APIs
import { editArtistProfile } from "../api";

// Context
import { useApp } from "../contexts";

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

export default function RightBarRegisterWorkStyle({ data = [], currentUserId, onSkip, onNext }: Props) {
  const classes = useStyles();
  const app = useApp();

  const [optionValues, setOptionValues] = useState({});

  // Get style id array from object array data
  const getSelectedIds = () => {
    const results: number[] = [];
    Object.keys(optionValues).map((key) => {
      // Checked value
      if (optionValues[key]) {
        results.push(parseInt(key));
      }
    });

    return results;
  };

  // On check change
  const handleChange = (e: any) => {
    setOptionValues({ ...optionValues, [e.target.name]: e.target.checked });
  };

  const goNext = async () => {
    if (currentUserId) {
      // Edit artist profile
      // Call APIs to submit register data
      const response = await editArtistProfile({
        id: currentUserId,
        styles: getSelectedIds(),
      });

      const { error, errors } = response;
      // No error happens
      if (!error) {
        onNext && onNext(optionValues);
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
      }
    }
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h4"} className={classes.titleText}>
            Your tattoo style of work
          </Typography>
          <Typography variant={"h6"}>Select tattoo styles you mostly like to work on.</Typography>
        </div>

        {data.map((workStyle, index) => (
          <Box className={classes.box} key={index}>
            <FormGroup row>
              <FormControlLabel
                value={workStyle.id}
                classes={{ root: classes.formControlLabel }}
                control={
                  <Checkbox
                    name={workStyle.id.toString()}
                    classes={{ root: classes.checkBox }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon classes={{ root: classes.checkedIcon }} />}
                  />
                }
                onChange={handleChange}
                label={workStyle.name}
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
              Previous Step
            </PrimaryButton>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <PrimaryButton variant="contained" color="primary" size="large" onClick={goNext} fullWidth bluePastel>
              Next
            </PrimaryButton>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

interface Props {
  data: Resource.WorkingStyle[];
  currentUserId: number | undefined;
  role: string;
  onSkip?: () => void;
  onNext?: (data: any) => void;
}
