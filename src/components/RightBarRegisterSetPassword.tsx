// External
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

// Custom component
import FormInput from "./FormInput";
import { useYupValidationResolver } from "../utils";
import PrimaryButton from "./PrimaryButton";

const useStyles = makeStyles({
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
    position: "relative",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
  },
});

export default function RightBarRegisterAccountType({
  onPreviousStep,
  onNext,
}: {
  onPreviousStep?: () => void;
  onNext?: () => void;
}) {
  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        password: yup.string().required("Password is required"),
        confirmPassword: yup
          .string()
          .required("Confirm password field is required")
          .oneOf([yup.ref("password")], "This field have to be same as Password field"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  const onSubmit = () => {
    onNext && onNext();
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            Set Password
          </Typography>
          <Typography variant={"subtitle2"}>Add your name and work email to get started with TrueArtists</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="password"
            className={classes.formInput}
            label={"Password"}
            id="password"
            placeholder={"Password"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={""}
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
            defaultValue={""}
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
                bluePastel
                fullWidth
                onClick={onPreviousStep}
              >
                Previous Step
              </PrimaryButton>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <PrimaryButton type={"submit"} variant="contained" color="primary" size="large" fullWidth bluePastel>
                Next
              </PrimaryButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
  );
}
