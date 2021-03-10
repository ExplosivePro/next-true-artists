// @ts-ignore
import Gallery from "react-grid-gallery";
import React, { useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Grid, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import colors from "../../palette";

const styles = () =>
  createStyles({
    titleWrapper: {
      marginBottom: "20px",
    },
    viewAllTextWrapper: {
      marginLeft: "auto",
      color: colors.bluePastel,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    viewAllText: {
      color: colors.bluePastel,
      fontSize: "14px",
    },
  });

const useStyles = makeStyles(styles);

const generateImageList = (list: Resource.Image[]) => {
  const imageList: Resource.Tattoos[] = [];

  list.map((image) => {
    imageList.push({
      src: image.image_url,
      thumbnail: image.image_url,
      thumbnailWidth: 320,
      thumbnailHeight: 183,
    });
  });

  return imageList;
};

export default function Portfolio({ className, data }: Props) {
  const classes = useStyles();
  const [images] = useState(generateImageList(data));

  return (
    <Grid container className={clsx(className)}>
      <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.titleWrapper} alignItems={"center"}>
        <Typography variant={"h5"}>Portfolio</Typography>
        {images.length === 0 && (
          <Grid container alignItems={"center"} justify={"center"}>
            <Typography> No Data </Typography>
          </Grid>
        )}

        {images.length > 0 && (
          <div className={classes.viewAllTextWrapper}>
            <Typography className={classes.viewAllText} display={"inline"}>
              View All
            </Typography>
            <NavigateNextIcon />
          </div>
        )}
      </Grid>
      {images.length > 0 && (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Gallery images={images} enableImageSelection={false} showCloseButton={false} />
        </Grid>
      )}
    </Grid>
  );
}

interface Props {
  className?: any;
  data: Resource.Image[];
}
