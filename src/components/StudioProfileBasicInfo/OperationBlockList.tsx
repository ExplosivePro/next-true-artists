import React from "react";
import clsx from "clsx";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import OperationBlock from "./OperationBlock";

const styles = () =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
  });

const useStyles = makeStyles(styles);

export default function OperationBlockList(props: Props) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      {props.list.map((item, index) => {
        return <OperationBlock icon={item.icon} name={item.name} key={index} />;
      })}
    </div>
  );
}

interface OperationBlock {
  icon: string;
  name: string;
}

interface Props {
  className?: any;
  list: OperationBlock[];
}
