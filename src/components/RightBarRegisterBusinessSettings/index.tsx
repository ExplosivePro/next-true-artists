// External
import React, { useState } from "react";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

// Custom component
import PrimaryButton from "../PrimaryButton";
import SettingList from "./SettingList";
import PricingList from "./PricingList";

import colors from "../../palette";

// APIs
import { editStudioProfile } from "../../api";

// Context
import { useApp } from "../../contexts";

import { settingList } from "../../constants";

const useStyles = makeStyles({
  root: {
    height: "100%",
    position: "relative",
  },
  groupInput: {
    marginBottom: "4px",
  },
  titleText: {
    fontWeight: 600,
    marginBottom: "10px",
  },
  titleWrapper: {
    marginBottom: "35px",
  },
  formInput: {
    margin: "12px 0",
  },
  formWrapper: {
    width: "70%",
    height: "100%",
    position: "relative",
  },
  buttonWrapper: {
    marginTop: "25px",
  },
  box: {
    backgroundColor: colors.white,
    borderRadius: "6px",
    padding: "15px",
    margin: "15px 0",
  },
  formControlLabel: {
    width: "100%",
    flexDirection: "inherit",
  },
  checkBox: {
    position: "absolute",
    right: 0,
  },
  checkedIcon: {
    color: colors.standardGreen,
  },
});

export default function RightBarRegisterBusinessSettings({ currentUserId, onSkip, onNext }: Props) {
  const classes = useStyles();
  const app = useApp();

  const [currency, setCurrency] = useState("");
  const [pricePerHour, setPricePerHour] = useState<number>(0);
  const [minimumRate, setMinimumRate] = useState<number>(0);

  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case "currency": {
        setCurrency(event.target.value);
        break;
      }
      case "pricePerHour": {
        setPricePerHour(parseInt(event.target.value) || 0);
        break;
      }
      case "minimumRate": {
        setMinimumRate(parseInt(event.target.value) || 0);
        break;
      }
    }
  };

  const goNext = async () => {
    if (currentUserId) {
      // Edit studio profile
      // Call APIs to submit register data
      const response = await editStudioProfile({
        id: currentUserId,
        minimum_spend: minimumRate,
        price_per_hour: pricePerHour,
        currency_code: currency,
      });

      const { error, errors } = response;
      // No error happens
      if (!error) {
        onNext && onNext();
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
      }
    }
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            Business Settings
          </Typography>
          <Typography>Include information about your studio that’s useful for customers.</Typography>
        </div>

        {settingList.map((setting, index) => {
          return (
            <SettingList key={index} id={setting.groupName} groupName={setting.groupName} items={setting.settings} />
          );
        })}

        <PricingList
          currency={currency}
          pricePerHour={pricePerHour}
          minimumRate={minimumRate}
          onPriceChange={onPriceChange}
        />

        <Grid container spacing={2} className={classes.buttonWrapper}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <PrimaryButton
              type={"button"}
              variant="outlined"
              color="primary"
              size="large"
              bluePastel
              fullWidth
              onClick={onSkip}
            >
              Skip
            </PrimaryButton>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <PrimaryButton variant="contained" color="primary" size="large" onClick={goNext} fullWidth bluePastel>
              Next
            </PrimaryButton>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

interface Props {
  data: Resource.WorkingStyle[];
  currentUserId: number | undefined;
  role: string;
  onSkip?: () => void;
  onNext?: () => void;
}
