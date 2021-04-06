import clsx from "clsx";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Typography } from "@material-ui/core";

import color from "../../palette";

const useStyles = makeStyles({
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
  cardSelected: {
    backgroundColor: color.brightBlue,
  },
  avatarSelected: {
    backgroundColor: color.standardYellow,
  },
  arrowIcon: {
    color: color.standardBlack,
  },
});

export default function OperationCard({
  name,
  description,
  imageUrl,
  selected = false,
  onSelect,
  onNext,
}: {
  name: string;
  description: string;
  imageUrl: string;
  selected: boolean;
  onSelect: () => void;
  onNext?: () => void;
}) {
  const classes = useStyles();

  return (
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={clsx(classes.avatar, { [classes.avatarSelected]: selected })}>
          <img className={classes.cardImage} src={imageUrl} alt={name} />
        </Avatar>
      }
      action={
        <IconButton aria-label="next" onClick={onNext}>
          <ArrowForwardIcon className={classes.arrowIcon} />
        </IconButton>
      }
      title={
        <Typography>
          <b>{name}</b>
        </Typography>
      }
      subheader={<Typography className={classes.descriptionText}>{description}</Typography>}
      className={clsx(classes.cardHeader, { [classes.cardSelected]: selected })}
      onClick={onSelect}
    />
  );
}
