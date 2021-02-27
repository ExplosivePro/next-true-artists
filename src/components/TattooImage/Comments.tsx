import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Grid, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import colors from "../../palette";

const styles = () =>
  createStyles({
    root: {
      width: "100%",
    },
    titleWrapper: {
      marginBottom: "20px",
    },
    viewAllTextWrapper: {
      marginLeft: "auto",
      color: colors.bluePastel,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    viewAllText: {
      color: colors.bluePastel,
      fontSize: "14px",
    },
    reviewBlock: {
      display: "grid",
    },
    inline: {
      display: "inline",
      marginTop: "17px",
    },
    name: {
      fontWeight: "bold",
    },
    ratingStar: {
      color: colors.standardYellow,
      marginLeft: "-5px",
    },
    avatarWrapper: {
      paddingRight: "15px",
    },
    time: {
      marginTop: "15px",
      fontSize: "14px",
    },
    greyText: {
      color: colors.standardGreyBorder,
    },
    classItem: {
      paddingLeft: 0,
    },
  });

const useStyles = makeStyles(styles);

export default function Comments({ className, list = [] }: Props) {
  const classes = useStyles();

  return (
    <Grid container className={clsx(className)}>
      <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.titleWrapper} alignItems={"center"}>
        <Typography variant={"h6"}>Comments (2314)</Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <List className={classes.root}>
          {list.map((item, index) => {
            return (
              <ListItem alignItems="flex-start" key={index} className={classes.classItem}>
                <ListItemAvatar className={classes.avatarWrapper}>
                  <Avatar alt="Remy Sharp" src={item.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography className={classes.name}>{item.name}</Typography>}
                  secondary={
                    <div className={classes.reviewBlock}>
                      <Typography className={classes.inline} color="textPrimary">
                        {item.comment}
                      </Typography>

                      <Typography className={clsx(classes.time, classes.greyText)}>10 weeks ago</Typography>
                    </div>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}

interface Comment {
  name: string;
  rate: number;
  comment: string;
  avatar: string;
}

interface Props {
  className?: any;
  list: Comment[];
}
