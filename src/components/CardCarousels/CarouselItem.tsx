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

// TODO: load all studio image
const list = [1, 2, 3];

export default function CardCarouselsItem({ className }: Props) {
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
    // eslint-disable-next-line react/display-name
    appendDots: (dots: any) => (
      <ul
        style={{
          left: 0,
          bottom: 0,
          textAlign: "left",
        }}
      >
        {dots}
      </ul>
    ),
  };

  const viewProfile = () => {
    router.push("/artists/1");
  };

  return (
    <Card className={clsx(classes.root, className)} elevation={1}>
      <Slider {...settings}>
        {list.map((item, index) => {
          return (
            <CardMedia className={classes.media} image="/images/feature-studio.jpg" title="Paella dish" key={index}>
              <ChipRating
                text={
                  <Typography className={classes.rateText}>
                    <b>5.0</b> <span className={classes.colorGrey}>(2314)</span>
                  </Typography>
                }
              />
            </CardMedia>
          );
        })}
      </Slider>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src="/images/tatooer.png" />}
        action={
          <PrimaryButton variant="contained" color="primary" size="large" bluePastel onClick={viewProfile}>
            Book now
          </PrimaryButton>
        }
        title={
          <Typography>
            <b>Mango</b>
          </Typography>
        }
        subheader="Barcelona, Catalunya"
        className={classes.cardHeader}
      />
    </Card>
  );
}

interface Props {
  className?: any;
}
