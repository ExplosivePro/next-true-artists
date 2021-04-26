import React from "react";

import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import { Typography } from "@material-ui/core";

import { defaultArtistBannerImage } from "../../../constants";
import useStyles from "./styles";

export default function Cover() {
  const classes = useStyles();

  return (
    <div className={classes.coverWrapper}>
      <img src={defaultArtistBannerImage} alt={"cover"} />
      <a className={classes.changeCoverButton}>
        <CameraAltOutlinedIcon />
        <Typography>Change Cover</Typography>
      </a>
    </div>
  );
}
