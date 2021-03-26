// External import
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { createStyles, fade, makeStyles } from "@material-ui/core/styles";

import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";

// Custom Components
import BodyContent from "../../components/BodyContent";
import CustomGallery from "../../components/CustomGallery";
import Filters from "../../components/Filters";
import FilterBlock from "../../components/Filters/FilterBlock";

// APIs
import { getTattooList, getWorkingStyleList, getCityList } from "../../api";
import Loading from "../../components/Loading";

// Hooks
import { useDebounce } from "../../hooks";
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
      "& input": {
        width: "100%",
      },
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
    filterWrapper: {
      padding: "0 8px",
      marginTop: "15px",
    },
  }),
);

export default function Tattoos({ tattoos: { tattoos }, workingStyles, cities: { locations } }: Props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // Direct search input value before debounce
  const [currentSearchInput, setCurrentSearchInput] = useState(""); // Debounce search value which is used for query
  const [images, setImages] = useState(tattoos);
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filters, setFilters] = useState<any[]>([]);
  const [filterByGroups, setFilterByGroups] = useState<any>({});
  const [cities, setCities] = useState<any[]>(locations);

  // On filter button click
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // On filter close
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Filter open
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // On search Input
  const onSearch = (e: any) => {
    setSearchInput(e.target.value);
  };

  // Search
  const search = async (keyword: string) => {
    // Clear all current result first
    setImages([]);

    // Show loading
    setLoading(true);

    const { tattoos } = await getTattooList(1, keyword, filterByGroups);
    setImages(tattoos);

    setCurrentSearchInput(keyword);

    // Hide loading
    setLoading(false);
  };

  // Do filter
  const doFilter = async (filter: any) => {
    // Clear all current result first
    setImages([]);

    // Show loading
    setLoading(true);

    const { tattoos } = await getTattooList(1, currentSearchInput, filter);
    setImages(tattoos);

    // Hide loading
    setLoading(false);
  };

  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Filter
  const applyFilter = (data: any) => {
    // Store this group data
    setFilterByGroups(data);

    // Call API do do filter
    doFilter(data);

    const filterArr: any[] = [];
    Object.keys(data).map((key) => {
      data[key].map((item: any) => {
        filterArr.push(item);
      });
    });

    setFilters(filterArr);
    handleFilterClose();
  };

  // Remove filter
  const removeFilter = (id: number, group: string) => {
    setFilters(filters.filter((item) => (item.id !== id && item.group === group) || item.group !== group));

    const newFilter = filterByGroups;

    newFilter[group] = filterByGroups[group].filter(
      (item: any) => (item.id !== id && item.group === group) || item.group !== group,
    );
    setFilterByGroups(newFilter);

    doFilter(newFilter);
  };

  // On city selection change
  const onCityChange = (e: any) => {
    let newFilter = filterByGroups;

    newFilter = { ...filterByGroups, location: [{ id: e.target.value, name: e.target.value, group: "location" }] };

    setFilterByGroups(newFilter);
    doFilter(newFilter);
  };

  useEffect(() => {
    // Add All Cities option to selection list
    setCities([{ id: null, city: "All Cities" }].concat(cities));
  }, []);

  return (
    <BodyContent variant={"div"} className={classes.root}>
      <Grid container>
        <div className={classes.topBlock}>
          <Typography variant={"h6"}>
            <b>Tattoos</b>
          </Typography>

          <Grid container className={classes.operationContainer}>
            <Grid item lg={9} md={12} sm={12} xs={12} className={clsx(classes.padding, classes.mobileMargin)}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  fullWidth
                  value={searchInput}
                  placeholder="Search Tattoo"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={onSearch}
                  endAdornment={
                    <>
                      <IconButton onClick={handleFilterClick}>
                        <FilterListIcon />
                      </IconButton>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleFilterClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Filters
                          data={filterByGroups}
                          workingStyles={workingStyles}
                          onClose={handleFilterClose}
                          onApply={applyFilter}
                        />
                      </Popover>
                    </>
                  }
                />
              </div>
            </Grid>
            <Grid
              container
              item
              lg={3}
              md={12}
              sm={12}
              xs={12}
              alignItems={"center"}
              className={clsx(classes.padding, classes.mobileMargin)}
            >
              <TextField
                id="standard-select-city"
                select
                label="Select City"
                variant="outlined"
                fullWidth
                onChange={onCityChange}
                defaultValue={""}
              >
                {cities.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.city}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container item alignItems={"center"} className={classes.filterWrapper}>
            {filters.map((filter, index) => {
              return (
                <FilterBlock
                  key={index}
                  name={filter.name}
                  group={filter.group}
                  id={filter.id}
                  removeFilter={removeFilter}
                />
              );
            })}
          </Grid>
        </div>

        {loading && <Loading />}

        <Grid container className={classes.galleryContainer}>
          <div className={classes.galleryWrapper}>
            {images.length === 0 && (
              <Grid container justify={"center"}>
                <Typography>No data</Typography>
              </Grid>
            )}
            <CustomGallery tattoos={images} />
          </div>
        </Grid>
      </Grid>
    </BodyContent>
  );
}

interface Props {
  tattoos: Resource.TattooListResponse;
  workingStyles: Resource.WorkingStyle[];
  cities: Resource.CityListResponse;
}

export const getStaticProps = async () => {
  // Preload studios, top cities, feature studios list
  const tattoos = await getTattooList(1);
  const workingStyles = await getWorkingStyleList();
  const cities = await getCityList(1);

  return { props: { tattoos, workingStyles, cities }, revalidate: 300 };
};
