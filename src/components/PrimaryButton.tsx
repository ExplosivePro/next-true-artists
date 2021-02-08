// External
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// Material UI Components
import Button, { ButtonProps } from "@material-ui/core/Button";

import colors from "../palette";

type CustomButtonProps = ButtonProps & { bluePastel?: boolean; yellow?: boolean };

const useStyles = makeStyles({
  root: {
    textTransform: "none",
    boxShadow: "none",
  },
  bluePastelStyle: {
    color: colors.white,
    backgroundColor: colors.bluePastel,
    "&:hover": {
      backgroundColor: colors.darkBluePastel,
    },
  },
  bluePastelOutlineStyle: {
    borderColor: colors.bluePastel,
    backgroundColor: colors.white,
    color: colors.bluePastel,
    "&:hover": {
      borderColor: colors.bluePastel,
      backgroundColor: colors.lightGrey,
      color: colors.bluePastel,
    },
  },
  yellowStyle: {
    color: colors.white,
    backgroundColor: colors.standardYellow,
    "&:hover": {
      backgroundColor: colors.darkYellow,
    },
  },
  yellowOutlineStyle: {
    borderColor: colors.standardYellow,
    backgroundColor: colors.white,
    color: colors.standardYellow,
    "&:hover": {
      borderColor: colors.standardYellow,
      backgroundColor: colors.lightGrey,
      color: colors.standardYellow,
    },
  },
});

export default function PrimaryButton(props: CustomButtonProps) {
  const classes = useStyles();
  const customPropsValue = { ...props };

  // Remove invalid prop of material component
  delete customPropsValue.bluePastel;

  return (
    <Button
      {...customPropsValue}
      className={clsx(classes.root, props.className, {
        [classes.bluePastelStyle]: props.bluePastel,
        [classes.bluePastelOutlineStyle]: props.variant === "outlined" && props.bluePastel,
        [classes.yellowStyle]: props.yellow,
        [classes.yellowOutlineStyle]: props.variant === "outlined" && props.yellow,
      })}
    >
      {props && props.children}
    </Button>
  );
}
