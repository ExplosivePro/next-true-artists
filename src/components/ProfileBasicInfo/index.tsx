import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Material UI
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ListItemText from "@material-ui/core/ListItemText";
import RoomIcon from "@material-ui/icons/Room";
import { Grid, List } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import colors from "../../palette";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: "30%",
      [theme.breakpoints.down("md")]: {
        paddingLeft: 0,
        marginTop: "120px",
        justifyContent: "center",
      },
    },
    chipContainer: {
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
      },
    },
    buttonList: {
      display: `flex`,
      justifyContent: `space-between`,
      marginBottom: "25px",
    },
    itemText: {
      whiteSpace: "nowrap",
      "& .MuiTypography-root": {
        fontSize: "14px",
        color: colors.standardGreyBorder,
      },
    },
    icon: {
      color: colors.black,
    },
    listItemIcon: {
      minWidth: "35px",
    },
    yellowChip: {
      backgroundColor: colors.chipYellow,
      color: colors.white,
      cursor: "pointer",
      fontSize: "14px",
    },
    violetChip: {
      color: colors.standardViolet,
      border: `solid 1px ${colors.standardViolet}`,
      backgroundColor: colors.white,
      cursor: "pointer",
      fontSize: "14px",
    },
  });

const useStyles = makeStyles(styles);

export default function ProfileBasicInfo({ data }: Props) {
  const classes = useStyles();

  return (
    <Grid container alignItems={"center"} className={classes.root}>
      <List component="nav" aria-labelledby="main navigation" className={classes.buttonList}>
        <ListItem>
          <ListItemIcon className={classes.listItemIcon}>
            <BusinessCenterIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Taiko Gallery" className={classes.itemText} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <RoomIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography>
                {data.street_address}
                {`${data.city ? `, ${data.city}` : ""}`}
              </Typography>
            }
            className={classes.itemText}
          />
        </ListItem>
      </List>
      <Grid container alignItems={"center"} spacing={1} className={classes.chipContainer}>
        <Grid item>
          <Chip label="Styles:" className={classes.yellowChip} />
        </Grid>
        {data.styles &&
          data.styles.map((style, index) => {
            return (
              <Grid item key={index}>
                <Chip label={style.name} className={classes.violetChip} />
              </Grid>
            );
          })}
        {(!data.styles || data.styles.length === 0) && (
          <Grid item>
            <Chip label={"None"} className={classes.violetChip} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

interface Props {
  data: Resource.ArtistDetail;
}
