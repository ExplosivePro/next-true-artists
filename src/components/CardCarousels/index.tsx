// External import
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Slider from "react-slick";
import clsx from "clsx";
import React, { useState } from "react";

// Material UI Import
import { Typography } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// Customer Import
import PrimaryButton from "../PrimaryButton";
import Loading from "../Loading";
import CardCarouselsItem from "./CarouselItem";

import colors from "../../palette";

import { getStudioList } from "../../api";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: "50px",
    },
    fullWidth: {
      width: "100%",
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
    singleCardItem: {
      margin: theme.spacing(2),
    },
    cardItem: {
      boxShadow: `0 4px 4px 0 rgb(136 118 118 / 15%)`,
    },
    loadingIcon: {
      marginTop: "100px",
    },
  });

const useStyles = makeStyles(styles);

export default function CardCarousels({
  name,
  mode = Mode.GRID,
  data: {
    studios,
    meta: { last_page, current_page },
  },
}: Props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [studioList, setStudioList] = useState<Resource.StudioDetail[]>(studios);
  const [currentPage, setCurrentPage] = useState(current_page);
  const [lastPage, setLastPage] = useState<boolean>(last_page);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    slidesToShow: 3,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
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

  const [slider, setSlider] = useState<Slider | null>();

  const next = () => {
    // @ts-ignore
    slider.slickNext();
  };
  const previous = () => {
    // @ts-ignore
    slider.slickPrev();
  };

  // Load more
  const loadMore = async () => {
    setLoading(true);

    // Increase current page
    setCurrentPage(currentPage + 1);

    // Get artist by current page
    const {
      studios: newStudios,
      meta: { last_page: newLastPage },
    } = await getStudioList(currentPage + 1);

    setStudioList(studioList.concat(newStudios));
    setLastPage(newLastPage);

    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <Grid container item justify={"flex-start"} alignItems={"center"} className={classes.title}>
        <Typography variant={"h5"} display={"inline"}>
          <b>{name}</b>
        </Typography>
        {mode === "singleRow" && studioList.length > 3 && (
          <div className={classes.navigationButtons}>
            <ChevronLeftIcon className={classes.arrowButton} onClick={previous} />
            <ChevronRightIcon className={classes.arrowButton} onClick={next} />
          </div>
        )}
      </Grid>

      {mode === "grid" && (
        <>
          {studioList.length === 0 && (
            <Grid container justify={"center"}>
              <Typography>No data</Typography>
            </Grid>
          )}
          <Grid container alignItems={"center"} spacing={4}>
            {studioList.map((item, index) => {
              return (
                <Grid container item lg={4} md={6} sm={6} xs={12} key={index} justify={"center"}>
                  <CardCarouselsItem className={clsx(classes.cardItem, classes.fullWidth)} data={item} />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}

      {mode === "singleRow" && (
        <>
          {studioList.length === 0 && (
            <Grid container justify={"center"}>
              <Typography>No data</Typography>
            </Grid>
          )}
          {studioList.length > 0 && (
            <Slider ref={(c) => setSlider(c)} {...settings}>
              {studioList.map((item, index) => {
                return (
                  <CardCarouselsItem
                    key={index}
                    className={clsx(classes.cardItem, classes.singleCardItem)}
                    data={item}
                  />
                );
              })}
            </Slider>
          )}
        </>
      )}

      {loading && <Loading className={classes.loadingIcon} />}

      {mode === "grid" && !lastPage && (
        <Grid container alignItems={"center"} justify={"center"} className={classes.seeMoreButton}>
          <PrimaryButton variant="contained" color="primary" size="medium" yellow onClick={loadMore}>
            See More
          </PrimaryButton>
        </Grid>
      )}
    </div>
  );
}

export enum Mode {
  GRID = "grid",
  SINGLE_ROW = "singleRow",
}

interface Props {
  name: string;
  data: Resource.StudioListResponse;
  mode?: Mode;
}
