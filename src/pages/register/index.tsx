// External import
import React, { useEffect, useMemo, createRef, useState } from "react";
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
// import InstagramLoginButton from "../../components/InstagramLoginButton";

import useStyles from "./styles";

// Contexts
import { useAuth } from "../../contexts";
import { PasswordValidationRegex, googleAppId } from "../../constants";

// APIs
import { getInstagramProfile } from "../../api";

export default function Register() {
  const socialLoginRef = createRef();

  const router = useRouter();
  const { register, socialRegister } = useAuth();

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
  const [ref, setRef] = useState();

  // On submit form
  const onSubmit = async (data: Register.FormData) => {
    const { email, password, firstName, lastName } = data;
    await register({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });
  };

  // Go to specific page
  const goToPage = (url: string) => {
    router.push(url);
  };

  // Social login sucessfully
  const onSocialRegisterSuccess = async (
    email: string,
    socialId: number,
    firstName: string,
    lastName: string,
    provider: string,
  ) => {
    const { error } = await socialRegister({
      email,
      socialId,
      name: `${firstName} ${lastName}`,
      provider,
    });

    // Error happens, logout users from social
    if (error) {
      if (ref) {
        // Dirt hack to resolve react social keep remember logged in state
        // window.location.reload();
      }
    }
  };

  // User grant access to login by google
  const handleGoogleLogin = async (user: any) => {
    const {
      _profile: { email, id, firstName, lastName },
    } = user;

    onSocialRegisterSuccess(email, id, firstName, lastName, "google");
  };

  // Google login fail
  const handleGoogleLoginFailure = () => {
    // Dirt hack to resolve react social keep remember logged in state
    window.location.reload();
  };

  const setSocialLoginRef = () => socialLoginRef;

  useEffect(() => {
    if (router.query && router.query.code) {
      // Callback from instagram login
      getInstagramProfile({
        code: router.query.code,
        redirectUrl: `${process.env.NEXT_PUBLIC_INSTAGRAM_REGISTER_REDIRECT_URL}`,
      }).then((data) => {
        // Any error happens, go back to register page
        if (data.error) {
          router.replace("/register");
        } else {
          const {
            data: { id, username },
          } = data;
          onSocialRegisterSuccess(username, id, username, "", "instagram");
        }
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (socialLoginRef.current) {
      // @ts-ignore
      setRef(socialLoginRef.current);
    }
  }, [socialLoginRef.current]);

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
              <Grid item lg={12} md={12} xs={12}>
                <GoogleLoginButton
                  ref={socialLoginRef}
                  provider="google"
                  appId={googleAppId}
                  onLoginSuccess={handleGoogleLogin}
                  onLoginFailure={handleGoogleLoginFailure}
                  getInstance={setSocialLoginRef}
                >
                  Sign up with Google
                </GoogleLoginButton>
              </Grid>
              {/*<Grid container item lg={2} md={2} xs={2} justify={"center"}>*/}
              {/*  <InstagramLoginButton*/}
              {/*    provider="instagram"*/}
              {/*    appId={instagramAppId}*/}
              {/*    scope={"user_profile"}*/}
              {/*    redirect={`${process.env.NEXT_PUBLIC_INSTAGRAM_REGISTER_REDIRECT_URL}`}*/}
              {/*  />*/}
              {/*</Grid>*/}
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
