// External
import React from "react";
import clsx from "clsx";
import * as yup from "yup";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// Custom component
import FormInput from "../FormInput";
import SettingList from "../RightBarRegisterBusinessSettings/SettingList";
import MultipleSelection from "./MutilpleSelection";
import PricingList from "./PricingList";

// Constants
import { artistSettingList, specialtyList } from "../../constants";

// Styles
import useStyles from "./styles";

export default function ArtistProfile({
  control,
  currentData,
  className,
  errors,
  handleToggle,
  onPriceChange,
  onSelectionChange,
  checked,
  currency,
  pricePerHour,
  minimumSpend,
  specialties,
  styleValues,
  workingStyles,
  onStyleChange,
}: Props) {
  const classes = useStyles();

  const {
    bio,
    yearsOfExperience,
    phone_number: phoneNumber,
    street_address: streetAddress,
    zip_code: zipCode,
    country,
  } = currentData;

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

          <Typography variant={"h6"} className={classes.sectionTitle}>
            Work Styles
          </Typography>

          <div className={classes.workStyleWrapper}>
            {workingStyles.map((workStyle, index) => (
              <Box className={classes.box} key={index}>
                <FormGroup row>
                  <FormControlLabel
                    value={workStyle.id}
                    classes={{ root: classes.formControlLabel }}
                    control={
                      <Checkbox
                        name={workStyle.id.toString()}
                        classes={{ root: classes.checkBox }}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon classes={{ root: classes.checkedIcon }} />}
                        checked={styleValues[workStyle.id] || false}
                        onChange={onStyleChange}
                      />
                    }
                    label={workStyle.name}
                    labelPlacement="start"
                  />
                </FormGroup>
              </Box>
            ))}
          </div>

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
  handleToggle: any;
  checked: string[];
  currency: string;
  pricePerHour: number;
  minimumSpend: number;
  specialties: string[];
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onSelectionChange: (value: string[]) => void;
  className?: any;
  control: any;
  errors: any;
  workingStyles: Resource.WorkingStyle[];
  onStyleChange: (e: any) => void;
  styleValues: any;
}
