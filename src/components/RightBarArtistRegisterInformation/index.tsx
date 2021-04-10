// External
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Material UI Components
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

// Custom component
import FormInput from "../FormInput";
import SettingList from "../RightBarRegisterBusinessSettings/SettingList";
import { useYupValidationResolver } from "../../utils";
import PrimaryButton from "../PrimaryButton";
import MultipleSelection from "./MutilpleSelection";

import { createArtistProfile } from "../../api";
import { useApp } from "../../contexts";

// Constants
import { artistSettingList, specialtyList, baseInstagramUrl, baseFacebookUrl, baseTwitterUrl } from "../../constants";
import PricingList from "./PricingList";
import colors from "../../palette";

// Styles
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
      fontWeight: "bold",
    },
    sectionSubTitle: {
      marginTop: "15px",
      color: colors.black,
      fontWeight: 500,
    },
  }),
);

const getDefaultValue = (settings: any[]) => {
  const checkList: any[] = [];
  settings.map((item) => {
    item.settings.map((setting: any) => {
      if (setting.defaultValue) {
        checkList.push(setting.name);
      }
    });
  });

  return checkList;
};

export default function RightBarArtistRegisterInformation({ onPreviousStep, onNext, currentUserId }: Props) {
  const app = useApp();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        bio: yup.string().required("Bio is required"),
        yearsOfExperience: yup.string().required("Years of experience is required"),
        phoneNumber: yup.string().required("Phone number is required"),
        streetAddress: yup.string().required("Street address is required"),
        zipCode: yup.string().required("Zip code is required"),
        country: yup.string().required("Country is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });
  const [checked, setChecked] = useState<string[]>(getDefaultValue(artistSettingList));
  const [currency, setCurrency] = useState("");
  const [pricePerHour, setPricePerHour] = useState<number>(0);
  const [minimumSpend, setMinimumSpend] = useState<number>(0);
  const [specialties, setSpecialties] = React.useState<string[]>([]);

  const onSubmit = async ({
    bio,
    streetAddress,
    zipCode,
    country,
    phoneNumber,
    yearsOfExperience,
    website,
    facebook,
    instagram,
    twitter,
  }: submitFormData) => {
    if (currentUserId) {
      // Call APIs to create artist profile
      const response = await createArtistProfile({
        bio,
        seeking_guest_spot: checked.includes("seeking_guest_spot"),
        guest_artist: checked.includes("guest_artist"),
        licensed: checked.includes("licensed"),
        cpr_certified: checked.includes("cpr_certified"),
        years_of_experience: yearsOfExperience,
        minimum_spend: minimumSpend,
        price_per_hour: pricePerHour,
        currency_code: currency,
        user_id: currentUserId,
        street_address: streetAddress,
        zip_code: zipCode,
        country,
        phone_number: phoneNumber,
        website,
        facebook: `${baseFacebookUrl}${facebook}`,
        instagram: `${baseInstagramUrl}${instagram}`,
        twitter: `${baseTwitterUrl}${twitter}`,
        specialty: specialties.join(","),
      });

      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        onNext &&
          onNext(data.id, {
            checked,
            minimumSpend,
            pricePerHour,
            currency,
            website,
            facebook,
            instagram,
            twitter,
            streetAddress,
            zipCode,
            country,
            phoneNumber,
          });
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
      }
    }
  };

  // Handle toggle setting buttons
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // On price change
  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case "currency": {
        setCurrency(event.target.value);
        break;
      }
      case "pricePerHour": {
        setPricePerHour(parseInt(event.target.value) || 0);
        break;
      }
      case "minimumSpend": {
        setMinimumSpend(parseInt(event.target.value) || 0);
        break;
      }
    }
  };

  // On multi selection change
  const onSelectionChange = (value: string[]) => {
    setSpecialties(value);
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            Artist Information
          </Typography>
          <Typography>Fill in the information about your studio to setup your account and profile.</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant={"h6"} className={classes.sectionTitle}>
            Tell us a little bit about yourself
          </Typography>
          <Grid container>
            <Grid item lg={12} md={12} xs={12}>
              <FormInput
                name="bio"
                classes={{ root: classes.formInput }}
                label={"Bio"}
                id="bio"
                placeholder={"Write something about  yourself"}
                fullWidth
                control={control}
                variant={"outlined"}
                defaultValue={""}
                multiline={true}
                rows={4}
                errors={errors.bio}
              />
            </Grid>

            <Typography className={classes.sectionSubTitle}>How long have you been tattooing?</Typography>
            <Grid item lg={12} md={12} xs={12}>
              <FormInput
                name="yearsOfExperience"
                classes={{ root: classes.formInput }}
                label={"Years of experience"}
                id="yearsOfExperience"
                placeholder={"Years of experience"}
                fullWidth
                type={"number"}
                control={control}
                variant={"outlined"}
                defaultValue={""}
                errors={errors.yearsOfExperience}
              />
            </Grid>

            <Typography className={classes.sectionSubTitle}>Your specialties</Typography>
            <Grid item lg={12} md={12} xs={12}>
              <MultipleSelection
                name={"Specialties"}
                value={specialties}
                optionList={specialtyList}
                onChange={onSelectionChange}
              />
            </Grid>
          </Grid>

          {artistSettingList.map((setting: any, index) => {
            return (
              <SettingList
                key={index}
                id={setting.name}
                groupName={setting.groupName}
                items={setting.settings}
                checked={checked}
                handleToggle={handleToggle}
              />
            );
          })}

          <PricingList
            currency={currency}
            pricePerHour={pricePerHour}
            minimumSpend={minimumSpend}
            onPriceChange={onPriceChange}
          />

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

          <Typography variant={"h6"} className={classes.sectionTitle}>
            Social Presence
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
                defaultValue={""}
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
                defaultValue={""}
                errors={errors.twitter}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{baseTwitterUrl}</InputAdornment>,
                }}
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
  bio: string;
  streetAddress: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  yearsOfExperience: number;
  website: string;
  facebook: string;
  instagram: string;
  twitter: string;
}
