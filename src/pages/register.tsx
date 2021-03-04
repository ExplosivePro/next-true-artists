// External import
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useYupValidationResolver } from "../utils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Custom Component
import PrimaryButton from "../components/PrimaryButton";
import CustomDivider from "../components/CustomDivider";
import FormInput from "../components/FormInput";
import GoogleLoginButton from "../components/GoogleLoginButton";
import InstagramLoginButton from "../components/InstagramLoginButton";
import colors from "../palette";

import { useAuth } from "../contexts";
import { PasswordValidationRegex, googleAppId, instagramAppId } from "../constants";

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
    textAlign: "center",
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
  signInText: {
    fontWeight: 500,
    color: colors.lightYellow,
    marginLeft: "5px",
  },
  image: {
    width: "70%",
    height: "auto",
    cursor: "pointer",
  },
  googleSignUpButton: {
    "& .MuiButton-startIcon": {
      position: "absolute",
      left: "20px",
    },
  },
});

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name field is required"),
        email: yup.string().required("Email address field is required").email("* Wrong email format"),
        password: yup
          .string()
          .required("Password field field is required")
          .matches(PasswordValidationRegex, "Password has to contain 6-10 characters, at least 1 letter and 1  number"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  const onSubmit = async (data: Register.FormData) => {
    const { email, password, firstName, lastName } = data;
    await register({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });
  };

  const goToPage = (url: string) => {
    router.push(url);
  };

  const handleGoogleLogin = (user: any) => {
    console.log(user);
  };

  const handleGoogleLoginFailure = (err: any) => {
    console.error(err);
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid container item lg={8} md={8} sm={true} xs={true} alignItems={"center"} justify={"center"}>
          <Link href={"/home"}>
            <img src={"/images/left-background-landing-page.png"} alt={"background"} className={classes.image} />
          </Link>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12} className={clsx(classes.relativeContainer, classes.rightContainer)}>
          <Typography variant={"h5"} className={classes.title}>
            Find inspiration. Get tattooed. Book today.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
            <Typography className={classes.subTitle} display={"block"}>
              Sign up with:
            </Typography>
            <Grid container spacing={1}>
              <Grid item lg={10} md={10} xs={10}>
                <GoogleLoginButton
                  provider="google"
                  appId={googleAppId}
                  onLoginSuccess={handleGoogleLogin}
                  onLoginFailure={handleGoogleLoginFailure}
                >
                  Login
                </GoogleLoginButton>
              </Grid>
              <Grid container item lg={2} md={2} xs={2} justify={"center"}>
                <InstagramLoginButton
                  provider="instagram"
                  appId={instagramAppId}
                  scope={"user_profile"}
                  redirect="https://localhost:3000/register"
                  onLoginSuccess={handleGoogleLogin}
                  onLoginFailure={handleGoogleLoginFailure}
                />
              </Grid>
            </Grid>

            <CustomDivider className={classes.dividerContainer}>
              <Typography className={classes.greyText}>Or</Typography>
            </CustomDivider>

            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={6}>
                <FormInput
                  name="firstName"
                  label={"First Name"}
                  id="firstName"
                  placeholder={"First Name"}
                  fullWidth
                  control={control}
                  variant={"outlined"}
                  defaultValue={""}
                  errors={errors.firstName}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={6}>
                <FormInput
                  name="lastName"
                  label={"Last Name"}
                  id="lastName"
                  placeholder={"Last Name"}
                  fullWidth
                  control={control}
                  variant={"outlined"}
                  defaultValue={""}
                  errors={errors.lastName}
                />
              </Grid>
            </Grid>

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

            <FormInput
              name="password"
              label={"Password"}
              id="password"
              placeholder={"Password"}
              fullWidth
              control={control}
              variant={"outlined"}
              defaultValue={""}
              errors={errors.password}
              type={"password"}
            />

            <PrimaryButton
              className={classes.signUpButton}
              type={"submit"}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              bluePastel
            >
              Sign up
            </PrimaryButton>

            <Grid container item justify={"center"} className={classes.alreadyMemberWrapper}>
              <Typography className={classes.boldText}>Already a member?</Typography>
              <Link href={"/login"}>
                <Typography className={classes.signInText}> Sign in</Typography>
              </Link>
            </Grid>

            <PrimaryButton
              variant="outlined"
              color="primary"
              size="large"
              className={classes.joinArtistButton}
              bluePastel
              fullWidth
              onClick={() => {
                goToPage("register-selection");
              }}
            >
              Join as artist or studio
            </PrimaryButton>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
