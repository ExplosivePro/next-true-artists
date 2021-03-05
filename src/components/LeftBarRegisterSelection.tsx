// External
import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import clsx from "clsx";

// Material UI Components
import color from "../palette";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// Custom Components
import StepCircle from "./StepCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      padding: "45px",
      position: "relative",
    },
    desktopDisplay: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    mobileDisplay: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
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
      maxWidth: "300px",
    },
    checkIcon: {
      color: color.standardGreen,
    },
    logo: {
      maxWidth: "244px",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "180px",
      },
    },
    logoWrapper: {
      position: "absolute",
      top: "48px",
      left: "45px",
      width: "auto",
      paddingRight: "45px",
    },
    stepMobileIconList: {
      position: "absolute",
      bottom: 0,
      left: "22px",
      height: "12px",
      zIndex: 1,
    },
  }),
);

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
    <>
      <Grid container className={clsx(classes.root, classes.desktopDisplay)} alignItems={"center"} justify={"center"}>
        <div className={classes.logoWrapper}>
          <img src={"/images/icons/logo.svg"} className={classes.logo} alt={"logo"} />
        </div>
        <Grid container spacing={4}>
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem name={"Account Type"} selected={step === 0} checked={step > 0} />
          </Grid>
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem name={"Personal Details"} selected={step === 1} checked={step > 1} />
          </Grid>
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem name={"Working Location"} selected={step === 2} checked={step > 2} />
          </Grid>
          {/*<Grid container item lg={12} md={12} sm={12} alignItems={"center"}>*/}
          {/*  <StepItem name={"Working Location"} selected={step === 3} checked={step > 3} />*/}
          {/*</Grid>*/}
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem name={"Your Style of Work"} selected={step === 4} checked={step > 4} />
          </Grid>
        </Grid>
        <div className={classes.imageWrapper}>
          <img className={classes.imageItem} src={"/images/left-bar-register-selection.svg"} alt={"icon"} />
        </div>
      </Grid>
      <Grid container className={clsx(classes.mobileDisplay)} alignItems={"center"} justify={"center"}>
        <Grid container alignItems={"center"} justify={"center"}>
          <img src={"/images/icons/logo.svg"} className={classes.logo} alt={"logo"} />
        </Grid>
        <div className={classes.stepMobileIconList}>
          <StepCircle active={step > 0} selected={step === 0} />
          <StepCircle active={step > 1} selected={step === 1} />
          <StepCircle active={step > 2} selected={step === 2} />
          <StepCircle active={step > 3} selected={step === 3} />
          {/*<StepCircle active={step > 4} selected={step === 4} />*/}
        </div>
      </Grid>
    </>
  );
}
