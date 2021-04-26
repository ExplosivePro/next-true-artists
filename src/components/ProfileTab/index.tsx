import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Material UI
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";

// Custom Components
import TabPanel from "./TabPannel";

import colors from "../../palette";
import { Typography } from "@material-ui/core";
import CustomGallery from "../CustomGallery";
import AddressBlock from "../StudioProfileBasicInfo/AddressBlock";

const useStyles = makeStyles({
  root: {
    marginTop: "44px",
  },
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

export default function ProfileTab({ data: { tattoos, bio, street_address, country, city, lat, long } }: Props) {
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
          <Tab label="Tattoo" className={classes.tabItem} />
          <Tab label="About" className={classes.tabItem} />
          <Tab label="Work Location" className={classes.tabItem} />
        </Tabs>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.swipeView}
        >
          <TabPanel value={value} index={0} dir={theme.direction} aria-label="tattoos">
            {tattoos.length === 0 && (
              <Grid container justify={"center"} className={classes.profileContent}>
                <Typography>This artist does not have any image yet.</Typography>
              </Grid>
            )}
            <CustomGallery tattoos={tattoos} className={classes.profileContent} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction} aria-label="description">
            <Typography className={classes.profileContent}>{bio}</Typography>
            {!bio && (
              <Grid container justify={"center"} className={classes.profileContent}>
                <Typography>This artist does not have description yet.</Typography>
              </Grid>
            )}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction} aria-label="address">
            <AddressBlock
              name={"Taiko Gallery"}
              address={street_address}
              city={city}
              country={country}
              lat={lat}
              long={long}
              spacing
              className={classes.profileContent}
            />
          </TabPanel>
        </SwipeableViews>
      </AppBar>
    </Grid>
  );
}

interface Props {
  data: Resource.ArtistDetail;
}
