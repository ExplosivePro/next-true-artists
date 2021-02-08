// External import
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import StarIcon from "@material-ui/icons/Star";
import Chip from "@material-ui/core/Chip";

// Custom Components
import colors from "../../palette";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    backgroundColor: colors.white,
  },
  icon: {
    color: `${colors.standardYellow} !important`,
  },
});

export default function CardCarouselsItem({ text }: Props) {
  const classes = useStyles();

  return <Chip size={"small"} avatar={<StarIcon className={classes.icon} />} label={text} className={classes.root} />;
}
interface Props {
  text: any;
}
