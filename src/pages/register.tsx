// External import
import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useYupValidationResolver } from "../utils";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

// Custom Component
import ErrorMessage from "../components/ErrorMessage";
import Link from "next/link";

const useStyles = makeStyles({
  container: {
    height: "100vh",
  },
  fullHeightContainer: {
    height: "100%",
  },
  relativeContainer: {
    position: "relative",
  },
  formInput: {
    margin: "15px 0",
  },
  joinArtistButton: {
    position: "absolute",
    bottom: "30px",
  },
});

export default function Register() {
  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        firstName: yup.string().required("* First name is required"),
        lastName: yup.string().required("* Last name field is required"),
        email: yup.string().required("* Email address field is required").email("* Wrong email format"),
        password: yup.string().required("* Password field field is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  const onSubmit = () => {};

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid item lg={8} md={8} xs={8}>
          Left side bar
        </Grid>

        <Grid item lg={4} md={4} xs={4} className={classes.relativeContainer}>
          <Typography variant={"h4"}>Find inspiration. Get tattooed. Book today.</Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography>Sign up with:</Typography>
            <Grid container spacing={1}>
              <Grid item lg={10} md={10} xs={10}>
                <Button variant="contained" color="primary" size="large" startIcon={<FacebookIcon />} fullWidth>
                  Sign up with Google
                </Button>
              </Grid>
              <Grid container item lg={2} md={2} xs={2} justify={"center"}>
                <IconButton color="primary" aria-label="facebook" component="span">
                  <FacebookIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Divider />

            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={""}
                  render={({ value, onChange }) => {
                    return (
                      <>
                        <TextField
                          classes={{ root: classes.formInput }}
                          label={"First name"}
                          id="firstName"
                          placeholder={"First Name"}
                          fullWidth
                          variant={"outlined"}
                          value={value}
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                        />
                        <ErrorMessage>{errors.firstName && errors.firstName.message}</ErrorMessage>
                      </>
                    );
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue={""}
                  render={({ value, onChange }) => {
                    return (
                      <>
                        <TextField
                          classes={{ root: classes.formInput }}
                          label={"Last Name"}
                          id="lastName"
                          placeholder={"Last Name"}
                          fullWidth
                          variant={"outlined"}
                          value={value}
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                        />
                        <ErrorMessage>{errors.lastName && errors.lastName.message}</ErrorMessage>
                      </>
                    );
                  }}
                />
              </Grid>
            </Grid>

            <Controller
              name="email"
              control={control}
              defaultValue={""}
              render={({ value, onChange }) => {
                return (
                  <>
                    <TextField
                      classes={{ root: classes.formInput }}
                      label={"Email Address"}
                      id="email"
                      placeholder={"Email address"}
                      fullWidth
                      variant={"outlined"}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                    <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
                  </>
                );
              }}
            />

            <Controller
              name="password"
              control={control}
              defaultValue={""}
              render={({ value, onChange }) => {
                return (
                  <>
                    <TextField
                      classes={{ root: classes.formInput }}
                      label={"Password"}
                      id="password"
                      type={"password"}
                      placeholder={"Password"}
                      fullWidth
                      variant={"outlined"}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                    <ErrorMessage>{errors.password && errors.password.message}</ErrorMessage>
                  </>
                );
              }}
            />

            <Button type={"submit"} variant="contained" color="primary" size="large" fullWidth>
              Sign up
            </Button>
          </form>
          <Grid container item justify={"center"}>
            <Typography>Already a member ?</Typography> <Link href={"/sign-in"}>Sign in</Link>
          </Grid>

          <Button variant="outlined" color="primary" size="large" fullWidth className={classes.joinArtistButton}>
            Join an artist or studio
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
