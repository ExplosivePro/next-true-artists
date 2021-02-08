// External import
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useYupValidationResolver } from "../utils";
import clsx from "clsx";
import Link from "next/link";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Custom Component
import PrimaryButton from "../components/PrimaryButton";
import FormInput from "../components/FormInput";

import colors from "../palette";
import IconButton from "@material-ui/core/IconButton";

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

export default function Register() {
  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup.string().required("Email address field is required").email("* Wrong email format"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  const onSubmit = () => {};

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid container item lg={8} md={8} sm={true} xs={true} alignItems={"center"} justify={"center"}>
          <img src={"/images/left-background-landing-page.png"} alt={"background"} className={classes.image} />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12} className={clsx(classes.relativeContainer, classes.rightContainer)}>
          <Grid container alignItems={"center"}>
            <Link href={"/login"}>
              <IconButton aria-label="back" className={classes.iconButton}>
                <ArrowBackIcon className={classes.backButton} />
              </IconButton>
            </Link>

            <Typography variant={"h5"} display={"inline"} className={classes.title}>
              Forgot Password
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
            <FormInput
              name="email"
              classes={{ root: classes.formInput }}
              label={"Email Address"}
              id="email"
              placeholder={"Email address"}
              fullWidth
              control={control}
              variant={"outlined"}
              defaultValue={""}
              errors={errors.email}
            />
            <PrimaryButton
              className={classes.resetPasswordButton}
              type={"submit"}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              bluePastel
            >
              Reset Password
            </PrimaryButton>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
