// External
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// Material UI Components
import Button from "@material-ui/core/Button";

import colors from "../palette";

const useStyles = makeStyles({
  root: {
    textTransform: "none",
  },
  blackStyle: {
    color: colors.white,
    backgroundColor: colors.black,
  },
  blackOutlineStyle: {
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    "&:hover": {
      borderColor: colors.black,
      backgroundColor: colors.lightGrey,
      color: colors.black,
    },
  },
});

export default function PrimaryButton(props: any) {
  const classes = useStyles();
  const propsValue = { ...props };

  // Remove invalid prop of material component
  if (props.blackStyle) {
    delete propsValue.blackStyle;
  }

  return (
    <Button
      {...propsValue}
      className={clsx(classes.root, props.className, {
        [classes.blackStyle]: props.blackStyle,
        [classes.blackOutlineStyle]: props.variant === "outlined" && props.blackStyle,
      })}
    >
      {props && props.children}
    </Button>
  );
}
