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
  },
  buttonWrapper: {
    marginTop: "25px",
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
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name field is required"),
        email: yup.string().required("Email address field is required").email("* Wrong email format"),
        phoneNumber: yup.string().required("Phone number field is required"),
        streetAddress: yup.string().required("Street address field is required"),
        zipCode: yup.string().required("Zip code field is required"),
        country: yup.string().required("Country field is required"),
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
            Artist Account
          </Typography>
          <Typography variant={"subtitle2"}>Add your name and work email to get started with TrueArtists</Typography>
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
            name="phoneNumber"
            classes={{ root: classes.formInput }}
            label={"Phone number"}
            id="phoneNumber"
            placeholder={"Phone number"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={""}
            errors={errors.phoneNumber}
          />

          <FormInput
            name="streetAddress"
            classes={{ root: classes.formInput }}
            label={"Street Address"}
            id="streetAddress"
            placeholder={"Street Address"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={""}
            errors={errors.streetAddress}
          />

          <FormInput
            name="zipCode"
            classes={{ root: classes.formInput }}
            label={"Zip Code"}
            id="zipCode"
            placeholder={"Zip Code"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={""}
            errors={errors.zipCode}
          />

          <FormInput
            name="country"
            classes={{ root: classes.formInput }}
            label={"Country"}
            id="zipCode"
            placeholder={"Country"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={""}
            errors={errors.country}
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
