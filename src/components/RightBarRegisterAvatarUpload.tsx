// External
import React, { useState } from "react";

// Material UI Components
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

// Custom component
import PrimaryButton from "./PrimaryButton";

import { updateArtistAvatar } from "../api";

// Context
import { useApp } from "../contexts";

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
      marginBottom: "72px",
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
      cursor: "pointer",
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

export default function RightBarRegisterAvatarUpload({ currentUserId, onPreviousStep, onNext, role }: Props) {
  const app = useApp();
  const classes = useStyles();

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [fileData, setFileData] = useState<File | null>();
  const [preview, setPreview] = useState<any>("");

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

  const goNext = async () => {
    if (currentUserId) {
      // Call APIs to create studio profile
      const response = await updateArtistAvatar({
        id: currentUserId,
        file: fileData,
      });

      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        onNext &&
          onNext(data.id, {
            fileData,
            preview,
          });
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
            {role === "artist" ? "Upload avatar" : "Upload logo"}
          </Typography>
          <Typography>Stand out from the crowd. Upload your {role === "artist" ? "avatar" : "logo"}</Typography>
        </div>

        <Grid container item justify={"center"}>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <IconButton onClick={handleClick}>
                <EditIcon />
              </IconButton>
            }
          >
            <input className={classes.fileInput} type={"file"} ref={hiddenFileInput} onChange={handleChange} />
            <Avatar className={classes.avatar} src={preview || "/broken-image.jpg"} onClick={handleClick} />
          </Badge>
        </Grid>

        <Grid container item justify={"center"} alignItems={"center"} className={classes.buttonWrapper} spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <PrimaryButton
              type={"button"}
              variant="outlined"
              color="primary"
              size="large"
              bluePastel
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
              bluePastel
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
  onNext?: (userId: number, data: any, token?: string) => void;
}
