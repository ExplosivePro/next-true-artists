import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Typography } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import colors from "../../palette";

import { currencies } from "../../constants";

const useStyles = makeStyles({
  root: {
    marginBottom: "35px",
    marginLeft: "-15px",
  },
  groupName: {
    color: colors.black,
    fontSize: "16px",
    fontWeight: "bold",
  },
  listSubHeader: {
    marginBottom: "10px",
  },
  title: {
    color: colors.black,
    fontWeight: 500,
  },
  subTitle: {
    color: colors.standardGreyBorder,
  },
  listItem: {
    cursor: "pointer",
    paddingTop: "15px",
    paddingBottom: "15px",
  },
  inputWrapper: {
    padding: "8px 15px",
  },
  formInput: {
    margin: "5px 0",
  },
});

const PricingList = ({ currency, pricePerHour, minimumRate, onPriceChange }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        subheader={
          <ListSubheader className={classes.listSubHeader} disableSticky={true}>
            {<Typography className={classes.groupName}>Pricing</Typography>}
          </ListSubheader>
        }
      >
        <ListItem className={classes.listItem}>
          <ListItemText primary={<Typography className={classes.title}>Cash Only</Typography>} />
          <ListItemSecondaryAction>
            <Switch edge="end" inputProps={{ "aria-labelledby": "cash-only" }} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Grid container spacing={2} className={classes.inputWrapper}>
        <Grid item lg={9} md={9} xs={12}>
          <TextField
            name="pricePerHour"
            classes={{ root: classes.formInput }}
            label={"Price per Hour"}
            id="price-per-hour"
            placeholder={"Price per Hour"}
            fullWidth
            variant={"outlined"}
            defaultValue={""}
            value={pricePerHour}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onPriceChange(e, "pricePerHour");
            }}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <TextField
            name="currency"
            select
            classes={{ root: classes.formInput }}
            label={"Currency"}
            id="currency"
            placeholder={"Currency"}
            fullWidth
            variant={"outlined"}
            value={currency}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onPriceChange(e, "currency");
            }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.inputWrapper}>
        <Grid item lg={9} md={9} xs={12}>
          <TextField
            name="minimumRate"
            classes={{ root: classes.formInput }}
            label={"Minimum Rate"}
            id="minimum-rate"
            placeholder={"Minimum Rate"}
            fullWidth
            variant={"outlined"}
            defaultValue={""}
            value={minimumRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onPriceChange(e, "minimumRate");
            }}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <TextField
            name="currency"
            select
            classes={{ root: classes.formInput }}
            label={"Currency"}
            id="currency"
            placeholder={"Currency"}
            fullWidth
            variant={"outlined"}
            value={currency}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onPriceChange(e, "currency");
            }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
};

interface Props {
  currency: string;
  pricePerHour: number;
  minimumRate: number;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export default PricingList;
