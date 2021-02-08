import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Slider from "react-slick";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: "50px",
    },
    title: {
      marginBottom: "30px",
    },
    arrowButton: {
      color: "black",
      borderRadius: "50%",
      backgroundColor: "white",
      padding: "15px",
      width: "50px",
      height: "50px",
      boxShadow: "0 4px 4px 0 rgb(136 118 118 / 15%)",
      zIndex: 2,
      cursor: "pointer",
      "&:hover": {
        color: "black",
        zIndex: 2,
        backgroundColor: colors.lightGrey,
      },
    },
    navigationButtons: {
      display: "inline-block",
      marginLeft: "auto",
      "& .MuiSvgIcon-root": {
        marginLeft: "15px",
      },
    },
    seeMoreButton: {
      marginTop: "100px",
      "& .MuiButtonBase-root": {
        width: "191px",
      },
    },
    cardItem: {
      padding: theme.spacing(4),
      [theme.breakpoints.down("md")]: {
        margin: "0 auto",
      },
    },
  });

const useStyles = makeStyles(styles);

import CardCarouselsItem from "./CarouselItem";
import { Typography } from "@material-ui/core";
import colors from "../../palette";
import PrimaryButton from "../PrimaryButton";
import React, { useState } from "react";

export default function CardCarousels({ name, mode = "grid" }: Props) {
  const classes = useStyles();

  // TODO: load all tatoo artist list here, do pagination etc
  const list = [1, 2, 3, 4, 5, 6, 7];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [slider, setSlider] = useState();

  const next = () => {
    slider.slickNext();
  };
  const previous = () => {
    slider.slickPrev();
  };

  return (
    <div className={classes.root}>
      <Grid container item justify={"flex-start"} alignItems={"center"} className={classes.title}>
        <Typography variant={"h5"} display={"inline"}>
          <b>{name}</b>
        </Typography>
        {mode === "singleRow" && (
          <div className={classes.navigationButtons}>
            <ChevronLeftIcon className={classes.arrowButton} onClick={previous} />
            <ChevronRightIcon className={classes.arrowButton} onClick={next} />
          </div>
        )}
      </Grid>

      {mode === "grid" && (
        <Grid container alignItems={"center"} spacing={4}>
          {list.map((item, index) => {
            return (
              <Grid container item lg={4} md={6} sm={6} xs={12} key={index} justify={"center"}>
                <CardCarouselsItem />
              </Grid>
            );
          })}
        </Grid>
      )}

      {mode === "singleRow" && (
        <Slider ref={(c) => setSlider(c)} {...settings}>
          {list.map((item, index) => {
            return <CardCarouselsItem key={index} className={classes.cardItem} />;
          })}
        </Slider>
      )}

      {mode === "grid" && (
        <Grid container alignItems={"center"} justify={"center"} className={classes.seeMoreButton}>
          <PrimaryButton variant="contained" color="primary" size="medium" yellow>
            See More
          </PrimaryButton>
        </Grid>
      )}
    </div>
  );
}

enum Mode {
  GRID = "grid",
  SINGLE_ROW = "singleRow",
}

interface Props {
  name: string;
  mode?: Mode;
}
