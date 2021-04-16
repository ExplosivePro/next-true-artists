// External
import React, { useState } from "react";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

// Custom component
import PrimaryButton from "../PrimaryButton";
import SettingList from "./SettingList";
import PricingList from "./PricingList";
import InputFields from "./InputFields";

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

const getDefaultValue = (settings: any[]) => {
  const checkList: any[] = [];
  settings.map((item) => {
    item.settings.map((setting: any) => {
      if (setting.defaultValue) {
        checkList.push(setting.name);
      }
    });
  });

  return checkList;
};

export default function RightBarRegisterBusinessSettings({ currentUserId, currentData, onPrevious, onNext }: Props) {
  const classes = useStyles();
  const app = useApp();

  const {
    checked: checkedData,
    currency: currencyData,
    language: languageData,
    minimumRate: minimumRateData,
    paymentMethods: paymentMethodData,
    pricePerHour: pricePerHourData,
    services: servicesData,
  } = currentData;

  const [currency, setCurrency] = useState(currencyData || "");
  const [paymentMethods, setPaymentMethod] = useState(paymentMethodData || []);
  const [pricePerHour, setPricePerHour] = useState<number>(pricePerHourData || 0);
  const [minimumRate, setMinimumRate] = useState<number>(minimumRateData || 0);
  const [services, setServices] = useState<string[]>(servicesData || []);
  const [language, setLanguage] = useState<string[]>(languageData || []);
  const [checked, setChecked] = React.useState<string[]>(checkedData || getDefaultValue(settingList));

  // On price change
  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case "currency": {
        setCurrency(event.target.value);
        break;
      }
      case "paymentMethods": {
        setPaymentMethod(event);
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

  // On input change
  const onInputChange = (event: string[], name: string) => {
    switch (name) {
      case "services": {
        setServices(event);
        break;
      }
      case "language": {
        setLanguage(event);
        break;
      }
    }
  };

  // Handle toggle setting buttons
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
        accepted_payment_methods: paymentMethods.join(","),
        accepting_guest_artist: checked.includes("appointment_only"),
        appointment_only: checked.includes("appointment_only"),
        piercings: checked.includes("piercings"),
        cosmetic_tattoos: checked.includes("cosmetic_tattoos"),
        vegan_ink: checked.includes("vegan_ink"),
        wifi: checked.includes("wifi"),
        privacy_dividers: checked.includes("privacy_dividers"),
        wheelchair_access: checked.includes("wheelchair_access"),
        parking: checked.includes("parking"),
        lgbt_friendly: checked.includes("lgbt_friendly"),
        languages: language.join(","),
        services: services.join(","),
      });

      const { error, errors } = response;
      // No error happens
      if (!error) {
        onNext &&
          onNext({
            minimumRate,
            pricePerHour,
            currency,
            paymentMethods,
            checked,
            language,
            services,
          });
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

        <InputFields language={language} services={services} onInputChange={onInputChange} />
        {settingList.map((setting: any, index) => {
          return (
            <SettingList
              key={index}
              id={setting.groupName}
              groupName={setting.groupName}
              items={setting.settings}
              checked={checked}
              handleToggle={handleToggle}
            />
          );
        })}

        <PricingList
          paymentMethods={paymentMethods}
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
              onClick={onPrevious}
            >
              Previous Step
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
  currentData: any;
  currentUserId: number | undefined;
  role: string;
  onPrevious?: () => void;
  onNext?: (data: any) => void;
}
