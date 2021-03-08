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
        streetAddress: yup.string().required("Street address field is required"),
        zipCode: yup.string().required("Zip code field is required"),
        country: yup.string().required("Country field is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  const onSubmit = async ({ streetAddress, zipCode, country }: submitFormData) => {
    if (currentUserId) {
      // Call APIs to submit register data
      const response = await createArtistProfile({
        user_id: currentUserId,
        street_address: streetAddress,
        zip_code: zipCode,
        country,
      });

      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        onNext && onNext(data.id, { streetAddress, zipCode, country });
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
            Working Address
          </Typography>
          <Typography variant={"subtitle2"}>Add your working location to get started with TrueArtists</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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

interface Props {
  currentUserId: number | undefined;
  currentData: any;
  onPreviousStep?: () => void;
  onNext?: (id: number, data: any) => void;
}

interface submitFormData {
  streetAddress: string;
  zipCode: string;
  country: string;
}
