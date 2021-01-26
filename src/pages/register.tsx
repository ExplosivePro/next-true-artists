// External import
import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useYupValidationResolver } from "../utils";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// Custom Component
import ErrorMessage from "../components/ErrorMessage";
import PrimaryButton from "../components/PrimaryButton";
import CustomDivider from "../components/CustomDivider";

import colors from "../palette";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    paddingRight: 0,
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
  joinArtistButton: {
    position: "absolute",
    bottom: "70px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  rightContainer: {
    padding: "50px 65px",
    backgroundColor: colors.lightGrey,
  },
  title: {
    marginBottom: "35px",
    fontWeight: "bold",
  },
  subTitle: {
    fontWeight: "bold",
    margin: "15px 0",
  },
  facebookLoginIcon: {
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.normalGrey,
    borderRadius: "5px",
    cursor: "pointer",
  },
  greyText: {
    color: colors.grey,
  },
  dividerContainer: {
    marginTop: "10px",
  },
  signUpButton: {
    marginTop: "15px",
  },
  alreadyMemberWrapper: {
    marginTop: "15px",
    cursor: "pointer",
  },
  boldText: {
    fontWeight: 500,
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
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {};

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid item lg={7} md={7} xs={7}>
          Left side bar
        </Grid>

        <Grid item lg={5} md={5} xs={5} className={clsx(classes.relativeContainer, classes.rightContainer)}>
          <Typography variant={"h5"} className={classes.title}>
            Find inspiration. Get tattooed. Book today.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
            <Typography className={classes.subTitle} display={"block"}>
              Sign up with:
            </Typography>
            <Grid container spacing={1}>
              <Grid item lg={10} md={10} xs={10}>
                <PrimaryButton
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Image src="/images/icons/google.png" alt="fb" width={17} height={17} />}
                  fullWidth
                >
                  Sign up with Google
                </PrimaryButton>
              </Grid>
              <Grid container item lg={2} md={2} xs={2} justify={"center"}>
                <div className={classes.facebookLoginIcon}>
                  <Image src="/images/icons/fb.png" alt="fb" width={25} height={25} />
                </div>
              </Grid>
            </Grid>

            <CustomDivider className={classes.dividerContainer}>
              <Typography className={classes.greyText}>Or</Typography>
            </CustomDivider>

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
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={value.password}
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                    </FormControl>
                    <ErrorMessage>{errors.password && errors.password.message}</ErrorMessage>
                  </>
                );
              }}
            />

            <PrimaryButton
              className={classes.signUpButton}
              type={"submit"}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              blackStyle
            >
              Sign up
            </PrimaryButton>

            <Grid container item justify={"center"} className={classes.alreadyMemberWrapper}>
              <Typography className={classes.boldText}>Already a member?</Typography>
              <Link href={"/sign-in"}>
                <Typography color={"error"} className={classes.boldText}>
                  {" "}
                  Sign in
                </Typography>
              </Link>
            </Grid>

            <PrimaryButton
              variant="outlined"
              color="primary"
              size="large"
              className={classes.joinArtistButton}
              blackStyle
              fullWidth
            >
              Join an artist or studio
            </PrimaryButton>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
