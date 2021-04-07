import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import colors from "../../palette";

import { currencies, paymentMethods } from "../../constants";

const useStyles = makeStyles({
  root: {
    marginBottom: "35px",
    marginLeft: "-15px",
  },
  groupName: {
    color: colors.black,
    fontWeight: "bold",
    paddingLeft: "16px",
  },
  inputWrapper: {
    padding: "8px 15px",
  },
  formInput: {
    margin: "5px 0",
  },
});

const PricingList = ({ currency, paymentMethod, pricePerHour, minimumRate, onPriceChange }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.groupName}>Pricing</Typography>
      <Grid container spacing={2} className={classes.inputWrapper}>
        <Grid item lg={12} md={12} xs={12}>
          <TextField
            name="paymentMethod"
            select
            classes={{ root: classes.formInput }}
            label={"Payment Method"}
            id="payment-method"
            placeholder={"Payment Method"}
            fullWidth
            variant={"outlined"}
            value={paymentMethod}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onPriceChange(e, "paymentMethod");
            }}
          >
            {paymentMethods.map((option) => (
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
            name="pricePerHour"
            classes={{ root: classes.formInput }}
            label={"Price per Hour"}
            id="price-per-hour"
            placeholder={"Price per Hour"}
            fullWidth
            variant={"outlined"}
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
  paymentMethod: string;
  pricePerHour: number;
  minimumRate: number;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export default PricingList;
