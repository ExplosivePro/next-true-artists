import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// @ts-ignore
import Gallery from "react-grid-gallery";

// Material UI
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";

// Custom Components
import TabPanel from "./TabPannel";

import colors from "../../palette";

const useStyles = makeStyles({
  root: {
    marginTop: "44px",
  },
  appBar: {
    boxShadow: "none",
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
});

const images = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 183,
  },
  {
    src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
    thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
    thumbnailWidth: 271,
    thumbnailHeight: 320,
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
    thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
    thumbnailWidth: 257,
    thumbnailHeight: 320,
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 183,
  },
  {
    src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
    thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
    thumbnailWidth: 271,
    thumbnailHeight: 320,
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
    thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
    thumbnailWidth: 257,
    thumbnailHeight: 320,
  },
];

export default function ProfileTab() {
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
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Gallery images={images} enableImageSelection={false} showCloseButton={false} />,
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </AppBar>
    </Grid>
  );
}
