import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Material UI
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import { Typography } from "@material-ui/core";

// Custom Components
import TabPanel from "./TabPannel";
import StudioProfileBasicInfo from "../StudioProfileBasicInfo";
import CustomGallery from "../CustomGallery";
import ArtistProfileItem from "../ArtistProfileItem";

import colors from "../../palette";

const useStyles = makeStyles({
  root: {},
  appBar: {
    boxShadow: "none",
    backgroundColor: colors.white,
  },
  tabWrapper: {
    "& .MuiTabs-indicator": {
      backgroundColor: colors.standardYellow,
    },
  },
  tabItem: {
    textTransform: "none",
    fontSize: "16px",
    "&.Mui-selected": {
      color: colors.primaryColor,
    },
  },
  swipeView: {
    borderTop: "solid 1px #e9e9e9",
  },
  profileContent: {
    marginTop: "15px",
  },
});

export default function StudioProfileTab({ data }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Grid container alignItems={"center"} className={classes.root} justify={"center"}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabWrapper}
        >
          <Tab label="Studio" className={classes.tabItem} />
          <Tab label="Portfolio" className={classes.tabItem} />
          <Tab label="Artists" className={classes.tabItem} />
        </Tabs>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.swipeView}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <StudioProfileBasicInfo data={data} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {data.data.tattoos.length === 0 && (
              <Grid container justify={"center"} className={classes.profileContent}>
                <Typography>This studio does not have any portfolio yet.</Typography>
              </Grid>
            )}
            <Grid container justify={"center"} className={classes.profileContent}>
              <CustomGallery tattoos={data.data.tattoos} />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Grid container justify={"center"} className={classes.profileContent}>
              <ArtistProfileItem data={data.data.artists} />
              {(!data.data.artists || data.data.artists.length === 0) && (
                <Typography>This studio does not associate with any artist yet.</Typography>
              )}
            </Grid>
          </TabPanel>
        </SwipeableViews>
      </AppBar>
    </Grid>
  );
}

interface Data {
  data: Resource.StudioDetail;
  reviews: Resource.Review[];
}

interface Props {
  data: Data;
}
