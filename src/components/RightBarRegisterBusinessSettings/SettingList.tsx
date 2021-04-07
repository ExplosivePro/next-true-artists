import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";

import colors from "../../palette";

const useStyles = makeStyles({
  root: {
    marginBottom: "35px",
    marginLeft: "-15px",
  },
  groupName: {
    color: colors.black,
    fontSize: "16px",
    fontWeight: "bold",
  },
  listSubHeader: {
    marginBottom: "10px",
  },
  title: {
    color: colors.black,
    fontWeight: 500,
  },
  subTitle: {
    color: colors.standardGreyBorder,
  },
  listItem: {
    cursor: "pointer",
    paddingTop: "15px",
    paddingBottom: "15px",
  },
});

const SettingList = ({ id, groupName, items }: Props) => {
  const classes = useStyles();

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader className={classes.listSubHeader} disableSticky={true}>
          {<Typography className={classes.groupName}>{groupName}</Typography>}
        </ListSubheader>
      }
    >
      {items.map(({ title, subTitle }, index) => {
        return (
          <ListItem key={index} divider={true} className={classes.listItem}>
            <ListItemText
              id={id}
              primary={<Typography className={classes.title}>{title}</Typography>}
              secondary={<Typography className={classes.subTitle}>{subTitle}</Typography>}
            />
            <ListItemSecondaryAction>
              <Switch edge="end" inputProps={{ "aria-labelledby": id }} />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

interface Setting {
  title: string;
  subTitle: string;
}

interface Props {
  id: string;
  groupName: string;
  items: Setting[];
}

export default SettingList;
