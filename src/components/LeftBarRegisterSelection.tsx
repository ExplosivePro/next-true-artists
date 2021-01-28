// External
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import clsx from "clsx";

// Material UI Components
import color from "../palette";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: "45px",
    position: "relative",
  },
  titleText: {
    fontWeight: 500,
    marginLeft: "15px",
  },
  stepItemSelected: {
    opacity: 0.5,
  },
  imageWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  imageItem: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  checkIcon: {
    color: color.standardGreen,
  },
});

export default function LeftBarRegisterSelection({ step }: { step: number }) {
  const classes = useStyles();

  const StepItem = ({
    name,
    selected = false,
    checked = false,
  }: {
    name: string;
    selected?: boolean;
    checked?: boolean;
  }) => {
    return (
      <>
        {!checked && <RadioButtonUncheckedIcon className={clsx({ [classes.stepItemSelected]: !selected })} />}
        {checked && <CheckCircleIcon className={classes.checkIcon} />}
        <Typography
          className={clsx(classes.titleText, { [classes.stepItemSelected]: !selected && !checked })}
          display={"inline"}
        >
          {name}
        </Typography>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
          <StepItem name={"Account Type"} selected={step === 0} checked={step > 0} />
        </Grid>
        <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
          <StepItem name={"Personal Details"} selected={step === 1} checked={step > 1} />
        </Grid>
        <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
          <StepItem name={"Set Password"} selected={step === 2} checked={step > 2} />
        </Grid>
        <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
          <StepItem name={"Working Location"} selected={step === 3} checked={step > 3} />
        </Grid>
        <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
          <StepItem name={"Your Style of Work"} selected={step === 4} checked={step > 4} />
        </Grid>
      </Grid>
      <div className={classes.imageWrapper}>
        <img className={classes.imageItem} src={"/images/left-bar-register-selection.svg"} alt={"icon"} />
      </div>
    </div>
  );
}
