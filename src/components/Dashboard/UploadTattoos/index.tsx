// External
import React, { useEffect, useState } from "react";
import clsx from "clsx";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";

// Custom component
import PrimaryButton from "../../PrimaryButton";
import Tattoos, { Image } from "../../../components/RightBarRegisterTattooUpload/Tattoos";

import { deleteTattooByRole, updateTattoos, uploadTattoos, getTattooDetail, editTattoos } from "../../../api";

// Context
import { useApp, useAuth, Role } from "../../../contexts";
import { useRouter } from "next/router";

// Styles
import useStyles from "./styles";

export default function UploadTattoos({ id }: Props) {
  const app = useApp();
  const { user: { role } = { role: Role.REGULAR }, getRoleId, updateUserData } = useAuth();
  const { push, query } = useRouter();

  const classes = useStyles();

  const [currentUserId] = useState(getRoleId());
  const [tattoos, setTattoos] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  const editMode = !isNaN(id as number);

  const uploadImages = async (tattooImages: Image[]) => {
    const formData = new FormData();

    // Create the new one
    if (isNaN(id as number)) {
      const metaData: any[] = [];

      // Add all images into formData
      tattooImages.map((tattoo) => {
        formData.append("images[]", tattoo.file);
        metaData.push({
          placement: tattoo.placement,
          workplace: tattoo.workplace,
          style_id: tattoo.style,
          caption: tattoo.caption,
          featured: tattoo.featured,
        });
      });

      formData.append("meta_data", JSON.stringify(metaData));

      const response = await uploadTattoos(formData);

      const { error, errors, data } = response;
      // No error happens
      if (!error) {
        // Get updated user data
        updateUserData();

        return data;
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Image upload failed. Try again");
      }
    } else {
      formData.append("image", tattooImages[0].file);
      formData.append("placement", tattoos[0].placement);
      formData.append("workplace", tattoos[0].workplace);
      formData.append("style_id", JSON.stringify(tattoos[0].style));
      formData.append("caption", tattoos[0].caption);
      formData.append("featured", tattoos[0].featured.toString());

      // Edit
      const response = await editTattoos(currentUserId as number, query.id as string, role, formData);

      const { error, errors, data } = response;
      // No error happens
      if (!error) {
        // Get updated user data
        updateUserData();

        return data;
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Image update failed. Try again");
      }
    }
  };

  const handleUploadImage = async (data: any) => {
    const rs = await uploadImages(data);

    if (rs) {
      if (editMode) {
        push("/dashboard/gallery");
      } else {
        rs.results.map((image: any, index: number) => {
          // Attach id to existing file
          if (data[index].file.name === image.body.image.name) {
            data[index].id = image.body.id;
          }
        });
        setTattoos([...tattoos, ...data]);
      }
    }

    // Hide loading
    setLoading(false);
  };

  const onFieldsChange = (index: number, name: string, value: any) => {
    const tattooDetail = tattoos[index];

    tattooDetail[name] = value;

    // Simply remove old object then add the new item
    setTattoos([...tattoos.slice(0, index), tattooDetail, ...tattoos.slice(index + 1)]);
  };

  // On tattoos update
  const onUpdate = async (tattooId: number, payload: any, index: number) => {
    let queryRole = "artist";

    if (role === Role.STUDIO) {
      queryRole = "studio";
    }

    const response = await updateTattoos(currentUserId as number, tattooId, payload, queryRole);

    const { error, errors, data } = response;
    // No error happens
    if (!error) {
      app.showSuccessDialog(true, "Updated successfully");

      // Mark this tattoo image info is already saved
      const tattooDetail = tattoos[index];
      tattooDetail["saved"] = true;

      // Simply remove old object then add the new item
      setTattoos([...tattoos.slice(0, index), tattooDetail, ...tattoos.slice(index + 1)]);

      // In edit mode, back to gallery
      if (editMode) {
        push("/dashboard/gallery");
      }

      return data;
    } else {
      app.showErrorDialog(true, errors ? errors.toString() : "We are not able to upload your photos. Try again");
    }
  };

  // On tattoos delete
  const onDelete = async (tattooId: number) => {
    const response = await deleteTattooByRole(currentUserId as number, role, tattooId);

    const { error, errors, data } = response;
    // No error happens
    if (!error) {
      setTattoos(tattoos.filter((tattoo) => tattoo.id !== tattooId));
      // In edit mode, back to gallery
      if (editMode) {
        push("/dashboard/gallery");
      }
      return data;
    } else {
      app.showErrorDialog(true, errors ? errors.toString() : "Remove fail");
    }
  };

  const getImageDetail = async (id: string) => {
    const { data } = await getTattooDetail(currentUserId as number, id, role);

    setTattoos([data]);
  };

  useEffect(() => {
    // Get detail if currently edtting tattoos
    if (query.id) {
      getImageDetail(query.id as string);
    }
  }, [query.id]);

  return (
    <Grid
      container
      className={clsx(classes.root, { [classes.rootWithoutContent]: tattoos.length === 0 })}
      alignItems={"center"}
      justify={"center"}
    >
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            {!editMode ? "Upload tattoos photos showcasing your work" : "Edit Image"}
          </Typography>
          {!editMode && (
            <Typography>
              Upload your tattoo work to showcase your skills and share your portfolio with the community.
            </Typography>
          )}
        </div>

        <Grid container>
          <Tattoos
            data={tattoos}
            addImage={handleUploadImage}
            loading={loading}
            onSetLoading={(value) => {
              setLoading(value);
            }}
            onChange={onFieldsChange}
            onUpdate={onUpdate}
            onDelete={onDelete}
            editMode={editMode}
          />
        </Grid>

        {!editMode && (
          <Grid container item justify={"center"} alignItems={"center"} className={classes.buttonWrapper} spacing={2}>
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
                Back
              </PrimaryButton>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <PrimaryButton
                onClick={() => {
                  push("/dashboard/gallery");
                }}
                type={"button"}
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                primaryColor
              >
                Done
              </PrimaryButton>
            </Grid>
          </Grid>
        )}
      </div>
    </Grid>
  );
}

interface Props {
  id?: number;
}
