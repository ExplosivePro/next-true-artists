import React from "react";
import clsx from "clsx";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import useStyles from "./styles";
import { useRouter } from "next/router";

export default function Attribute({ data, checked = false, onClick }: Props) {
  const classes = useStyles();
  const { push } = useRouter();

  const { title, subTitle, url, icon } = data;

  return (
    <List className={clsx(classes.list, { [classes.selectedList]: checked })}>
      <ListItem
        button
        onClick={() => {
          if (!checked) {
            onClick();
            push(url);
          }
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={title}
          secondary={
            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
              {subTitle}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          {checked ? <CheckCircleIcon className={classes.checkIcon} /> : <NavigateNextIcon />}
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

interface AttributeDetail {
  title: string;
  subTitle: string;
  url: string;
  icon: JSX.Element;
}

interface Props {
  data: AttributeDetail;
  checked?: boolean;
  onClick: () => void;
}
