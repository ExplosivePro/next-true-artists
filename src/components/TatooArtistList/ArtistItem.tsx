// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// Material UI Components
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";

// Custom Components
import PrimaryButton from "../PrimaryButton";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
      boxShadow: `0 4px 4px 0 rgb(136 118 118 / 15%)`,
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
  const router = useRouter();
  const classes = useStyles();

  const viewProfile = () => {
    router.push("/artists/1");
  };

  return (
    <Card className={classes.root} elevation={1}>
      <CardMedia className={classes.media} image="/images/feature-studio.jpg" title="Paella dish" />
      <CardHeader
        avatar={<Avatar aria-label="recipe" src="/images/tatooer.png" />}
        action={
          <PrimaryButton variant="outlined" color="primary" size="small" bluePastel onClick={viewProfile}>
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
