// External import
import { useForm } from "react-hook-form";
import React, { useMemo, useState } from "react";
import * as yup from "yup";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// Custom Components UI
import PrimaryButton from "../../../components/PrimaryButton";
import FormInput from "../../../components/FormInput";
import ArtistProfile, { validationSchema as artistSchema } from "../../../components/ArtistProfile";

// Utils
import { useYupValidationResolver } from "../../../utils";

// Contexts
import { useApp, useAuth } from "../../../contexts";
import { useRouter } from "next/router";

// APIs
import { editUser, editArtistProfile, updateArtistAvatar } from "../../../api";

// Styles
import useStyles from "./styles";
import { artistSettingList, baseFacebookUrl, baseInstagramUrl, baseTwitterUrl } from "../../../constants";

// Get schema by role
const getSchemaByRole = (role: string): any => {
  switch (role) {
    case "artist": {
      return artistSchema;
    }
    default: {
      return yup.object({
        fullName: yup.string().required("Full name is required"),
        email: yup.string().required("email of experience is required"),
      });
    }
  }
};

// Get avatar by role
const getAvatarByRole = (role: string, profile: any): string => {
  switch (role) {
    case "artist": {
      return profile.artist.avatar?.image_url;
    }
    case "studio": {
      return profile.studio.avatar?.image_url;
    }
    default: {
      return "/broken-image.jpg";
    }
  }
};

// Get initial value for setting list
const getDefaultValue = (settings: any[], values?: any) => {
  // Already have value
  if (values) {
    const checkList: any[] = [];
    settings.map((item) => {
      item.settings.map((setting: any) => {
        if (values[setting.name]) {
          checkList.push(setting.name);
        }
      });
    });

    return checkList;
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

export default function UserProfile() {
  const classes = useStyles();
  const { showErrorDialog, showSuccessDialog } = useApp();

  const {
    user,
    user: { id, email, full_name, role, artist } = { email: "", full_name: "" },
    updateUserData,
  } = useAuth();
  const { push } = useRouter();

  // Validation schema
  const validationSchema = useMemo(() => getSchemaByRole(role as string), []);

  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>("");

  // Artist detail
  const [checked, setChecked] = useState<string[]>(getDefaultValue(artistSettingList, artist));
  const [currency, setCurrency] = useState(artist?.currency_code || "");
  const [pricePerHour, setPricePerHour] = useState<number>(artist?.price_per_hour || 0);
  const [minimumSpend, setMinimumSpend] = useState<number>(artist?.minimum_spend || 0);
  const [specialties, setSpecialties] = React.useState<string[]>(artist?.specialties || []);

  const onSubmit = async ({
    email,
    fullName,
    bio,
    yearsOfExperience,
    minimumSpend,
    pricePerHour,
    currency,
    streetAddress,
    zipCode,
    country,
    phoneNumber,
    website,
    facebook,
    instagram,
    twitter,
    specialties,
  }: any) => {
    // Call API to edit normal user role first
    const editUserResponse = await editUser({
      id: id as number,
      email: email,
      full_name: fullName,
    });

    const editArtistResponse = await editArtistProfile({
      id: artist?.id as number,
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
      country,
      phone_number: phoneNumber,
      website,
      facebook_url: `${baseFacebookUrl}${facebook}`,
      instagram_url: `${baseInstagramUrl}${instagram}`,
      twitter_url: `${baseTwitterUrl}${twitter}`,
      specialty: specialties ? specialties.join(",") : [],
    });

    let avatarUploadResponse: RestApi.Response = { error: false };

    // Update avatar
    if (fileData) {
      // Call APIs to create studio profile
      avatarUploadResponse = await updateArtistAvatar({
        id: artist?.id as number,
        file: fileData,
      });
    }

    // Show errors if there is any errors
    if (editUserResponse.error || editArtistResponse.error || avatarUploadResponse?.error) {
      showErrorDialog(true, "Update profile fail");
    } else {
      showSuccessDialog(true, "Update profile successfully");
      // Get new info
      updateUserData();
      // Back to dashboard
      push("/dashboard");
    }
  };

  const handleClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  // File input change
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    setFileData(fileUploaded);

    const reader = new FileReader();
    reader.readAsDataURL(fileUploaded);

    reader.onloadend = function () {
      setPreview(reader.result);
    };
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
    <>
      <Container className={classes.containerRoot}>
        <Grid container item alignItems={"center"}>
          <Grid container item justify={"center"}>
            <Avatar alt={full_name} src={preview || getAvatarByRole(role as string, user)} className={classes.avatar} />
            <input className={classes.fileInput} type={"file"} ref={hiddenFileInput} onChange={handleChange} />
          </Grid>
          <Grid container item justify={"center"} className={classes.changePhotoButton}>
            <PrimaryButton variant="outlined" color="primary" size="small" primaryColor onClick={handleClick}>
              Change Photo
            </PrimaryButton>
          </Grid>

          <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
            <div className={classes.formWrapper}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant={"h6"} className={classes.sectionTitle}>
                  Basic Information
                </Typography>

                <FormInput
                  name="fullName"
                  classes={{ root: classes.formInput }}
                  label={"Full name"}
                  id="fullName"
                  placeholder={"Full name"}
                  fullWidth
                  control={control}
                  variant={"outlined"}
                  defaultValue={full_name || ""}
                  errors={errors.fullName}
                />

                <FormInput
                  name="email"
                  classes={{ root: classes.formInput }}
                  label={"Email"}
                  id="email"
                  placeholder={"Email"}
                  fullWidth
                  control={control}
                  variant={"outlined"}
                  defaultValue={email || ""}
                  errors={errors.email}
                />

                {role === "artist" && artist && (
                  <ArtistProfile
                    currentData={artist}
                    className={classes.artistProfile}
                    control={control}
                    errors={errors}
                    checked={checked}
                    currency={currency}
                    pricePerHour={pricePerHour}
                    minimumSpend={minimumSpend}
                    handleToggle={handleToggle}
                    onPriceChange={onPriceChange}
                    onSelectionChange={onSelectionChange}
                    specialties={specialties}
                  />
                )}

                <Grid container spacing={2} className={classes.buttonWrapper}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <PrimaryButton
                      type={"button"}
                      variant="outlined"
                      color="primary"
                      size="large"
                      primaryColor
                      fullWidth
                      onClick={() => {
                        push("/dashboard");
                      }}
                    >
                      Cancel
                    </PrimaryButton>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <PrimaryButton
                      type={"submit"}
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      primaryColor
                    >
                      Save
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
