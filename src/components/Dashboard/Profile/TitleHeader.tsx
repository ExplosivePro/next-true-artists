import { Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

export default function TitleHeader({ data }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.barDescriptionTitleWrapper}>
      <Typography variant={"h6"} display={"block"}>
        {data.title}
      </Typography>
      <Typography variant={"caption"} display={"block"}>
        {data.subTitle}
      </Typography>
    </div>
  );
}

interface Data {
  title: string;
  subTitle: string;
}

interface Props {
  data: Data;
}
