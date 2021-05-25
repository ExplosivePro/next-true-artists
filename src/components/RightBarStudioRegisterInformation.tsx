// External
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Material UI Components
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

// Custom component
import FormInput from "./FormInput";
import { useYupValidationResolver } from "../utils";
import PrimaryButton from "./PrimaryButton";

import { createStudioProfile, editStudioProfile } from "../api";
import { useApp } from "../contexts";

import { baseInstagramUrl, baseFacebookUrl, baseTwitterUrl, countryList } from "../constants";
import MenuItem from "@material-ui/core/MenuItem";

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
    form: {
      paddingBottom: "120px",
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

export default function RightBarStudioRegisterInformation({
  currentData,
  onNext,
  currentUserId,
  currentUserRoleId,
}: Props) {
  const app = useApp();

  const {
    streetAddress,
    state,
    city,
    country,
    zipCode,
    phoneNumber,
    facebook,
    instagram,
    twitter,
    website,
    name,
    email,
  } = currentData;

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required("Studio name is required"),
        phoneNumber: yup.string().required("Phone number is required"),
        streetAddress: yup.string().required("Studio address is required"),
        state: yup.string().required("State is required"),
        zipCode: yup.string().required("Zip code is required"),
        city: yup.string().required("City is required"),
        country: yup.string().required("Country is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors, setValue } = useForm({ resolver });

  const onSubmit = async ({
    name,
    email,
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
      // Edit
      if (currentUserRoleId) {
        // Call APIs to create studio profile
        const response = await editStudioProfile({
          id: currentUserRoleId,
          name,
          email,
          city,
          country,
          state,
          zip_code: zipCode,
          phone_number: phoneNumber,
          website,
          facebook_url: facebook ? `${baseFacebookUrl}${facebook}` : "",
          instagram_url: instagram ? `${baseInstagramUrl}${instagram}` : "",
          twitter_url: twitter ? `${baseTwitterUrl}${twitter}` : "",
          street_address: streetAddress,
        });

        const { error, data, errors } = response;
        // No error happens
        if (!error) {
          onNext &&
            onNext(data.id, {
              name,
              email,
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
      } else {
        // Call APIs to create studio profile
        const response = await createStudioProfile({
          user_id: currentUserId,
          name,
          email,
          city,
          country,
          state,
          zip_code: zipCode,
          phone_number: phoneNumber,
          website,
          facebook_url: facebook ? `${baseFacebookUrl}${facebook}` : "",
          instagram_url: instagram ? `${baseInstagramUrl}${instagram}` : "",
          twitter_url: twitter ? `${baseTwitterUrl}${twitter}` : "",
          street_address: streetAddress, // Put this down temporarily due to missing APIs
        });

        const { error, data, errors } = response;
        // No error happens
        if (!error) {
          onNext &&
            onNext(data.id, {
              name,
              email,
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
    }
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            Studio Information
          </Typography>
          <Typography>Fill in the information about your studio. Make it easy for clients to contact you.</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Typography variant={"h6"} className={classes.sectionTitle}>
            Studio Information
          </Typography>

          <FormInput
            name="name"
            classes={{ root: classes.formInput }}
            label={"Studio name"}
            id="name"
            placeholder={"Studio name"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={name || ""}
            errors={errors.name}
          />

          <FormInput
            name="streetAddress"
            classes={{ root: classes.formInput }}
            label={"Street Address"}
            id="streetAddress"
            placeholder={"Studio Address"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={streetAddress || ""}
            errors={errors.streetAddress}
            googleAutoComplete={[]}
            setValueFn={setValue}
            referenceFields={[
              { fieldName: "zipCode", referenceField: "postal_code" },
              { fieldName: "city", referenceField: "administrative_area_level_1" },
              { fieldName: "state", referenceField: "administrative_area_level_1" },
              { fieldName: "country", referenceField: "country", matchList: countryList },
            ]}
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
                defaultValue={city || ""}
                errors={errors.city}
                googleAutoComplete={["(cities)"]}
                setValueFn={setValue}
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
                select
                control={control}
                variant={"outlined"}
                defaultValue={country || ""}
                errors={errors.country}
              >
                {countryList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </FormInput>
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
                defaultValue={state || ""}
                errors={errors.state}
                googleAutoComplete={["(regions)"]}
                setValueFn={setValue}
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
                defaultValue={zipCode || ""}
                errors={errors.zipCode}
              />
            </Grid>
          </Grid>

          <Typography variant={"h6"} className={classes.sectionTitle}>
            Contact Information
          </Typography>

          <FormInput
            name="email"
            classes={{ root: classes.formInput }}
            label={"Studio contact email"}
            id="email"
            placeholder={"Studio contact email"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={email || ""}
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
            defaultValue={phoneNumber || ""}
            errors={errors.phoneNumber}
          />

          <Typography variant={"h6"} className={classes.sectionTitle}>
            Social Media Handles
          </Typography>

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
                defaultValue={instagram || ""}
                errors={errors.instagram}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{baseInstagramUrl}</InputAdornment>,
                }}
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
                defaultValue={website || ""}
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
                defaultValue={facebook || ""}
                errors={errors.facebook}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{baseFacebookUrl}</InputAdornment>,
                }}
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
                defaultValue={twitter || ""}
                errors={errors.twitter}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{baseTwitterUrl}</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.buttonWrapper}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
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

export const preloadRightBarStudioRegisterInformationData = ({
  name,
  email,
  street_address,
  city,
  country,
  state,
  zip_code,
  phone_number,
  instagram_url,
  website_url,
  facebook_url,
  twitter_url,
}: Resource.StudioDetail) => {
  return {
    name,
    email,
    streetAddress: street_address,
    city,
    country,
    state,
    zipCode: zip_code,
    phoneNumber: phone_number,
    instagram: instagram_url,
    website: website_url,
    facebook: facebook_url,
    twitter: twitter_url,
  };
};

interface Props {
  currentUserId: number | undefined;
  currentUserRoleId: number | undefined;
  currentData: any;
  role: string;
  onPreviousStep?: () => void;
  onNext?: (id: number, data: any) => void;
}

interface submitFormData {
  name: string;
  email?: string;
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
