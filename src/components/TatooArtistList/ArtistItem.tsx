import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import PrimaryButton from "../PrimaryButton";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
      "& .MuiPaper-elevation1": {
        boxShadow:
          "0px 0px 1px -1px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 3px 0px rgb(0 0 0 / 12%)",
      },
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    cardHeader: {
      "& .MuiCardHeader-content": {
        paddingRight: "20px",
      },
      alignSelf: "center",
      "& .MuiCardHeader-action": {
        alignSelf: "center",
      },
    },
  }),
);

export default function ArtistItem() {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={1}>
      <CardMedia
        className={classes.media}
        image="https://www.tattoos.gallery/jollyoctopus.co.nz/images/gallery/medium/23004810_1471223666266357_4138993543528429900_o.jpg"
        title="Paella dish"
      />
      <CardHeader
        avatar={<Avatar aria-label="recipe" src="/images/james.png" />}
        action={
          <PrimaryButton variant="outlined" color="primary" size="small" bluePastel>
            View profile
          </PrimaryButton>
        }
        title="Bai"
        subheader="Good Fortune Tattoo"
        className={classes.cardHeader}
      />
    </Card>
  );
}
