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

// APIs
import { changePassword } from "../../../api";
import { useApp } from "../../../contexts";

export default function ChangePassword() {
  const { showErrorDialog, showSuccessDialog } = useApp();
  const classes = useStyles();

  const { push } = useRouter();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        newPassword: yup
          .string()
          .required("New Password field is required")
          .matches(PasswordValidationRegex, "Password has to contain 6-10 characters, at least 1 letter and 1  number"),
        confirmPassword: yup
          .string()
          .required("Confirm Password field is required")
          .matches(PasswordValidationRegex, "Password has to contain 6-10 characters, at least 1 letter and 1  number")
          .oneOf([yup.ref("newPassword")], "This field have to be same as Password field"),
      }),
    [],
  );

  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  // Submit the form
  const onSubmit = async (data: any) => {
    const { newPassword, confirmPassword } = data;
    const changePasswordResponse = await changePassword({ password: newPassword, confirmPassword });

    if (changePasswordResponse.error) {
      showErrorDialog(true, "We were not able to change your password. Try again.");
    } else {
      showSuccessDialog(true, "Change password successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <FormInput
        name="confirmPassword"
        classes={{ root: classes.formInput }}
        label={"Confirm Password"}
        id="confirmPassword"
        placeholder={"Confirm Password"}
        fullWidth
        control={control}
        variant={"outlined"}
        defaultValue={""}
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
