// External
import React, { useState } from "react";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";

// Custom component
import PrimaryButton from "../../PrimaryButton";
import Tattoos, { Image } from "../../../components/RightBarRegisterTattooUpload/Tattoos";

import { uploadTattoos } from "../../../api";

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

  const handleUploadImage = (data: any) => {
    setTattoos([...tattoos, data]);
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
          <Tattoos data={tattoos} addImage={handleUploadImage} />
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
