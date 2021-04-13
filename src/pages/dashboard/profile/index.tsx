// External import
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import React, { useMemo, useState } from "react";
import * as yup from "yup";

// Material UI Components
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";

// Custom Components UI
import PrimaryButton from "../../../components/PrimaryButton";
import FormInput from "../../../components/FormInput";
import MultipleSelection from "../../../components/RightBarArtistRegisterInformation/MutilpleSelection";
import SettingList from "../../../components/RightBarRegisterBusinessSettings/SettingList";
import PricingList from "../../../components/RightBarArtistRegisterInformation/PricingList";

// Constants
import {
  artistSettingList,
  baseFacebookUrl,
  baseInstagramUrl,
  baseTwitterUrl,
  specialtyList,
} from "../../../constants";

// Utils
import colors from "../../../palette";
import { useYupValidationResolver } from "../../../utils";

// Contexts
import { useAuth } from "../../../contexts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    changePhotoButton: {
      marginTop: "20px",
    },
    root: {
      height: "100%",
      position: "relative",
      marginTop: "20px",
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

export default function Profile() {
  const classes = useStyles();

  const {
    user: {
      bio,
      yearsOfExperience,
      phoneNumber,
      streetAddress,
      zipCode,
      country,
      facebook,
      website,
      twitter,
      instagram,
    },
  } = useAuth();

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

  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });
  const [currency, setCurrency] = useState("");
  const [checked, setChecked] = useState<string[]>(getDefaultValue(artistSettingList));
  const [pricePerHour, setPricePerHour] = useState<number>(0);
  const [minimumSpend, setMinimumSpend] = useState<number>(0);
  const [specialties, setSpecialties] = React.useState<string[]>([]);

  const onSubmit = async () => {};

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
    <Container>
      <Grid container item alignItems={"center"}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant={"h4"}>Edit Profile</Typography>
      </Grid>

      <Grid container item alignItems={"center"}>
        <Grid container item justify={"center"}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
        </Grid>
        <Grid container item justify={"center"} className={classes.changePhotoButton}>
          <PrimaryButton variant="outlined" color="primary" size="small" bluePastel>
            Change Photo
          </PrimaryButton>
        </Grid>

        <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
          <div className={classes.formWrapper}>
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <PrimaryButton type={"button"} variant="outlined" color="primary" size="large" bluePastel fullWidth>
                    Cancel
                  </PrimaryButton>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <PrimaryButton type={"submit"} variant="contained" color="primary" size="large" fullWidth bluePastel>
                    Save
                  </PrimaryButton>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
