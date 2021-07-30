// External import
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../utils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Custom Component
import PrimaryButton from "../../components/PrimaryButton";
import CustomDivider from "../../components/CustomDivider";
import FormInput from "../../components/FormInput";
import GoogleLoginButton from "../../components/GoogleLoginButton";
// import InstagramLoginButton from "../../components/InstagramLoginButton";

// Context
import { useAuth, useApp, AuthState } from "../../contexts";

// Constants
import { googleAppId } from "../../constants";

import colors from "../../palette";

// APIs
// import { getInstagramProfile } from "../../api";

const useStyles = makeStyles(() =>
  createStyles({
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
    forgotPasswordText: {
      fontWeight: 500,
      color: colors.standardRed,
      marginLeft: "5px",
      "& a": {
        textDecoration: "none",
      },
    },
    registerText: {
      fontWeight: 500,
      marginLeft: "5px",
      "& a": {
        textDecoration: "none",
        color: colors.standardBlue,
      },
    },
    image: {
      width: "70%",
      height: "auto",
      cursor: "pointer",
    },
  }),
);

export default function Login() {
  const router = useRouter();
  const { login, socialLogin, status } = useAuth();
  const { setRegistrationCallbackData } = useApp();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup.string().required("Email address field is required").email("* Wrong email format"),
        password: yup.string().required("Password field field is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  // Submit normal login, by email and password
  const onSubmit = async (data: Login.FormData) => {
    const result = await login(data.email, data.password, router.query && router.query.callback !== undefined);

    // Callback is available, go straight to that page now
    if (router.query && router.query.callback && router.query.type && !result.error) {
      // Save current user data and marker the callback status so that callback page will know
      setRegistrationCallbackData({ ...result.data.user, ...{ registerType: router.query.type } });
      router.push(`/${router.query.callback}`);
    }
  };

  // Submit google login, using social id
  const handleGoogleLogin = async (user: any) => {
    const {
      _profile: { id, email },
    } = user;

    const result = await socialLogin(id, email, router.query && router.query.callback !== undefined);

    // Callback is available, go straight to that page now
    if (router.query && router.query.callback && router.query.type && !result.error) {
      // Save current user data and marker the callback status so that callback page will know
      setRegistrationCallbackData({ ...result.data.user, ...{ registerType: router.query.type } });
      router.push(`/${router.query.callback}`);
    }
  };

  const handleGoogleLoginFailure = (e: any | undefined) => {
    // Just refresh the page
    console.error(`Google login fail`, e);
  };

  // useEffect(() => {
  //   // Code is present, this is a callback from instagram
  //   if (router.query && router.query.code) {
  //     // Callback from instagram login
  //     getInstagramProfile({
  //       code: router.query.code,
  //       redirectUrl: `${process.env.NEXT_PUBLIC_INSTAGRAM_LOGIN_REDIRECT_URL}`,
  //     }).then((data) => {
  //       // Any error happens, go back to login page
  //       if (data.error) {
  //         router.replace("/login");
  //       } else {
  //         const {
  //           data: { id },
  //         } = data;
  //         socialLogin(id);
  //       }
  //     });
  //   }
  // }, [router.query]);

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
            Hi, Welcome back!
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
            <Typography className={classes.subTitle} display={"block"}>
              Continue with:
            </Typography>
            <Grid container spacing={1}>
              <Grid item lg={12} md={12} xs={12}>
                {status === AuthState.unAuthenticated && (
                  <GoogleLoginButton
                    provider="google"
                    appId={googleAppId}
                    onLoginSuccess={handleGoogleLogin}
                    onLoginFailure={handleGoogleLoginFailure}
                  >
                    Login with Google
                  </GoogleLoginButton>
                )}
              </Grid>
              {/*<Grid container item lg={2} md={2} xs={2} justify={"center"}>*/}
              {/*  <InstagramLoginButton*/}
              {/*    provider="instagram"*/}
              {/*    appId={instagramAppId}*/}
              {/*    scope={"user_profile"}*/}
              {/*    redirect={`${process.env.NEXT_PUBLIC_INSTAGRAM_LOGIN_REDIRECT_URL}`}*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>

            <CustomDivider className={classes.dividerContainer}>
              <Typography className={classes.greyText}>Or</Typography>
            </CustomDivider>

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
              primaryColor
            >
              Login
            </PrimaryButton>

            <Grid container item justify={"center"} className={classes.alreadyMemberWrapper}>
              <Typography className={classes.boldText}>Dont have an account?</Typography>
              <Typography className={classes.registerText}>
                <Link href={"/register"}>Sign up now</Link>
              </Typography>
            </Grid>

            <Grid container item justify={"center"} className={classes.alreadyMemberWrapper}>
              <Typography className={classes.boldText}>Forgot password?</Typography>
              <Typography className={classes.forgotPasswordText}>
                <Link href={"/forgot-password"}>Click here</Link>
              </Typography>
            </Grid>

            <PrimaryButton
              variant="outlined"
              color="primary"
              size="large"
              className={classes.joinArtistButton}
              primaryColor
              fullWidth
              href={"/register-selection"}
            >
              Join as a tattoo artist or studio
            </PrimaryButton>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
