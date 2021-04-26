// External import
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/router";

// Custom Component
import FormInput from "../../FormInput";
import PrimaryButton from "../../PrimaryButton";

// Material UI Components
import Grid from "@material-ui/core/Grid";

// Utils
import { useYupValidationResolver } from "../../../utils";

import useStyles from "./styles";
import { PasswordValidationRegex } from "../../../constants";

export default function ChangePassword() {
  const classes = useStyles();
  const { push } = useRouter();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        oldPassword: yup
          .string()
          .required("Old Password field is required")
          .matches(PasswordValidationRegex, "Password has to contain 6-10 characters, at least 1 letter and 1  number"),
        newPassword: yup
          .string()
          .required("New Password field is required")
          .matches(PasswordValidationRegex, "Password has to contain 6-10 characters, at least 1 letter and 1  number"),
      }),
    [],
  );

  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  // Submit the form
  // TODO: Call API here
  const onSubmit = async () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="oldPassword"
        classes={{ root: classes.formInput }}
        label={"Old Password"}
        id="fullName"
        placeholder={"Old Password"}
        fullWidth
        control={control}
        variant={"outlined"}
        defaultValue={""}
        errors={errors.oldPassword}
      />

      <FormInput
        name="newPassword"
        classes={{ root: classes.formInput }}
        label={"New Password"}
        id="newPassword"
        placeholder={"New Password"}
        fullWidth
        control={control}
        variant={"outlined"}
        defaultValue={""}
        errors={errors.newPassword}
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
            onClick={() => {
              push("/dashboard");
            }}
          >
            Cancel
          </PrimaryButton>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PrimaryButton type={"submit"} variant="contained" color="primary" size="large" fullWidth primaryColor>
            Save
          </PrimaryButton>
        </Grid>
      </Grid>
    </form>
  );
}

export const titleHeader = {
  title: "Password Settings",
  subTitle: "Change or reset your account password",
};
