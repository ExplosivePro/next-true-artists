import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import PrimaryButton from "../PrimaryButton";
import Avatar from "@material-ui/core/Avatar";

import colors from "../../palette";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
      height: "233px",
    },
    avatar: {
      position: "absolute",
      bottom: "-30%",
      left: "7%",
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
  });

const useStyles = makeStyles(styles);

export default function ProfileCover() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={"/images/cover.png"} className={classes.backgroundImage} alt={"cover"} />
      <Avatar alt="Remy Sharp" src="/images/james.png" className={classes.avatar} />
      <PrimaryButton variant="contained" color="primary" size="large" bluePastel className={classes.bookButton}>
        Book Appointment
      </PrimaryButton>
    </div>
  );
}
