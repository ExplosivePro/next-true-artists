// External
import React, { useState } from "react";

// Material UI Components
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

// Custom component
import PrimaryButton from "../PrimaryButton";
import Tattoos, { Image } from "./Tattoos";

import { uploadTattoos } from "../../api";

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
      width: "70%",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
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
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translate(-50%)",
      width: "70%",
    },
  }),
);

export default function RightBarRegisterTattooUpload({ currentUserId, onPreviousStep, onNext }: Props) {
  const app = useApp();
  const classes = useStyles();

  const [tattoos, setTattoos] = useState<Image[]>([]);

  const handleUploadImage = (data: any) => {
    setTattoos([...tattoos, data]);
  };

  const goNext = async () => {
    if (currentUserId) {
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
        onNext && onNext();
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
      }
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
