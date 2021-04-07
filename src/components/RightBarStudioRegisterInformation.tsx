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

import { createStudioProfile } from "../api";
import { useApp } from "../contexts";

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
      marginBottom: "35px",
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
    sectionTitle: {
      marginTop: "15px",
    },
  }),
);

export default function RightBarStudioRegisterInformation({ onPreviousStep, onNext, currentUserId }: Props) {
  const app = useApp();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        phoneNumber: yup.string().required("Phone number field is required"),
        streetAddress: yup.string().required("Studio address field is required"),
        state: yup.string().required("State is required"),
        zipCode: yup.string().required("Zip code is required"),
        city: yup.string().required("City is required"),
        country: yup.string().required("Country is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  const onSubmit = async ({
    streetAddress,
    city,
    country,
    state,
    zipCode,
    phoneNumber,
    instagram,
    website,
    facebook,
    twitter,
  }: submitFormData) => {
    if (currentUserId) {
      // Call APIs to create studio profile
      const response = await createStudioProfile({
        user_id: currentUserId,
        city,
        country,
        state,
        zip_code: zipCode,
        phone_number: phoneNumber,
        instagram_ur: instagram,
        website,
        facebook_url: facebook,
        twitter_url: twitter,
        street_address: streetAddress, // Put this down temporarily due to missing APIs
      });

      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        onNext &&
          onNext(data.id, {
            streetAddress,
            city,
            country,
            state,
            zipCode,
            phoneNumber,
            instagram,
            website,
            facebook,
            twitter,
          });
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
            Studio Information
          </Typography>
          <Typography>Fill in the information about your studio to setup your account and profile.</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant={"h6"} className={classes.sectionTitle}>
            Address
          </Typography>

          <FormInput
            name="streetAddress"
            classes={{ root: classes.formInput }}
            label={"Street Address"}
            id="streetAddress"
            placeholder={"Studio Address"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={""}
            errors={errors.streetAddress}
          />

          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={6}>
              <FormInput
                name="city"
                classes={{ root: classes.formInput }}
                label={"City"}
                id="city"
                placeholder={"City"}
                fullWidth
                control={control}
                variant={"outlined"}
                defaultValue={""}
                errors={errors.city}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
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
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={6}>
              <FormInput
                name="state"
                classes={{ root: classes.formInput }}
                label={"State"}
                id="state"
                placeholder={"State"}
                fullWidth
                control={control}
                variant={"outlined"}
                defaultValue={""}
                errors={errors.state}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
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
            </Grid>
          </Grid>

          <Typography variant={"h6"} className={classes.sectionTitle}>
            Contact Information
          </Typography>

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

          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={6}>
              <FormInput
                name="instagram"
                classes={{ root: classes.formInput }}
                label={"Instagram"}
                id="instagram"
                placeholder={"Instagram"}
                fullWidth
                control={control}
                variant={"outlined"}
                defaultValue={""}
                errors={errors.instagram}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <FormInput
                name="website"
                classes={{ root: classes.formInput }}
                label={"Website"}
                id="website"
                placeholder={"Website"}
                fullWidth
                control={control}
                variant={"outlined"}
                defaultValue={""}
                errors={errors.website}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={6}>
              <FormInput
                name="facebook"
                classes={{ root: classes.formInput }}
                label={"Facebook"}
                id="facebook"
                placeholder={"Facebook"}
                fullWidth
                control={control}
                variant={"outlined"}
                defaultValue={""}
                errors={errors.facebook}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <FormInput
                name="twitter"
                classes={{ root: classes.formInput }}
                label={"Twitter"}
                id="twitter"
                placeholder={"Twitter"}
                fullWidth
                control={control}
                variant={"outlined"}
                defaultValue={""}
                errors={errors.twitter}
              />
            </Grid>
          </Grid>

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

interface Props {
  currentUserId: number | undefined;
  currentData: any;
  role: string;
  onPreviousStep?: () => void;
  onNext?: (id: number, data: any) => void;
}

interface submitFormData {
  streetAddress: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  instagram?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
}
