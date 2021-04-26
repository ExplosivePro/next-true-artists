import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Grid, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import colors from "../../palette";
import CustomGallery from "../CustomGallery";

const styles = () =>
  createStyles({
    titleWrapper: {
      marginBottom: "20px",
    },
    viewAllTextWrapper: {
      marginLeft: "auto",
      color: colors.primaryColor,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    viewAllText: {
      color: colors.primaryColor,
      fontSize: "14px",
    },
  });

const useStyles = makeStyles(styles);

export default function Portfolio({ className, data }: Props) {
  const classes = useStyles();

  return (
    <Grid container className={clsx(className)}>
      <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.titleWrapper} alignItems={"center"}>
        <Typography variant={"h5"}>Portfolio</Typography>
        {data.length === 0 && (
          <Grid container alignItems={"center"} justify={"center"}>
            <Typography> Studio does not have any portfolio yet </Typography>
          </Grid>
        )}

        {data.length > 0 && (
          <div className={classes.viewAllTextWrapper}>
            <Typography className={classes.viewAllText} display={"inline"}>
              View All
            </Typography>
            <NavigateNextIcon />
          </div>
        )}
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <CustomGallery tattoos={data} />
      </Grid>
    </Grid>
  );
}

interface Props {
  className?: any;
  data: Resource.TattooDetail[];
}
