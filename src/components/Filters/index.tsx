// External APIs
import React, { useState } from "react";
import clsx from "clsx";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

import useStyles from "./styles";

// Custom Components
import PrimaryButton from "../PrimaryButton";

const colors = [
  {
    id: 1,
    name: "Color",
  },
  {
    id: 2,
    name: "Black white",
  },
  {
    id: 3,
    name: "Free Style",
  },
];

const placements = [
  {
    id: 1,
    name: "Ank",
  },
  {
    id: 2,
    name: "Back - Full",
  },
  {
    id: 3,
    name: "Back - Lower",
  },
  {
    id: 4,
    name: "Back - Upper",
  },
  {
    id: 5,
    name: "Behind Ear",
  },
  {
    id: 6,
    name: "Calf",
  },
  {
    id: 7,
    name: "Chest",
  },
];

export default function Filters({ data, onClose, onApply, workingStyles }: Props) {
  const classes = useStyles();

  const [optionValues, setOptionValues] = useState(data);
  const [artStyles] = useState(workingStyles);

  // Handle checkbox change
  const handleChange = (e: any, id: number, group: string) => {
    // Check
    if (e.target.checked) {
      let groupData = [{ id, name: e.target.name, group }];
      // Group does already existed
      if (optionValues[group]) {
        groupData = groupData.concat(optionValues[group]);
      }

      setOptionValues({ ...optionValues, [group]: groupData });
    } else {
      // Uncheck
      setOptionValues({
        ...optionValues,
        [group]: optionValues[group].filter((item: any) => item.id !== id),
      });
    }
  };

  // Reset all filters
  const reset = () => {
    setOptionValues({});
  };

  const isChecked = (id: number, group: string) => {
    return optionValues[group]
      ? optionValues[group] && optionValues[group].filter((item: any) => item.id === id).length > 0
      : false;
  };

  return (
    <Grid container>
      <div className={classes.header}>
        <Typography variant={"h6"} className={classes.title}>
          Filter
        </Typography>
        <IconButton className={classes.closeIcon} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <Grid container className={classes.container}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.filterGroupTitle}>
              Color
            </FormLabel>
            <FormGroup>
              {colors.map((color) => {
                return (
                  <FormControlLabel
                    key={color.id}
                    value={color.id}
                    control={<Checkbox name={color.name} checked={isChecked(color.id, "colors")} />}
                    label={
                      <Typography
                        className={clsx(classes.label, { [classes.selected]: isChecked(color.id, "colors") })}
                      >
                        {color.name}
                      </Typography>
                    }
                    onChange={(e) => {
                      handleChange(e, color.id, "colors");
                    }}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.filterGroupTitle}>
              Placement
            </FormLabel>
            <FormGroup>
              {placements.map((placement) => {
                return (
                  <FormControlLabel
                    key={placement.id}
                    control={<Checkbox name={placement.name} checked={isChecked(placement.id, "placements")} />}
                    label={
                      <Typography
                        className={clsx(classes.label, { [classes.selected]: isChecked(placement.id, "placements") })}
                      >
                        {placement.name}
                      </Typography>
                    }
                    onChange={(e) => {
                      handleChange(e, placement.id, "placements");
                    }}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.filterGroupTitle}>
              Art Style
            </FormLabel>
            <FormGroup>
              {artStyles.map((artStyle) => {
                return (
                  <FormControlLabel
                    key={artStyle.id}
                    control={<Checkbox name={artStyle.name} checked={isChecked(artStyle.id, "artStyles")} />}
                    label={
                      <Typography
                        className={clsx(classes.label, { [classes.selected]: isChecked(artStyle.id, "artStyles") })}
                      >
                        {artStyle.name}
                      </Typography>
                    }
                    onChange={(e) => {
                      handleChange(e, artStyle.id, "artStyles");
                    }}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justify={"flex-end"} alignItems={"center"} className={classes.footer}>
        <PrimaryButton
          className={classes.button}
          variant="outlined"
          color="primary"
          size="medium"
          bluePastel
          onClick={reset}
        >
          Reset
        </PrimaryButton>
        <PrimaryButton
          className={classes.button}
          variant="contained"
          color="primary"
          size="medium"
          bluePastel
          onClick={() => {
            onApply(optionValues);
          }}
        >
          Apply
        </PrimaryButton>
      </Grid>
    </Grid>
  );
}

interface Props {
  onClose: () => void;
  onApply: (data: any) => void;
  data: any;
  workingStyles: Resource.WorkingStyle[];
}
