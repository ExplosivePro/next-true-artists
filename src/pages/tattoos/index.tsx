// External import
import React, { useEffect, useState } from "react";
import clsx from "clsx";

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
import { getTattooList } from "../../api";
import Loading from "../../components/Loading";

// Hooks
import { useDebounce } from "../../hooks";

import useStyles from "./styles";

const cities = [
  {
    value: "all",
    label: "All Cities",
  },
];

export default function Tattoos({ tattoos: { tattoos } }: Props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [images, setImages] = useState(tattoos);
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filters, setFilters] = useState<any[]>([]);
  const [filterByGroups, setFilterByGroups] = useState<any>({});

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

    const { tattoos } = await getTattooList(1, keyword);
    setImages(tattoos);

    // Hide loading
    setLoading(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      search(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // Filter
  const applyFilter = (data: any) => {
    // Store this group data
    setFilterByGroups(data);

    // TODO: Call REST API here

    const filterArr: any[] = [];
    Object.keys(data).map((key) => {
      data[key].map((item: any) => {
        filterArr.push(item);
      });
    });

    setFilters(filterArr);
    handleFilterClose();
  };

  const removeFilter = (id: number, group: string) => {
    setFilters(filters.filter((item) => (item.id !== id && item.group === group) || item.group !== group));
  };

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
                        <Filters data={filterByGroups} onClose={handleFilterClose} onApply={applyFilter} />
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
            <CustomGallery tattoos={images} />
          </div>
        </Grid>
      </Grid>
    </BodyContent>
  );
}

interface Props {
  tattoos: Resource.TattooListResponse;
}

export const getStaticProps = async () => {
  // Preload studios, top cities, feature studios list
  const tattoos = await getTattooList(1);

  return { props: { tattoos }, revalidate: 300 };
};
