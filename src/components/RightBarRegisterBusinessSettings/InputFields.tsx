import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import colors from "../../palette";

import { languages } from "../../constants";

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

const InputFields = ({ specialty, services, language, onInputChange }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.inputWrapper}>
        <Typography className={classes.groupName}>Speciality</Typography>
        <Grid item lg={12} md={12} xs={12}>
          <TextField
            name="specialty"
            classes={{ root: classes.formInput }}
            label={"Specialty"}
            id="specialty"
            placeholder={"Specialty"}
            fullWidth
            variant={"outlined"}
            value={specialty}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInputChange(e, "specialty");
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.inputWrapper}>
        <Typography className={classes.groupName}>Services</Typography>
        <Grid item lg={12} md={12} xs={12}>
          <TextField
            name="services"
            classes={{ root: classes.formInput }}
            label={"Services"}
            id="services"
            placeholder={"services"}
            fullWidth
            variant={"outlined"}
            value={services}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInputChange(e, "services");
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.inputWrapper}>
        <Typography className={classes.groupName}>Language</Typography>
        <Grid item lg={12} md={12} xs={12}>
          <TextField
            name="language"
            select
            classes={{ root: classes.formInput }}
            label={"Language"}
            id="language"
            placeholder={"Language"}
            fullWidth
            variant={"outlined"}
            value={language}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInputChange(e, "language");
            }}
          >
            {languages.map((option) => (
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
  specialty: string;
  services: string;
  language: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export default InputFields;
