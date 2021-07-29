// External import
import { useForm } from "react-hook-form";
import React from "react";
import * as yup from "yup";
import { useRouter } from "next/router";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";

// Custom Components UI
import PrimaryButton from "../../../components/PrimaryButton";
import FormInput from "../../../components/FormInput";

// Utils
import { useYupValidationResolver } from "../../../utils";

// Contexts
import { Role, useApp, useAuth } from "../../../contexts";

// APIs
import { editArtistProfile, editStudioProfile } from "../../../api";

// Styles
import useStyles from "./styles";

import { baseFacebookUrl, baseInstagramUrl, baseTwitterUrl } from "../../../constants";

export default function SocialLinks({ data }: { data: any }) {
  const classes = useStyles();
  const { showErrorDialog, showSuccessDialog } = useApp();
  const { website, facebook_url: facebook, instagram_url: instagram, twitter_url: twitter } = data;

  const { user: { role, artist, studio } = { email: "", full_name: "" }, updateUserData } = useAuth();
  const { push } = useRouter();

  const resolver = useYupValidationResolver(yup.object());
  const { control, handleSubmit, errors } = useForm({ resolver });

  // Submit edit profile for artist role
  const submitEditArtistProfile = async ({ website, facebook, instagram, twitter }: any) => {
    const editArtistResponse = await editArtistProfile({
      id: artist?.id as number,
      website,
      facebook_url: facebook ? `${baseFacebookUrl}${facebook}` : "",
      instagram_url: instagram ? `${baseInstagramUrl}${instagram}` : "",
      twitter_url: twitter ? `${baseTwitterUrl}${twitter}` : "",
    });

    // Show errors if there is any errors
    if (editArtistResponse.error) {
      showErrorDialog(true, "Error occured while updating your profile. Try again.");
    } else {
      showSuccessDialog(true, "Profile updated successfully");
      // Get new info
      updateUserData();
      // Back to dashboard
      push("/dashboard");
    }
  };

  // Submit edit profile for studio role
  const submitEditStudioProfile = async ({ instagram, website, facebook, twitter }: any) => {
    const editStudioResponse = await editStudioProfile({
      id: studio?.id as number,
      website,
      facebook_url: facebook ? `${baseFacebookUrl}${facebook}` : "",
      instagram_url: instagram ? `${baseInstagramUrl}${instagram}` : "",
      twitter_url: twitter ? `${baseTwitterUrl}${twitter}` : "",
    });

    // Show errors if there is any errors
    if (editStudioResponse.error) {
      showErrorDialog(true, "Error occured while updating your profile. Try again.");
    } else {
      showSuccessDialog(true, "Profile updated successfully");
      // Get new info
      updateUserData();
      // Back to dashboard
      push("/dashboard");
    }
  };

  // Submit the form
  const onSubmit = async (data: any) => {
    // Submit by role
    switch (role) {
      case Role.ARTIST: {
        submitEditArtistProfile(data);
        break;
      }

      case Role.STUDIO: {
        submitEditStudioProfile(data);
        break;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <FormInput
            name="instagram"
            classes={{ root: classes.formInput }}
            label={"Instagram"}
            id="instagram"
            placeholder={"Instagram"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={instagram?.replace("instagram.com/", "") || ""}
            errors={errors.instagram}
            InputProps={{
              startAdornment: <InputAdornment position="start">{baseInstagramUrl}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
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
        <Grid item lg={6} md={6} xs={12}>
          <FormInput
            name="facebook"
            classes={{ root: classes.formInput }}
            label={"Facebook"}
            id="facebook"
            placeholder={"Facebook"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={facebook?.replace("facebook.com/", "") || ""}
            errors={errors.facebook}
            InputProps={{
              startAdornment: <InputAdornment position="start">{baseFacebookUrl}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <FormInput
            name="twitter"
            classes={{ root: classes.formInput }}
            label={"Twitter"}
            id="twitter"
            placeholder={"Twitter"}
            fullWidth
            control={control}
            variant={"outlined"}
            defaultValue={twitter?.replace("twitter.com/", "") || ""}
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
          <PrimaryButton type={"submit"} variant="contained" color="primary" size="large" fullWidth primaryColor>
            Save
          </PrimaryButton>
        </Grid>
      </Grid>
    </form>
  );
}

export const titleHeader = {
  title: "Social Profiles",
  subTitle: "Add elsewhere links to your profile",
};
