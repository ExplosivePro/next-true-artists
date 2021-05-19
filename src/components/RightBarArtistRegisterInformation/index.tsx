// External
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Material UI Components
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";

// Custom component
import FormInput from "../FormInput";
import SettingList from "../RightBarRegisterBusinessSettings/SettingList";
import { useYupValidationResolver } from "../../utils";
import PrimaryButton from "../PrimaryButton";
import MultipleSelection from "./MutilpleSelection";
import PricingList from "./PricingList";

import { createArtistProfile, editArtistProfile } from "../../api";
import { useApp } from "../../contexts";

// Constants
import {
  artistSettingList,
  specialtyList,
  baseInstagramUrl,
  baseFacebookUrl,
  baseTwitterUrl,
  countryList,
} from "../../constants";

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
    form: {
      paddingBottom: "25px",
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
      marginBottom: "100px",
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

// Preload setting values base on data returned from server
const preloadSettingValues = (settingMap: any[], artistProfile: Resource.ArtistDetail) => {
  const checkList: any[] = [];
  settingMap.map((item) => {
    item.settings.map((setting: any) => {
      if (artistProfile[setting.name]) {
        checkList.push(setting.name);
      }
    });
  });

  return checkList;
};

export default function RightBarArtistRegisterInformation({
  onNext,
  currentUserId, // User Id
  currentUserRoleId, // Artist Id (After creation), if this exists, user are editing their profile
  currentData,
}: Props) {
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
        city: yup.string().required("City is required"),
        country: yup.string().required("Country is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });
  const [checked, setChecked] = useState<string[]>(getDefaultValue(artistSettingList, currentData.checked));
  const [currency, setCurrency] = useState(currentData.currency || "");
  const [pricePerHour, setPricePerHour] = useState<number>(currentData.pricePerHour || 0);
  const [minimumSpend, setMinimumSpend] = useState<number>(currentData.minimumSpend || 0);
  const [specialties, setSpecialties] = React.useState<string[]>(currentData.specialties || []);

  const {
    bio,
    yearsOfExperience,
    phoneNumber,
    streetAddress,
    zipCode,
    city,
    country,
    facebook,
    website,
    twitter,
    instagram,
  } = currentData;

  const onSubmit = async ({
    bio,
    streetAddress,
    zipCode,
    city,
    country,
    phoneNumber,
    yearsOfExperience,
    website,
    facebook,
    instagram,
    twitter,
  }: submitFormData) => {
    if (currentUserId) {
      // Edit
      if (currentUserRoleId) {
        // Call APIs to edit artist profile
        const response = await editArtistProfile({
          id: currentUserRoleId as number,
          bio,
          seeking_guest_spot: checked.includes("seeking_guest_spot"),
          guest_artist: checked.includes("guest_artist"),
          licensed: checked.includes("licensed"),
          cpr_certified: checked.includes("cpr_certified"),
          years_of_experience: yearsOfExperience,
          minimum_spend: minimumSpend,
          price_per_hour: pricePerHour,
          currency_code: currency,
          street_address: streetAddress,
          zip_code: zipCode,
          city,
          country,
          phone_number: phoneNumber,
          website,
          facebook_url: facebook ? `${baseFacebookUrl}${facebook}` : "",
          instagram_url: instagram ? `${baseInstagramUrl}${instagram}` : "",
          twitter_url: twitter ? `${baseTwitterUrl}${twitter}` : "",
          specialty: specialties.join(","),
        });

        const { error, data, errors } = response;
        // No error happens
        if (!error) {
          onNext &&
            onNext(data.id, {
              bio,
              yearsOfExperience,
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
              city,
              country,
              phoneNumber,
              specialties,
            });
        } else {
          app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
        }
      } else {
        // Create the new one
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
          city,
          country,
          phone_number: phoneNumber,
          website,
          facebook_url: facebook ? `${baseFacebookUrl}${facebook}` : "",
          instagram_url: instagram ? `${baseInstagramUrl}${instagram}` : "",
          twitter_url: twitter ? `${baseTwitterUrl}${twitter}` : "",
          specialty: specialties.join(","),
        });

        const { error, data, errors } = response;
        // No error happens
        if (!error) {
          onNext &&
            onNext(data.id, {
              bio,
              yearsOfExperience,
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
              specialties,
            });
        } else {
          app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
        }
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
          <Typography>Fill in the information about your studio. Make it easy for clients to contact you.</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
          />

          <FormInput
            name="country"
            classes={{ root: classes.formInput }}
            label={"Country"}
            id="country"
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

// export const preloadSettingValues = (artistDetails: Resource.ArtistDetail) => {
//   return preloadSettingValues(artistSettingList, artistDetails)
// }

export const preloadRightBarArtistRegisterInformationData = (data: Resource.ArtistDetail) => {
  const {
    bio,
    years_of_experience,
    minimum_spend,
    price_per_hour,
    currency_code,
    website,
    facebook_url,
    instagram_url,
    twitter_url,
    street_address,
    zip_code,
    country,
    phone_number,
    specialty,
  } = data;

  return {
    bio,
    yearsOfExperience: years_of_experience,
    checked: preloadSettingValues(artistSettingList, data),
    minimumSpend: minimum_spend,
    pricePerHour: price_per_hour,
    currency: currency_code,
    website,
    facebook: facebook_url,
    instagram: instagram_url,
    twitter: twitter_url,
    streetAddress: street_address,
    zipCode: zip_code,
    country,
    phoneNumber: phone_number,
    specialties: specialty?.split(","),
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
  bio: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  country: string;
  phoneNumber: string;
  yearsOfExperience: number;
  website: string;
  facebook: string;
  instagram: string;
  twitter: string;
}
