// External import
import { useForm } from "react-hook-form";
import React, { useMemo, useState } from "react";
import * as yup from "yup";
import clsx from "clsx";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Custom Components UI
import PrimaryButton from "../../../components/PrimaryButton";
import FormInput from "../../../components/FormInput";
import ArtistProfile, { validationSchema as artistSchema } from "../../../components/ArtistProfile";
import StudioProfile, { validationSchema as studioSchema } from "../../StudioProfile";

// Utils
import { useYupValidationResolver } from "../../../utils";

// Contexts
import { useApp, useAuth, Roles } from "../../../contexts";
import { useRouter } from "next/router";

// APIs
import { editUser, editArtistProfile, updateArtistAvatar, editStudioProfile } from "../../../api";

// Styles
import useStyles from "./styles";
import {
  artistSettingList,
  baseFacebookUrl,
  baseInstagramUrl,
  baseTwitterUrl,
  defaultArtistBannerImage,
} from "../../../constants";

// Get schema by role
const getSchemaByRole = (role: string): any => {
  switch (role) {
    case Roles.ARTIST: {
      return artistSchema;
    }
    case Roles.STUDIO: {
      return studioSchema;
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
    user: { id, email, full_name, role, artist, studio } = { email: "", full_name: "" },
    updateUserData,
  } = useAuth();
  const { push } = useRouter();

  // Validation schema
  const validationSchema = useMemo(() => getSchemaByRole(role as string), []);

  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  // Tab management
  const [activeTab, setActiveTab] = useState(0);

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

  // Switch setting tab
  const switchTab = (index: number) => {
    setActiveTab(index);
  };

  // Submit edit profile for artist role
  const submitEditArtistProfile = async (
    {
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
    }: any,
    editUserResponse: RestApi.Response,
  ) => {
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

  // Submit edit profile for studio role
  const submitEditStudioProfile = async (
    {
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
    }: any,
    editUserResponse: RestApi.Response,
  ) => {
    const editArtistResponse = await editStudioProfile({
      id: studio?.id as number,
      name,
      email,
      city,
      country,
      state,
      zip_code: zipCode,
      phone_number: phoneNumber,
      instagram_ur: `${baseInstagramUrl}${instagram}`,
      website,
      facebook_url: `${baseFacebookUrl}${facebook}`,
      twitter_url: `${baseTwitterUrl}${twitter}`,
      street_address: streetAddress,
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

  // Submit regular role
  const submitEditRegularProfile = (editUserResponse: RestApi.Response) => {
    // Show errors if there is any errors
    if (editUserResponse.error) {
      showErrorDialog(true, "Update profile fail");
    } else {
      showSuccessDialog(true, "Update profile successfully");
      // Get new info
      updateUserData();
      // Back to dashboard
      push("/dashboard");
    }
  };

  // Submit the form
  const onSubmit = async (data: any) => {
    // Call API to edit normal user role first
    const editUserResponse = await editUser({
      id: id as number,
      email: data.email,
      full_name: data.fullName,
    });

    // Submit by role
    switch (role) {
      case Roles.ARTIST: {
        submitEditArtistProfile(data, editUserResponse);
        break;
      }

      case Roles.STUDIO: {
        submitEditStudioProfile(data, editUserResponse);
        break;
      }

      case Roles.REGULAR: {
        submitEditRegularProfile(editUserResponse);
        break;
      }

      default: {
        submitEditRegularProfile(editUserResponse);
        break;
      }
    }
  };

  // Open file picker
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
        <Grid container>
          <Grid item lg={4} md={4} sm={12} xs={12} className={classes.leftBar}>
            <div className={classes.barHeader}>
              <Grid container item justify={"center"}>
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <IconButton className={classes.uploadIconButton} onClick={handleClick}>
                      <CameraAltOutlinedIcon />
                    </IconButton>
                  }
                >
                  <>
                    <Avatar
                      alt={full_name}
                      src={preview || getAvatarByRole(role as string, user)}
                      className={classes.avatar}
                    />
                    <input className={classes.fileInput} type={"file"} ref={hiddenFileInput} onChange={handleChange} />
                  </>
                </Badge>
              </Grid>
              <Grid container item justify={"center"} className={classes.changePhotoButton}>
                <Typography variant={"h6"}>
                  <b>{full_name}</b>
                </Typography>
              </Grid>
            </div>
            <Divider />
            <div className={classes.menuItemList}>
              <MenuItem
                className={clsx({ [classes.menuActive]: activeTab === 0 })}
                onClick={() => {
                  switchTab(0);
                }}
              >
                <ListItemIcon>
                  <PersonOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography>Edit Profile</Typography>} />
              </MenuItem>
              <MenuItem
                className={clsx({ [classes.menuActive]: activeTab === 1 })}
                onClick={() => {
                  switchTab(1);
                }}
              >
                <ListItemIcon>
                  <VpnKeyOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography>Change Password</Typography>} />
              </MenuItem>
              <MenuItem
                className={clsx({ [classes.menuActive]: activeTab === 2 })}
                onClick={() => {
                  switchTab(2);
                }}
              >
                <ListItemIcon>
                  <GroupOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography>Social Profile</Typography>} />
              </MenuItem>
            </div>
          </Grid>
          <Grid item lg={7} md={7} sm={12} xs={12} className={classes.rightBar}>
            <div className={classes.coverWrapper}>
              <img src={defaultArtistBannerImage} alt={"cover"} />
            </div>
            <Grid container item alignItems={"center"} className={classes.formContainer}>
              <div className={classes.barDescriptionTitleWrapper}>
                <Typography variant={"h6"} display={"block"}>
                  Edit Profile
                </Typography>
                <Typography variant={"caption"} display={"block"}>
                  Set Up Your Personal Information
                </Typography>
              </div>

              <div className={classes.divider}>
                <Divider />
              </div>

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

                    {role === Roles.ARTIST && artist && (
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

                    {role === Roles.STUDIO && studio && (
                      <StudioProfile control={control} errors={errors} currentData={studio} />
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
