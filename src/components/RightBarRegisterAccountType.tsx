// External
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

// Material UI Components
import color from "../palette";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles({
  root: {
    height: "100%",
    position: "relative",
  },
  titleText: {
    fontWeight: 500,
  },
  titleWrapper: {
    marginBottom: "72px",
  },
  cardHeader: {
    borderRadius: "16px",
    boxShadow: "0 3px 10px 2px rgb(138 138 138 / 15%)",
    backgroundColor: color.white,
    marginBottom: "32px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: color.brightBlue,
    },
  },
  descriptionText: {
    color: color.standardGrey,
  },
  cardImage: {
    maxWidth: "53%",
  },
  avatar: {
    backgroundColor: color.brightBlue,
    border: `solid 1px ${color.bluePastel}`,
    "&:hover": {
      backgroundColor: color.standardYellow,
    },
  },
});

export default function RightBarRegisterAccountType() {
  const classes = useStyles();

  const OperationCard = ({ name, description, imageUrl }: { name: string; description: string; imageUrl: string }) => {
    return (
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img className={classes.cardImage} src={imageUrl} alt={name} />
          </Avatar>
        }
        action={
          <IconButton aria-label="next">
            <ArrowForwardIcon />
          </IconButton>
        }
        title={
          <Typography>
            <b>{name}</b>
          </Typography>
        }
        subheader={<Typography className={classes.descriptionText}>{description}</Typography>}
        classes={{ root: classes.cardHeader }}
      />
    );
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            What type of account would you like to create?
          </Typography>
          <Typography variant={"subtitle2"}>
            Nullam et dui feugiat porta velit non imperdiet leo. Ut hendrerit purus vel velit dictum
          </Typography>
        </div>
        <OperationCard
          name={"Artist"}
          description={"Join as an artist to have your own account."}
          imageUrl={"/images/icons/artist.svg"}
        />
        <OperationCard
          name={"Studio"}
          description={"Join as a studio to manage a studio account and add multiple artist accounts."}
          imageUrl={"/images/icons/studio.svg"}
        />
      </div>
    </Grid>
  );
}
