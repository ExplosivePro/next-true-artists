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

import { createArtistProfile } from "../api";
import { useApp } from "../contexts";
import { countryList } from "../constants";

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
  }),
);

export default function RightBarRegisterAddress({ onPreviousStep, onNext, currentUserId }: Props) {
  const app = useApp();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        phoneNumber: yup.string().required("Phone number field is required"),
        streetAddress: yup.string().required("Street address field is required"),
        zipCode: yup.string().required("Zip code field is required"),
        country: yup.string().required("Country field is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors, setValue } = useForm({ resolver });

  const onSubmit = async ({ streetAddress, streetAddress2, zipCode, country, phoneNumber }: submitFormData) => {
    if (currentUserId) {
      // Call APIs to create artist profile
      const response = await createArtistProfile({
        user_id: currentUserId,
        street_address: streetAddress, // Put this down temporarily due to missing APIs
        street_address_2: streetAddress2 as string,
        zip_code: zipCode,
        country,
        phone_number: phoneNumber,
      });

      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        onNext && onNext(data.id, { streetAddress, streetAddress2, zipCode, country, phoneNumber });
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "We are not to complete your registration. Try again");
      }
    }
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            Your studio address
          </Typography>
          <Typography>Enter your studio address</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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
            googleAutoComplete={[]}
            setValueFn={setValue}
            referenceFields={[
              { fieldName: "zipCode", referenceField: "postal_code" },
              { fieldName: "city", referenceField: "administrative_area_level_1" },
              { fieldName: "country", referenceField: "country", matchList: countryList },
            ]}
          />

          <FormInput
            name="streetAddress2"
            classes={{ root: classes.formInput }}
            label={"Street Address 2"}
            id="streetAddress2"
            placeholder={"Street Address 2"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={""}
            googleAutoComplete={[]}
            errors={errors.streetAddress2}
            setValueFn={setValue}
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

interface Props {
  currentUserId: number | undefined;
  currentData: any;
  role: string;
  onPreviousStep?: () => void;
  onNext?: (id: number, data: any) => void;
}

interface submitFormData {
  streetAddress: string;
  streetAddress2?: string;
  zipCode: string;
  country: string;
  phoneNumber: "string";
}
