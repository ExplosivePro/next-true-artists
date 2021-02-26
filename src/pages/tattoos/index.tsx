// External import
import React from "react";
import { makeStyles, createStyles, fade } from "@material-ui/core/styles";
import clsx from "clsx";

import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

// Custom Components
import BodyContent from "../../components/BodyContent";
import PrimaryButton from "../../components/PrimaryButton";
import CustomGallery from "../../components/CustomGallery";
import colors from "../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "15px",
    },
    seeMoreButton: {
      width: "191px",
    },
    operationContainer: {
      marginTop: "20px",
    },
    galleryContainer: {
      margin: "20px 0 40px 0",
    },
    galleryWrapper: {
      width: "100%",
    },
    padding: {
      padding: `0 ${theme.spacing(1)}px`,
    },
    mobileMargin: {
      [theme.breakpoints.down("md")]: {
        marginTop: `${theme.spacing(3)}px`,
      },
    },
    search: {
      height: "100%",
      minHeight: "56px",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: "100%",
      border: `solid 1px ${colors.borderGrey} !important`,
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      paddingLeft: "10px",
      height: "100%",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    topBlock: {
      marginBottom: "20px",
      width: "100%",
      padding: "20px 5px 60px 5px",
      backgroundColor: colors.standardGreyFooter,
    },
  }),
);

const cities = [
  {
    value: "all",
    label: "All Cities",
  },
];

export default function Tattoos() {
  const classes = useStyles();

  /// TODO: Load studios data
  return (
    <BodyContent variant={"div"} className={classes.root}>
      <Grid container>
        <div className={classes.topBlock}>
          <Typography variant={"h6"}>
            <b>Tattoos</b>
          </Typography>

          <Grid container className={classes.operationContainer}>
            <Grid item lg={8} md={12} sm={12} xs={12} className={clsx(classes.padding, classes.mobileMargin)}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search Tattoo"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Grid>
            <Grid
              container
              item
              lg={2}
              md={12}
              sm={12}
              xs={12}
              alignItems={"center"}
              className={clsx(classes.padding, classes.mobileMargin)}
            >
              <TextField
                id="standard-select-currency"
                select
                label="Select City"
                variant="outlined"
                value={cities[0].value}
                fullWidth
              >
                {cities.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={2} md={12} sm={12} xs={12} className={clsx(classes.padding, classes.mobileMargin)}>
              <TextField
                id="standard-select-currency"
                select
                label="Art Style"
                value={cities[0].value}
                variant="outlined"
                fullWidth
              >
                {cities.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </div>

        <Grid container className={classes.galleryContainer}>
          <div className={classes.galleryWrapper}>
            <CustomGallery />
          </div>
        </Grid>

        <Grid container alignItems={"center"} justify={"center"}>
          <PrimaryButton variant="contained" color="primary" size="medium" yellow className={classes.seeMoreButton}>
            See More
          </PrimaryButton>
        </Grid>
      </Grid>
    </BodyContent>
  );
}
