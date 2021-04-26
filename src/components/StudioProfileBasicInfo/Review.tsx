import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Grid, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import StarRateIcon from "@material-ui/icons/StarRate";

import colors from "../../palette";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    titleWrapper: {
      marginBottom: "20px",
    },
    viewAllTextWrapper: {
      marginLeft: "auto",
      color: colors.primaryColor,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    viewAllText: {
      color: colors.primaryColor,
      fontSize: "14px",
    },
    reviewBlock: {
      marginTop: "10px",
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
      paddingRight: "40px",
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  });

const useStyles = makeStyles(styles);

export default function Review({ className, list = [] }: Props) {
  const classes = useStyles();

  // Calculate star base on rate number
  const getRatingStar = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= rate; i++) {
      stars.push(<StarRateIcon key={i} />);
    }

    return stars;
  };

  return (
    <Grid container className={clsx(className)}>
      <Grid container item lg={12} md={12} sm={12} xs={12} className={classes.titleWrapper} alignItems={"center"}>
        <Typography variant={"h5"}>Review (2314)</Typography>
        <div className={classes.viewAllTextWrapper}>
          <Typography className={classes.viewAllText} display={"inline"}>
            View All
          </Typography>
          <NavigateNextIcon />
        </div>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <List className={classes.root}>
          {list.map((item, index) => {
            return (
              <ListItem alignItems="flex-start" key={index}>
                <ListItemAvatar className={classes.avatarWrapper}>
                  <Avatar alt="Remy Sharp" src={item.avatar?.image_url} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography className={classes.name}>{item.name}</Typography>}
                  secondary={
                    <span className={classes.reviewBlock}>
                      <span className={classes.ratingStar}>{getRatingStar(item.rate)}</span>
                      <Typography component={"span"} className={classes.inline} color="textPrimary">
                        {item.comment}
                      </Typography>
                    </span>
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

interface Props {
  className?: any;
  list: Resource.Review[];
}
