// External import
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import clsx from "clsx";
import Slider from "react-slick";

// Material UI Components
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";

// Custom Components
import PrimaryButton from "../PrimaryButton";
import { Typography } from "@material-ui/core";
import ChipRating from "./ChipRating";
import colors from "../../palette";

const useStyles = makeStyles({
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
    position: "relative",
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
  rateText: {
    fontSize: "14px",
  },
  colorGrey: {
    color: colors.standardGrey,
  },
  customDot: {
    left: 0,
    bottom: 0,
    textAlign: "left",
  },
});

export default function CardCarouselsItem({
  className,
  data: { name, rating, totalRating, city, country, avatar, images },
}: Props) {
  const router = useRouter();
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    slidesToShow: 1,
    dotsClass: "custom-slick-dots",
  };

  const viewProfile = () => {
    router.push("/artists/1");
  };

  return (
    <Card className={clsx(classes.root, className)} elevation={1}>
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <CardMedia className={classes.media} image={image} title="Paella dish" key={index}>
              <ChipRating
                text={
                  <Typography className={classes.rateText}>
                    <b>{rating}</b> <span className={classes.colorGrey}>({totalRating})</span>
                  </Typography>
                }
              />
            </CardMedia>
          );
        })}
      </Slider>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={avatar} />}
        action={
          <PrimaryButton variant="contained" color="primary" size="large" bluePastel onClick={viewProfile}>
            Book now
          </PrimaryButton>
        }
        title={
          <Typography>
            <b>{name}</b>
          </Typography>
        }
        subheader={`${city}, ${country}`}
        className={classes.cardHeader}
      />
    </Card>
  );
}

interface Props {
  className?: any;
  data: Resource.StudioDetail;
}
