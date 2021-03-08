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

export default function ProfileTab({ tattoos }: Props) {
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
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Gallery images={tattoos} enableImageSelection={false} showCloseButton={false} />,
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            About
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Work Location
          </TabPanel>
        </SwipeableViews>
      </AppBar>
    </Grid>
  );
}

interface Props {
  tattoos: Resource.Tattoos[];
}
