// External import
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../utils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Custom Component
import PrimaryButton from "../../components/PrimaryButton";
import CustomDivider from "../../components/CustomDivider";
import FormInput from "../../components/FormInput";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import InstagramLoginButton from "../../components/InstagramLoginButton";

// Context
import { useAuth } from "../../contexts";
import { googleAppId, instagramAppId } from "../../constants";
import { getInstagramProfile } from "../../api";

import useStyles from "./styles";

export default function Login() {
  const router = useRouter();
  const { login, socialLogin } = useAuth();

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

  const onSubmit = async (data: Login.FormData) => {
    await login(data.email, data.password);
  };

  const goToPage = (url: string) => {
    router.push(url);
  };

  const handleGoogleLogin = async (user: any) => {
    const {
      _profile: { id },
    } = user;

    await socialLogin(id);
  };

  const handleGoogleLoginFailure = () => {
    // Just refresh the page
    window.location.reload();
  };

  useEffect(() => {
    if (router.query && router.query.code) {
      // Callback from instagram login
      getInstagramProfile({
        code: router.query.code,
        redirectUrl: `${process.env.NEXT_PUBLIC_INSTAGRAM_LOGIN_REDIRECT_URL}`,
      }).then((data) => {
        // Any error happens, go back to login page
        if (data.error) {
          router.replace("/login");
        } else {
          const {
            data: { id },
          } = data;
          socialLogin(id);
        }
      });
    }
  }, [router.query]);

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
              <Grid item lg={10} md={10} xs={10}>
                <GoogleLoginButton
                  provider="google"
                  appId={googleAppId}
                  onLoginSuccess={handleGoogleLogin}
                  onLoginFailure={handleGoogleLoginFailure}
                >
                  Login with Google
                </GoogleLoginButton>
              </Grid>
              <Grid container item lg={2} md={2} xs={2} justify={"center"}>
                <InstagramLoginButton
                  provider="instagram"
                  appId={instagramAppId}
                  scope={"user_profile"}
                  redirect={`${process.env.NEXT_PUBLIC_INSTAGRAM_LOGIN_REDIRECT_URL}`}
                />
              </Grid>
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
              bluePastel
            >
              Login
            </PrimaryButton>

            <Grid container item justify={"center"} className={classes.alreadyMemberWrapper}>
              <Typography className={classes.boldText}>Forgot password?</Typography>
              <Link href={"/forgot-password"}>
                <Typography className={classes.forgotPasswordText}> Click here</Typography>
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
