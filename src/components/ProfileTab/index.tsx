import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// @ts-ignore
import Gallery from "react-grid-gallery";

// Material UI
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

// Custom Components
import TabPanel from "./TabPannel";

import colors from "../../palette";
import { Typography } from "@material-ui/core";

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
      color: colors.bluePastel,
    },
  },
  swipeView: {
    borderTop: "solid 1px #e9e9e9",
  },
});

// Generate suitable image list from image array backend response
const generateImageList = (list: Resource.Image[]) => {
  const imageList: Resource.Tattoos[] = [];

  list.map((image) => {
    imageList.push({
      src: image.image_url,
      thumbnail: image.image_url,
      thumbnailWidth: 320,
      thumbnailHeight: 183,
    });
  });

  return imageList;
};

export default function ProfileTab({ data: { tattoos, bio, street_address, country, city } }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [images] = useState(generateImageList(tattoos));

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
          <TabPanel value={value} index={0} dir={theme.direction}>
            {images.length === 0 && (
              <Grid container justify={"center"}>
                <Typography>This artist does not have any image yet.</Typography>
              </Grid>
            )}
            <Gallery images={images} enableImageSelection={false} showCloseButton={false} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {bio ? (
              <Typography>{bio}</Typography>
            ) : (
              <>
                <Grid container justify={"center"}>
                  <Typography>This artist does not have description yet.</Typography>
                </Grid>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemIcon>
                      <FacebookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Facebook" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <InstagramIcon />
                    </ListItemIcon>
                    <ListItemText primary="Instagram" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <TwitterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Twitter" />
                  </ListItem>
                </List>
              </>
            )}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Grid container alignItems={"center"}>
              <LocationOnIcon />
              <Typography display={"inline"}>
                {street_address} {`${city ? `,${city}` : ""}`} {`${country ? `,${country}` : ""}`}
              </Typography>
            </Grid>
          </TabPanel>
        </SwipeableViews>
      </AppBar>
    </Grid>
  );
}

interface Props {
  data: Resource.ArtistDetail;
}
