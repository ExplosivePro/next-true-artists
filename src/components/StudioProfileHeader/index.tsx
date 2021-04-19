import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import PrimaryButton from "../PrimaryButton";
import CardHeader from "@material-ui/core/CardHeader";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import colors from "../../palette";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    cardHeader: {
      width: "100%",
      "& .MuiCardHeader-content": {
        paddingRight: "20px",
      },
      alignSelf: "center",
      "& .MuiCardHeader-action": {
        alignSelf: "center",
        marginTop: 0,
      },
    },
    buttonWrapper: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    buttonWrapperMobile: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
    operationButton: {
      marginLeft: "10px",
      width: "160px",
    },
    icon: {
      color: `${colors.standardYellow} !important`,
    },
    rateText: {
      fontSize: "14px",
      marginLeft: "7px",
    },
    colorGrey: {
      color: colors.standardGrey,
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

export default function StudioProfileHeader({ data: { avatar, name, rating, totalRating } }: Props) {
  const classes = useStyles();

  return (
    <Grid container item lg={12} md={12} sm={12} xs={12}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={avatar.image_url} className={classes.avatar} />}
        action={
          <div className={classes.buttonWrapper}>
            <PrimaryButton
              variant="outlined"
              color="primary"
              size="small"
              primaryColor
              className={classes.operationButton}
            >
              Save
            </PrimaryButton>
            <PrimaryButton
              variant="contained"
              color="primary"
              size="small"
              primaryColor
              className={classes.operationButton}
            >
              Book
            </PrimaryButton>
          </div>
        }
        title={
          <Typography>
            <b>{name}</b>
          </Typography>
        }
        subheader={
          <Grid container alignItems={"center"}>
            <StarIcon className={classes.icon} />
            <Typography className={classes.rateText} display={"inline"}>
              <b>{Number(rating || 0).toFixed(1)}</b> <span className={classes.colorGrey}>({totalRating || 0})</span>
            </Typography>
          </Grid>
        }
        className={classes.cardHeader}
      />
      <Grid container item justify={"center"} className={classes.buttonWrapperMobile}>
        <PrimaryButton variant="outlined" color="primary" size="small" primaryColor className={classes.operationButton}>
          Save
        </PrimaryButton>
        <PrimaryButton
          variant="contained"
          color="primary"
          size="small"
          primaryColor
          className={classes.operationButton}
        >
          Book
        </PrimaryButton>
      </Grid>
    </Grid>
  );
}

interface Props {
  data: Resource.StudioDetail;
}
