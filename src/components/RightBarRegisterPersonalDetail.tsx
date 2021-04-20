// External
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Material UI Components
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

// Custom component
import FormInput from "./FormInput";
import { useYupValidationResolver } from "../utils";
import PrimaryButton from "./PrimaryButton";

import { PasswordValidationRegex } from "../constants";
import Link from "next/link";
import colors from "../palette";

import { editUser, registerUser } from "../api";

// Context
import { useApp, useAuth } from "../contexts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      position: "relative",
    },
    groupInput: {
      marginBottom: "4px",
    },
    titleText: {
      fontWeight: 600,
      marginBottom: "10px",
    },
    titleWrapper: {
      marginBottom: "72px",
    },
    formInput: {
      margin: "12px 0",
    },
    formWrapper: {
      width: "70%",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    buttonWrapper: {
      marginTop: "25px",
    },
    signInText: {
      fontWeight: 500,
      color: colors.lightYellow,
      marginLeft: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
  }),
);

export default function RightBarRegisterPersonalDetail({
  currentUserId,
  onPreviousStep,
  onNext,
  currentData,
  role,
}: Props) {
  const app = useApp();
  const { loginByToken } = useAuth();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name field is required"),
        email: yup.string().required("Email address field is required").email("* Wrong email format"),
        password: yup
          .string()
          .required("Password is required")
          .matches(PasswordValidationRegex, "Password has to contain 6-10 characters, at least 1 letter and 1  number"),
        confirmPassword: yup
          .string()
          .required("Confirm password field is required")
          .matches(
            PasswordValidationRegex,
            "Confirm password has to contain 6-10 characters, at least 1 letter and 1  number",
          )
          .oneOf([yup.ref("password")], "This field have to be same as Password field"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  const onSubmit = async ({ firstName, lastName, email, password, confirmPassword }: SubmitFormData) => {
    // Call APIs to submit register data
    // Edit user
    if (currentUserId) {
      const response = await editUser({
        id: currentUserId,
        email,
        first_name: firstName,
        last_name: lastName,
      });

      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        onNext && onNext(data?.id, { firstName, lastName, email, password, confirmPassword });
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
      }
    } else {
      // Create the new one
      const response = await registerUser({
        email,
        password,
        name: `${firstName} ${lastName}`,
      });

      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        // Log in
        loginByToken(data.auth_token, false);

        onNext && onNext(data?.user.id, { firstName, lastName, email, password, confirmPassword }, data.auth_token);
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
      }
    }
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            {role === "artist" ? "Create Artist" : "Create Studio"} Account
          </Typography>
          <Typography>
            To get started create your account. Already a member?
            <Link href={`/login?callback=register-selection&type=${role}`}>
              <Typography component={"span"} className={classes.signInText} display={"inline"}>
                Sign in
              </Typography>
            </Link>
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} className={classes.groupInput}>
            <Grid item lg={6} md={6} xs={6}>
              <FormInput
                name="firstName"
                label={"First Name"}
                id="firstName"
                placeholder={"First Name"}
                fullWidth
                control={control}
                variant={"outlined"}
                defaultValue={currentData.firstName || ""}
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
                defaultValue={currentData.lastName || ""}
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
            defaultValue={currentData.email || ""}
            errors={errors.email}
          />

          <FormInput
            name="password"
            className={classes.formInput}
            label={"Password"}
            id="password"
            placeholder={"Password"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={currentData.password || ""}
            type={"password"}
            errors={errors.password}
          />

          <FormInput
            name="confirmPassword"
            className={classes.formInput}
            label={"Confirm Password"}
            id="confirmPassword"
            placeholder={"Confirm Password"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={currentData.confirmPassword || ""}
            type={"password"}
            errors={errors.confirmPassword}
          />

          <Grid container spacing={2} className={classes.buttonWrapper}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <PrimaryButton
                type={"button"}
                variant="outlined"
                color="primary"
                size="large"
                primaryColor
                fullWidth
                onClick={onPreviousStep}
              >
                Previous Step
              </PrimaryButton>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <PrimaryButton type={"submit"} variant="contained" color="primary" size="large" fullWidth primaryColor>
                Next
              </PrimaryButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
  );
}

interface SubmitFormData {
  confirmPassword: "string";
  email: "string";
  firstName: "string";
  lastName: "string";
  password: "string";
  phoneNumber: "string";
}

interface Props {
  role: string;
  currentUserId: number | undefined;
  currentData: any;
  onPreviousStep?: () => void;
  onNext?: (userId: number, data: any, token?: string) => void;
}
