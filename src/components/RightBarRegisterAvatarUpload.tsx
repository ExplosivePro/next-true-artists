// External
import React, { useEffect, useState } from "react";

// Material UI Components
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

// Custom component
import PrimaryButton from "./PrimaryButton";

// APIs
import { updateArtistAvatar, updateStudioAvatar } from "../api";

// Context
import { Role, useApp, User } from "../contexts";

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
      bottom: "50px",
      left: "50%",
      transform: "translate(-50%)",
      width: "70%",
    },
  }),
);

export default function RightBarRegisterAvatarUpload({
  currentUserId,
  currentData,
  onPreviousStep,
  onNext,
  role,
}: Props) {
  const app = useApp();
  const classes = useStyles();

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [fileData, setFileData] = useState<File | null>(currentData.fileData || null);
  const [preview, setPreview] = useState<any>(currentData.preview || "");

  useEffect(() => {
    setPreview(currentData.preview || "");
  }, [currentData]);

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
      if (role === "artist") {
        if (fileData) {
          // Call APIs to create studio profile
          const response = await updateArtistAvatar({
            id: currentUserId,
            file: fileData,
          });

          const { error, errors } = response;
          // No error happens
          if (!error) {
            onNext &&
              onNext({
                fileData,
                preview,
              });
          } else {
            app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
          }
        } else {
          // Skip to the next step
          onNext &&
            onNext({
              fileData,
              preview,
            });
        }
      }

      if (role === "studio") {
        if (fileData) {
          // Call APIs to create studio profile
          const response = await updateStudioAvatar({
            id: currentUserId,
            file: fileData,
          });

          const { error, errors } = response;
          // No error happens
          if (!error) {
            onNext &&
              onNext({
                fileData,
                preview,
              });
          } else {
            app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
          }
        } else {
          onNext &&
            onNext({
              fileData,
              preview,
            });
        }
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
            <Avatar className={classes.avatar} src={preview || ""} onClick={handleClick} />
          </Badge>
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

export const preloadRightBarRegisterAvatarUploadData = ({ role, artist, studio }: User) => {
  switch (role) {
    case Role.ARTIST: {
      return {
        file: null,
        preview: artist?.avatar?.image_url,
      };
    }

    case Role.STUDIO: {
      return {
        file: null,
        preview: studio?.avatar?.image_url,
      };
    }

    default: {
      return {
        file: null,
        preview: "",
      };
    }
  }
};

interface Props {
  role: string;
  currentUserId: number | undefined;
  currentData: any;
  onPreviousStep?: () => void;
  onNext?: (data: any) => void;
}
