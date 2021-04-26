import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import colors from "../../palette";

import { languages, serviceList } from "../../constants";
import MultipleSelection from "../RightBarArtistRegisterInformation/MutilpleSelection";

const useStyles = makeStyles({
  root: {
    marginBottom: "35px",
    marginLeft: "-15px",
  },
  groupName: {
    color: colors.black,
    fontWeight: "bold",
    paddingLeft: "10px",
  },
  inputWrapper: {
    padding: "8px 15px",
    marginBottom: "12px",
  },
  formInput: {
    margin: "5px 0",
  },
});

const InputFields = ({ services, language, onInputChange, hasTitle = true }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.inputWrapper}>
        {hasTitle && <Typography className={classes.groupName}>Services</Typography>}
        <Grid item lg={12} md={12} xs={12}>
          <MultipleSelection
            name={"Services"}
            value={services}
            optionList={serviceList.map((service) => service.value)}
            onChange={(e) => {
              onInputChange(e, "services");
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.inputWrapper}>
        {hasTitle && <Typography className={classes.groupName}>Language</Typography>}
        <Grid item lg={12} md={12} xs={12}>
          <MultipleSelection
            name={"Languages"}
            value={language}
            optionList={languages.map((language) => language.value)}
            onChange={(e) => {
              onInputChange(e, "language");
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

interface Props {
  services: string[];
  language: string[];
  onInputChange: (value: string[], name: string) => void;
  hasTitle?: boolean;
}

export default InputFields;
