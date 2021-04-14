// External
import React, { useState } from "react";
import clsx from "clsx";

// Material UI Components
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

// Custom component
import FormInput from "../FormInput";
import SettingList from "../RightBarRegisterBusinessSettings/SettingList";
import MultipleSelection from "./MutilpleSelection";
import PricingList from "./PricingList";

// Constants
import { artistSettingList, specialtyList, baseInstagramUrl, baseFacebookUrl, baseTwitterUrl } from "../../constants";
import colors from "../../palette";
import * as yup from "yup";

// Styles
const useStyles = makeStyles(() =>
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
      width: "100%",
      height: "100%",
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

// Get initial value for setting list
const getDefaultValue = (settings: any[], values?: any) => {
  // Already have value
  if (values) {
    return values;
  } else {
    const checkList: any[] = [];
    settings.map((item) => {
      item.settings.map((setting: any) => {
        if (setting.defaultValue) {
          checkList.push(setting.name);
        }
      });
    });

    return checkList;
  }
};

export default function ArtistProfile({ control, currentData, className, errors }: Props) {
  const classes = useStyles();
  const [checked, setChecked] = useState<string[]>(getDefaultValue(artistSettingList, currentData.checked));
  const [currency, setCurrency] = useState(currentData.currency || "");
  const [pricePerHour, setPricePerHour] = useState<number>(currentData.price_per_hour || 0);
  const [minimumSpend, setMinimumSpend] = useState<number>(currentData.minimum_spend || 0);
  const [specialties, setSpecialties] = React.useState<string[]>(currentData.specialties || []);

  const {
    bio,
    yearsOfExperience,
    phone_number: phoneNumber,
    street_address: streetAddress,
    zip_code: zipCode,
    country,
    facebook_url: facebook,
    website,
    twitter_url: twitter,
    instagram_url: instagram,
  } = currentData;

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
    <Grid container className={clsx(classes.root, className)} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <>
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
                defaultValue={bio || ""}
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
                defaultValue={yearsOfExperience || 0}
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
            defaultValue={phoneNumber || ""}
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
            defaultValue={streetAddress || ""}
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
            defaultValue={zipCode || ""}
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
            defaultValue={country || ""}
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
                defaultValue={instagram.replace("instagram.com/", "") || ""}
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
                defaultValue={facebook.replace("facebook.com/", "") || ""}
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
                defaultValue={twitter.replace("twitter.com/", "") || ""}
                errors={errors.twitter}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{baseTwitterUrl}</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </>
      </div>
    </Grid>
  );
}

// Validation schema
export const validationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().required("email of experience is required"),
  bio: yup.string().required("Bio is required"),
  yearsOfExperience: yup.string().required("Years of experience is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  streetAddress: yup.string().required("Street address is required"),
  zipCode: yup.string().required("Zip code is required"),
  country: yup.string().required("Country is required"),
});

interface Props {
  currentData: any;
  onNext?: (id: number, data: any) => void;
  className?: any;
  control: any;
  errors: any;
}
