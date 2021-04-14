import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import colors from "../../palette";

import { currencies } from "../../constants";

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
    marginTop: "5px",
  },
  formInput: {
    margin: "5px 0",
  },
});

const PricingList = ({ currency, pricePerHour, minimumSpend, onPriceChange }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.groupName} variant={"h6"}>
        Pricing
      </Typography>

      <Grid container spacing={2} className={classes.inputWrapper}>
        <Grid item lg={9} md={9} xs={12}>
          <TextField
            name="minimumSpend"
            classes={{ root: classes.formInput }}
            label={"Minimum Spend"}
            id="minimum-spend"
            placeholder={"Minimum Spend"}
            fullWidth
            variant={"outlined"}
            value={minimumSpend}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onPriceChange(e, "minimumSpend");
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
    </div>
  );
};

interface Props {
  currency: string;
  pricePerHour: number;
  minimumSpend: number;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export default PricingList;
