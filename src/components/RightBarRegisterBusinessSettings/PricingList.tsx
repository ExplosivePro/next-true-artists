// External
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// Material UI Components
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

// Custom Components
import MultipleSelection from "../RightBarArtistRegisterInformation/MutilpleSelection";

import colors from "../../palette";

import { currencies, paymentMethodList } from "../../constants";

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

const PricingList = ({
  currency,
  paymentMethods,
  pricePerHour,
  minimumRate,
  onPriceChange,
  title = null,
  inputWrapperClass,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!title && <Typography className={classes.groupName}>Pricing</Typography>}
      {title}
      <Grid container spacing={2} className={clsx(classes.inputWrapper, inputWrapperClass)}>
        <Grid item lg={12} md={12} xs={12}>
          <MultipleSelection
            name={"Accepted Payment Methods"}
            value={paymentMethods}
            optionList={paymentMethodList.map((method) => method.value)}
            onChange={(e) => {
              onPriceChange(e, "paymentMethods");
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className={clsx(classes.inputWrapper, inputWrapperClass)}>
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
      <Grid container spacing={2} className={clsx(classes.inputWrapper, inputWrapperClass)}>
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
  title?: any;
  inputWrapperClass?: string;
  currency: string;
  paymentMethods: string[];
  pricePerHour: number;
  minimumRate: number;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export default PricingList;
