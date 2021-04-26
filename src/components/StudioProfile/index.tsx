// External
import React from "react";
import * as yup from "yup";

// Material UI Components
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

// Custom component
import FormInput from "../FormInput";

import { countryList, settingList } from "../../constants";
import InputFields from "../RightBarRegisterBusinessSettings/InputFields";
import SettingList from "../RightBarRegisterBusinessSettings/SettingList";
import PricingList from "../RightBarRegisterBusinessSettings/PricingList";

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
      marginTop: "20px",
      marginBottom: "35px",
    },
    form: {
      paddingBottom: "120px",
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
    },
    pricingWrapper: {
      paddingLeft: 0,
    },
  }),
);

export default function StudioProfile({
  currentData,
  control,
  errors,
  handleToggleSetting,
  onInputChange,
  onPriceChange,
  language,
  services,
  checked,
  paymentMethods,
  currency,
  pricePerHour,
  minimumRate,
}: Props) {
  const {
    street_address: streetAddress,
    state,
    city,
    country,
    zip_code: zipCode,
    phone_number: phoneNumber,
    name,
    email,
  } = currentData;

  const classes = useStyles();

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <>
          <Typography variant={"h6"} className={classes.sectionTitle}>
            Address
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
            Business Settings
          </Typography>

          <InputFields language={language} services={services} onInputChange={onInputChange} hasTitle={false} />
          {settingList.map((setting: any, index) => {
            return (
              <SettingList
                key={index}
                id={setting.groupName}
                groupName={setting.groupName}
                items={setting.settings}
                checked={checked}
                handleToggle={handleToggleSetting}
              />
            );
          })}

          <PricingList
            title={
              <Typography variant={"h6"} className={classes.sectionTitle}>
                Pricing
              </Typography>
            }
            inputWrapperClass={classes.pricingWrapper}
            paymentMethods={paymentMethods}
            currency={currency}
            pricePerHour={pricePerHour}
            minimumRate={minimumRate}
            onPriceChange={onPriceChange}
          />
        </>
      </div>
    </Grid>
  );
}

// Validation schema
export const validationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().required("email of experience is required"),
  name: yup.string().required("Studio name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  streetAddress: yup.string().required("Studio address is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("Zip code is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
});

interface Props {
  currentData: any;
  className?: any;
  control: any;
  errors: any;
  language: string[];
  services: string[];
  checked: string[];
  paymentMethods: string[];
  currency: string;
  pricePerHour: number;
  minimumRate: number;
  handleToggleSetting: any;
  onInputChange: (event: string[], name: string) => void;
  onPriceChange: (event: any, name: string) => void;
}
