// External import
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Image from "next/image";

// Material UI Components
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

// Custom Components
import PrimaryButton from "../PrimaryButton";

import { defaultStudioTattoo } from "../../constants";

const useStyles = makeStyles((theme) =>
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
    actionButton: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    actionButtonMobile: {
      display: "none",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        marginBottom: "15px",
      },
    },
  }),
);

export default function ArtistItem({ data: { id, name, avatar, hero_banner } }: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={1}>
      <Image
        src={hero_banner ? hero_banner.image_url : defaultStudioTattoo}
        width={370}
        height={200}
        alt={name}
        layout={"responsive"}
      />
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={avatar?.image_url} />}
        action={
          <PrimaryButton
            variant="outlined"
            color="primary"
            size="small"
            bluePastel
            className={classes.actionButton}
            href={`/artists/${id}`}
          >
            View profile
          </PrimaryButton>
        }
        title={name}
        subheader="Good Fortune Tattoo"
        className={classes.cardHeader}
      />
      <Grid container justify={"center"} className={classes.actionButtonMobile}>
        <PrimaryButton variant="outlined" color="primary" size="small" bluePastel href={`/artists/${id}`}>
          View profile
        </PrimaryButton>
      </Grid>
    </Card>
  );
}

interface Props {
  data: Resource.ArtistDetail;
}
