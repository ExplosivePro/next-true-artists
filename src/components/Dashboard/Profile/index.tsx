// External import
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import clsx from "clsx";
import { useRouter } from "next/router";

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
import ChangePassword, { titleHeader as changePasswordHeader } from "./ChangePassword";
import SocialLinks, { titleHeader as socialLinksHeader } from "./SocialLinks";
import TitleHeader from "./TitleHeader";
// import Cover from "./Cover";

// Utils
import { useYupValidationResolver } from "../../../utils";

// Contexts
import { Role, useApp, useAuth } from "../../../contexts";

// APIs
import {
  editArtistProfile,
  editStudioProfile,
  editUser,
  getWorkingStyleList,
  updateArtistAvatar,
  updateStudioAvatar,
} from "../../../api";

// Styles
import useStyles from "./styles";
import { artistSettingList, settingList } from "../../../constants";

// Get schema by role
const getSchemaByRole = (role: string): any => {
  switch (role) {
    case Role.ARTIST: {
      return artistSchema;
    }
    case Role.STUDIO: {
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
const getAvatarByRole = (role: Role, profile: any): string => {
  switch (role) {
    case Role.ARTIST: {
      return profile.artist.avatar?.image_url;
    }
    case Role.STUDIO: {
      return profile.studio.avatar?.image_url;
    }
    default: {
      return "/broken-image.jpg";
    }
  }
};

// Get initial value for setting list
const getDefaultValue = (user: any, role: Role) => {
  const checkList: any[] = [];
  if (role === Role.ARTIST) {
    const values = user.artist;
    artistSettingList.map((item) => {
      item.settings.map((setting: any) => {
        if (values && values[setting.name]) {
          checkList.push(setting.name);
        }
      });
    });
  }

  if (role === Role.STUDIO) {
    const values = user.studio;
    settingList.map((item) => {
      item.settings.map((setting: any) => {
        if (values && values[setting.name]) {
          checkList.push(setting.name);
        }
      });
    });
  }

  return checkList;
};

// Get attribute value by user role
const getAttributeValueByRole = (role: Role, profile: any, attribute: string, defaultValue: any) => {
  switch (role) {
    case Role.ARTIST: {
      return profile.artist[attribute];
    }
    case Role.STUDIO: {
      return profile.studio[attribute];
    }
    default: {
      return defaultValue;
    }
  }
};

const getWorkStyleData = (role: Role, profile: any) => {
  const styleData = {};

  switch (role) {
    case Role.ARTIST: {
      profile.artist.styles?.map((style: Resource.WorkingStyle) => {
        styleData[style.id] = true;
      });
      break;
    }
    case Role.STUDIO: {
      const styleData = {};
      profile.studio.styles?.map((style: Resource.WorkingStyle) => {
        styleData[style.id] = true;
      });
      break;
    }
    default: {
      return {};
    }
  }

  return styleData;
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
  const { control, handleSubmit, errors, setValue } = useForm({ resolver });

  // Tab management
  const [activeTab, setActiveTab] = useState(0);

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>("");
  const [workingStyles, setWorkingStyles] = useState([]);

  // General detail
  const [currency, setCurrency] = useState(getAttributeValueByRole(role as Role, user, "currency_code", ""));
  const [pricePerHour, setPricePerHour] = useState<number>(
    getAttributeValueByRole(role as Role, user, "price_per_hour", 0),
  );

  // Artist detail
  const [checked, setChecked] = useState<string[]>(getDefaultValue(user, role as Role));

  const [minimumSpend, setMinimumSpend] = useState<number>(artist?.minimum_spend || 0);
  const [specialties, setSpecialties] = React.useState<string[]>(artist?.specialties || []);
  const [artistStyles, setArtistStyles] = useState(getWorkStyleData(role as Role, user));

  // Studio detail
  const [paymentMethods, setPaymentMethod] = useState(studio?.accepted_payment_methods?.split(",") || []);
  const [minimumRate, setMinimumRate] = useState<number>(studio?.minimum_spend || 0);
  const [services, setServices] = useState<string[]>(studio?.services?.split(",") || []);
  const [language, setLanguage] = useState<string[]>(studio?.languages?.split(",") || []);

  // Switch setting tab
  const switchTab = (index: number) => {
    setActiveTab(index);
  };

  // Get style id array from object array data
  const getSelectedIds = (optionValues: any) => {
    const results: number[] = [];
    Object.keys(optionValues).map((key) => {
      // Checked value
      if (optionValues[key]) {
        results.push(parseInt(key));
      }
    });

    return results;
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
      streetAddress2,
      zipCode,
      country,
      phoneNumber,
      state,
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
      street_address_2: streetAddress2,
      zip_code: zipCode,
      country,
      state,
      phone_number: phoneNumber,
      specialty: specialties ? specialties.join(",") : [],
      styles: getSelectedIds(artistStyles),
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
    { name, email, streetAddress, streetAddress2, city, country, state, zipCode, phoneNumber }: any,
    editUserResponse: RestApi.Response,
  ) => {
    const editStudioResponse = await editStudioProfile({
      id: studio?.id as number,
      name,
      email,
      city,
      country,
      state,
      zip_code: zipCode,
      phone_number: phoneNumber,
      street_address: streetAddress,
      street_address_2: streetAddress2,
      minimum_spend: minimumRate,
      price_per_hour: pricePerHour,
      currency_code: currency,
      accepted_payment_methods: paymentMethods.join(","),
      accepting_guest_artist: checked.includes("accepting_guest_artist"),
      appointment_only: checked.includes("appointment_only"),
      piercings: checked.includes("piercings"),
      cosmetic_tattoos: checked.includes("cosmetic_tattoos"),
      vegan_ink: checked.includes("vegan_ink"),
      wifi: checked.includes("wifi"),
      privacy_dividers: checked.includes("privacy_dividers"),
      wheelchair_access: checked.includes("wheelchair_access"),
      parking: checked.includes("parking"),
      lgbt_friendly: checked.includes("lgbt_friendly"),
      languages: language.join(","),
      services: services.join(","),
    });

    let avatarUploadResponse: RestApi.Response = { error: false };

    // Update avatar
    if (fileData) {
      // Call APIs to create studio profile
      avatarUploadResponse = await updateStudioAvatar({
        id: studio?.id as number,
        file: fileData,
      });
    }

    // Show errors if there is any errors
    if (editUserResponse.error || editStudioResponse.error || avatarUploadResponse?.error) {
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
      case Role.ARTIST: {
        submitEditArtistProfile(data, editUserResponse);
        break;
      }

      case Role.STUDIO: {
        submitEditStudioProfile(data, editUserResponse);
        break;
      }

      case Role.REGULAR: {
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

  // On studio price change
  const onStudioPriceChange = (event: any, name: string) => {
    switch (name) {
      case "currency": {
        setCurrency(event.target.value);
        break;
      }
      case "paymentMethods": {
        setPaymentMethod(event);
        break;
      }
      case "pricePerHour": {
        setPricePerHour(parseInt(event.target.value) || 0);
        break;
      }
      case "minimumRate": {
        setMinimumRate(parseInt(event.target.value) || 0);
        break;
      }
    }
  };

  // On multi selection change
  const onSelectionChange = (value: string[]) => {
    setSpecialties(value);
  };

  // Handle studio toggle setting buttons
  const handleToggleSetting = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // On studio input change
  const onInputChange = (event: string[], name: string) => {
    switch (name) {
      case "services": {
        setServices(event);
        break;
      }
      case "language": {
        setLanguage(event);
        break;
      }
    }
  };

  // Get page header by active tab
  const getTitleHeaderByTab = (tab: number) => {
    switch (tab) {
      case 0: {
        // User Profile
        return {
          title: "Edit Profile",
          subTitle: "Set Up Your Personal Information",
        };
      }
      case 1: {
        return changePasswordHeader;
      }
      case 2: {
        return socialLinksHeader;
      }
      default: {
        return {
          title: "",
          subTitle: "",
        };
      }
    }
  };

  // Get role profile
  const getProfileByRole = (role: Role) => {
    switch (role) {
      case Role.ARTIST: {
        return user?.artist;
      }
      case Role.STUDIO: {
        return user?.studio;
      }
      default: {
        return user;
      }
    }
  };

  // On artist style change
  const onArtistStyleChange = (e: any) => {
    setArtistStyles({ ...artistStyles, [e.target.name]: e.target.checked });
  };

  const getWorkingStyles = async () => {
    setWorkingStyles(await getWorkingStyleList());
  };

  useEffect(() => {
    getWorkingStyles();
  }, []);

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
                    <>
                      {activeTab === 0 ? (
                        <IconButton className={classes.uploadIconButton} onClick={handleClick}>
                          <CameraAltOutlinedIcon />
                        </IconButton>
                      ) : (
                        <div></div>
                      )}
                    </>
                  }
                >
                  <>
                    <Avatar
                      alt={full_name}
                      src={preview || getAvatarByRole(role as Role, user)}
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
              {role !== Role.REGULAR && (
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
              )}
            </div>
          </Grid>
          <Grid item lg={7} md={7} sm={12} xs={12} className={classes.rightBar}>
            {/*<Cover />*/}
            <Grid container item alignItems={"center"} className={classes.formContainer}>
              <TitleHeader data={getTitleHeaderByTab(activeTab)} />
              <div className={classes.divider}>
                <Divider />
              </div>

              <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
                <div className={classes.formWrapper}>
                  {activeTab === 0 && (
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

                      {role === Role.ARTIST && artist && (
                        <ArtistProfile
                          currentData={artist}
                          className={classes.artistProfile}
                          control={control}
                          errors={errors}
                          checked={checked}
                          currency={currency}
                          pricePerHour={pricePerHour}
                          minimumSpend={minimumSpend}
                          styleValues={artistStyles}
                          handleToggle={handleToggle}
                          onPriceChange={onPriceChange}
                          onSelectionChange={onSelectionChange}
                          onStyleChange={onArtistStyleChange}
                          specialties={specialties}
                          workingStyles={workingStyles}
                          setValue={setValue}
                        />
                      )}

                      {role === Role.STUDIO && studio && (
                        <StudioProfile
                          checked={checked}
                          control={control}
                          errors={errors}
                          currentData={studio}
                          paymentMethods={paymentMethods}
                          minimumRate={minimumRate}
                          language={language}
                          services={services}
                          pricePerHour={pricePerHour}
                          handleToggleSetting={handleToggleSetting}
                          onPriceChange={onStudioPriceChange}
                          onInputChange={onInputChange}
                          currency={currency}
                          setValue={setValue}
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
                  )}

                  {activeTab === 1 && <ChangePassword />}
                  {activeTab === 2 && <SocialLinks data={getProfileByRole(role as Role)} />}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
