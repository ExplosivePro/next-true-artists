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
import { Typography } from "@material-ui/core";

// Custom Components
import PrimaryButton from "../PrimaryButton";
import ChipRating from "./ChipRating";
import colors from "../../palette";

import { defaultStudioTattoo } from "../../constants";

const useStyles = makeStyles({
  root: {
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
      maxWidth: "45%",
    },
    alignSelf: "center",
    "& .MuiCardHeader-action": {
      alignSelf: "center",
      marginLeft: "auto",
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
  onClickComponent: {
    cursor: "pointer",
  },
  subHeader: {
    fontSize: "14px",
    color: colors.standardGreyBorder,
  },
  bookButton: {
    maxHeight: "33px",
    maxWidth: "104px",
    fontSize: "16px",
    lineHeight: "normal",
    padding: "7px 16px",
  },
});

export default function CardCarouselsItem({
  className,
  data: { name, rating, totalRating, city, country, avatar, tattoos, id },
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
    router.push(`/studios/${id}`);
  };

  return (
    <Card className={clsx(classes.root, className)} elevation={1}>
      <Slider {...settings}>
        {tattoos.map((tattoo, index) => {
          return (
            <CardMedia className={classes.media} image={tattoo.image_url} title={tattoo.name} key={index}>
              <ChipRating
                text={
                  <Typography className={classes.rateText}>
                    <b>{Number(rating).toFixed(1)}</b> <span className={classes.colorGrey}>({totalRating})</span>
                  </Typography>
                }
              />
            </CardMedia>
          );
        })}
        {tattoos.length === 0 && (
          <CardMedia className={classes.media} image={defaultStudioTattoo} title={"default"}>
            <ChipRating
              text={
                <Typography className={classes.rateText}>
                  <b>{Number(0).toFixed(1)}</b> <span className={classes.colorGrey}>({0})</span>
                </Typography>
              }
            />
          </CardMedia>
        )}
      </Slider>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={avatar.image_url}
            className={classes.onClickComponent}
            onClick={viewProfile}
          />
        }
        action={
          <PrimaryButton
            variant="contained"
            color="primary"
            size="large"
            bluePastel
            onClick={viewProfile}
            className={classes.bookButton}
          >
            Book now
          </PrimaryButton>
        }
        title={
          <Typography className={classes.onClickComponent} onClick={viewProfile} noWrap>
            <b>{name}</b>
          </Typography>
        }
        subheader={
          <Typography className={clsx(classes.onClickComponent, classes.subHeader)} onClick={viewProfile} noWrap>
            {city} {`${country ? `, ${country}` : ""}`}
          </Typography>
        }
        className={classes.cardHeader}
      />
    </Card>
  );
}

interface Props {
  className?: any;
  data: Resource.StudioDetail;
}
