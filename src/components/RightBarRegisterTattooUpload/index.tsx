// External
import React, { useState } from "react";

// Material UI Components
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

// Custom component
import Tattoos, { Image } from "./Tattoos";
import PrimaryButton from "../PrimaryButton";

import { uploadTattoos, updateTattoos } from "../../api";

// Context
import { useApp } from "../../contexts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        height: "calc(100vh - 150px)",
        position: "relative",
      },
    },
    titleText: {
      fontWeight: 600,
      marginBottom: "10px",
    },
    titleWrapper: {
      marginBottom: "25px",
    },
    formWrapper: {
      width: "100%",
      height: "100%",
    },
    avatar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    fileInput: {
      visibility: "hidden",
      width: 0,
    },
    buttonWrapper: {
      // position: "absolute",
      // bottom: "40px",
      // left: "50%",
      // transform: "translate(-50%)",
      padding: "50px 0",
      width: "100%",
      margin: 0,
    },
  }),
);

export default function RightBarRegisterTattooUpload({ role, currentUserId, onPreviousStep, onNext }: Props) {
  const app = useApp();
  const classes = useStyles();

  const [tattoos, setTattoos] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  const uploadImages = async (tattoos: Image[]) => {
    if (currentUserId) {
      const formData = new FormData();
      const metaData: any[] = [];

      // Add all images into formData
      tattoos.map((tattoo) => {
        formData.append("images[]", tattoo.file);
        metaData.push({
          placement: tattoo.placement,
          workplace: tattoo.workplace,
          color: tattoo.color,
          caption: tattoo.caption,
          featured: tattoo.featured,
        });
      });

      formData.append("meta_data", JSON.stringify(metaData));

      const response = await uploadTattoos(formData);

      const { error, errors, data } = response;
      // No error happens
      if (!error) {
        return data;
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Upload fail");
      }
    } else {
      app.showErrorDialog(true, "Upload fail");
    }
  };

  const handleUploadImage = async (data: any) => {
    const rs = await uploadImages(data);

    if (rs) {
      rs.results.map((image: any, index: number) => {
        // Attach id to existing file
        if (data[index].file.name === image.body.image.name) {
          data[index].id = image.body.id;
        }
      });
      setTattoos([...tattoos, ...data]);
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
    const response = await updateTattoos(currentUserId as number, tattooId, payload, role);

    const { error, errors, data } = response;
    // No error happens
    if (!error) {
      app.showSuccessDialog(true, "Update successfully");

      // Mark this tattoo image info is already saved
      const tattooDetail = tattoos[index];
      tattooDetail["saved"] = true;

      // Simply remove old object then add the new item
      setTattoos([...tattoos.slice(0, index), tattooDetail, ...tattoos.slice(index + 1)]);

      return data;
    } else {
      app.showErrorDialog(true, errors ? errors.toString() : "Upload fail");
    }
  };

  const goNext = async () => {
    onNext && onNext();
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            {"Upload Images of Your Work"}
          </Typography>
          <Typography>
            Upload a minimum of 5 images of your best tattoo artwork in order to complete your profile and to be
            approved. Make sure to fill out all the info for each image in order to show up in as many search results as
            possible. These photos will also be posted on your public profile.
          </Typography>
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
          />
        </Grid>

        <Grid container item justify={"center"} alignItems={"center"} className={classes.buttonWrapper} spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <PrimaryButton
              type={"button"}
              variant="outlined"
              color="primary"
              size="large"
              primaryColor
              fullWidth
              onClick={onPreviousStep}
            >
              Previous Step
            </PrimaryButton>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <PrimaryButton
              onClick={goNext}
              type={"button"}
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              primaryColor
            >
              Next
            </PrimaryButton>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

interface Props {
  role: string;
  currentUserId: number | undefined;
  currentData: any;
  onPreviousStep?: () => void;
  onNext?: () => void;
}
