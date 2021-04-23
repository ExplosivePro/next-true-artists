// External
import React, { useState } from "react";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";

// Custom component
import PrimaryButton from "../../PrimaryButton";
import Tattoos, { Image } from "../../../components/RightBarRegisterTattooUpload/Tattoos";

import { updateTattoos, uploadTattoos } from "../../../api";

// Context
import { useApp } from "../../../contexts";
import { useRouter } from "next/router";

// Styles
import useStyles from "./styles";

export default function UploadTattoos() {
  const app = useApp();
  const { push } = useRouter();

  const classes = useStyles();

  const [tattoos, setTattoos] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

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
  const onUpdate = async (tattooId: number, payload: any) => {
    const response = await updateTattoos(currentUserId as number, tattooId, payload, role);

    const { error, errors, data } = response;
    // No error happens
    if (!error) {
      app.showSuccessDialog(true, "Update successfully");
      return data;
    } else {
      app.showErrorDialog(true, errors ? errors.toString() : "Upload fail");
    }
  };

  const goNext = async () => {
    const formData = new FormData();
    const metaData: any[] = [];

    // Add all images into formData
    tattoos.map((tattoo) => {
      formData.append("images[]", tattoo.file);
      metaData.push({
        placement: tattoo.placement,
        workplace: tattoo.workplace,
      });
    });

    formData.append("meta_data", JSON.stringify(metaData));

    const response = await uploadTattoos(formData);

    const { error, errors } = response;
    // No error happens
    if (!error) {
      app.showSuccessDialog(true, "Upload tattoos successfully");

      // Back to dashboard
      push("/dashboard");
    } else {
      app.showErrorDialog(true, errors ? errors.toString() : "Upload tattoos fail");
    }
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            {"Upload Images of Your Work"}
          </Typography>
          <Typography>Upload your work to showcase your skills and share your portfolio with the community.</Typography>
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
              onClick={() => {
                push("/dashboard");
              }}
            >
              Cancel
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
