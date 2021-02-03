// External import
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
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

// Custom Component
import PrimaryButton from "../components/PrimaryButton";
import CustomDivider from "../components/CustomDivider";
import FormInput from "../components/FormInput";

import colors from "../palette";

import { useAuth } from "../contexts";

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
  forgotPasswordText: {
    fontWeight: 500,
    color: colors.standardRed,
    marginLeft: "5px",
  },
  image: {
    width: "70%",
    height: "auto",
    cursor: "pointer",
  },
});

export default function Login() {
  const { login } = useAuth();

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

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid container item lg={8} md={8} sm={true} xs={true} alignItems={"center"} justify={"center"}>
          <Link href={"/register"}>
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
            >
              Join as artist or studio
            </PrimaryButton>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
