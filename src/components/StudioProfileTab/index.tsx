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
import StudioProfileBasicInfo from "../StudioProfileBasicInfo";

import colors from "../../palette";

const useStyles = makeStyles({
  root: {},
  appBar: {
    boxShadow: "none",
    backgroundColor: colors.white,
  },
  tabWrapper: {
    "& .MuiTabs-indicator": {
      backgroundColor: colors.black,
    },
  },
  tabItem: {
    textTransform: "none",
    fontSize: "16px",
    "&.Mui-selected": {
      color: colors.black,
    },
  },
  swipeView: {
    borderTop: "solid 1px #e9e9e9",
  },
});

export default function StudioProfileTab() {
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
          <Tab label="Porfolio" className={classes.tabItem} />
          <Tab label="Artists" className={classes.tabItem} />
        </Tabs>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.swipeView}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <StudioProfileBasicInfo />
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
