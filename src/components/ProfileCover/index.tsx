import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import PrimaryButton from "../PrimaryButton";

import colors from "../../palette";

import { defaultArtistBannerImage } from "../../constants";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
      height: "233px",
    },
    name: {
      fontWeight: "bold",
      marginTop: "12px",
    },
    avatarWrapper: {
      position: "absolute",
      bottom: "-50%",
      left: "7%",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    avatar: {
      width: "150px",
      height: "150px",
      padding: "5px",
      backgroundColor: colors.white,
      borderRadius: "50%",
      "& .MuiAvatar-img": {
        borderRadius: "50%",
      },
      [theme.breakpoints.down("md")]: {
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    bookButton: {
      position: "absolute",
      bottom: "15px",
      right: "15px",
      [theme.breakpoints.down("md")]: {
        top: "15px",
        bottom: "unset",
      },
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "16px",
    },
    blankAvatar: {
      backgroundColor: colors.borderGrey,
    },
  });

const useStyles = makeStyles(styles);

export default function ProfileCover({ data: { avatar, hero_banner, name } }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src={hero_banner ? hero_banner.image_url : defaultArtistBannerImage}
        className={classes.backgroundImage}
        alt={"cover"}
      />
      <div className={classes.avatarWrapper}>
        <Avatar
          alt={name}
          src={avatar?.image_url}
          className={clsx(classes.avatar, { [classes.blankAvatar]: !avatar })}
        />
        <Typography className={classes.name} variant={"h6"}>
          {name}
        </Typography>
      </div>

      <PrimaryButton variant="contained" color="primary" size="large" primaryColor className={classes.bookButton}>
        Book Appointment
      </PrimaryButton>
    </div>
  );
}

interface Props {
  data: Resource.ArtistDetail;
}
