// External import
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Custom Component
import LeftBarRegisterSelection from "../components/LeftBarRegisterSelection";
import RightBarRegisterAccountType from "../components/RightBarRegisterAccountType";

import colors from "../palette";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    padding: 0,
  },
  fullHeightContainer: {
    height: "100%",
  },
  relativeContainer: {
    position: "relative",
  },
  formWrapper: {
    position: "relative",
    height: "100%",
  },
  formInput: {
    margin: "10px 0",
  },
  rightContainer: {
    padding: "50px 65px",
    backgroundColor: colors.lightGrey,
  },
  title: {
    fontWeight: "bold",
    marginLeft: "10px",
  },
  resetPasswordButton: {
    marginTop: "15px",
  },
  image: {
    width: "70%",
    height: "auto",
  },
  iconButton: {
    marginLeft: "-12px", // Adjust margin instead of padding to prevent affecting to hover circle shape
  },
  backButton: {
    color: colors.black,
  },
});

export default function RegisterSelection() {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid container item lg={3} md={3} sm={12} xs={12} alignItems={"center"} justify={"center"}>
          <LeftBarRegisterSelection step={0} />
        </Grid>

        <Grid item lg={9} md={9} sm={12} xs={12} className={clsx(classes.relativeContainer, classes.rightContainer)}>
          <RightBarRegisterAccountType />
        </Grid>
      </Grid>
    </Container>
  );
}
