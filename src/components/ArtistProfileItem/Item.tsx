// External import
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { Typography } from "@material-ui/core";

// Custom components
import PrimaryButton from "../PrimaryButton";
import Chip from "@material-ui/core/Chip";
import colors from "../../palette";
import CustomGallery from "../CustomGallery";

const useStyles = makeStyles((theme) =>
  createStyles({
    cardHeader: {
      width: "100%",
      "& .MuiCardHeader-content": {
        paddingRight: "20px",
      },
      alignSelf: "center",
      "& .MuiCardHeader-action": {
        alignSelf: "center",
        marginTop: 0,
      },
    },
    avatar: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
    chipContainer: {
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
      },
    },
    yellowChip: {
      backgroundColor: colors.chipYellow,
      color: colors.white,
      cursor: "pointer",
      fontSize: "14px",
    },
    violetChip: {
      color: colors.black,
      border: `solid 1px ${colors.black}`,
      backgroundColor: colors.white,
      cursor: "pointer",
      fontSize: "14px",
      borderRadius: "5px",
    },
    title: {
      marginBottom: "5px",
    },
  }),
);

export default function Item({ data: { avatar, name, styles, tattoos } }: Props) {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid container item lg={4} md={4} sm={4} xs={4}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={avatar?.image_url} className={classes.avatar} />}
            title={
              <Typography className={classes.title}>
                <b>{name}</b>
              </Typography>
            }
            subheader={
              <PrimaryButton variant="outlined" color="primary" size="small" bluePastel>
                See Profile
              </PrimaryButton>
            }
            className={classes.cardHeader}
          />
        </Grid>
        <Grid
          container
          item
          lg={8}
          md={8}
          sm={8}
          xs={8}
          alignItems={"center"}
          spacing={1}
          className={classes.chipContainer}
        >
          <Grid item>
            <Chip label="Styles:" className={classes.yellowChip} />
          </Grid>
          {styles &&
            styles.map((style, index) => {
              return (
                <Grid item key={index}>
                  <Chip label={style.name} className={classes.violetChip} />
                </Grid>
              );
            })}
          {(!styles || styles.length === 0) && (
            <Grid item>
              <Chip label={"None"} className={classes.violetChip} />
            </Grid>
          )}
        </Grid>
      </Grid>
      <CustomGallery tattoos={tattoos} />
    </>
  );
}

interface Props {
  data: Resource.ArtistDetail;
}
