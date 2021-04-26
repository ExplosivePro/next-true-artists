// External
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Material UI Components
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

// Styles
const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: "100%",
      marginTop: "12px",
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelection({ name, optionList, onChange, value }: Props) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setPersonName(event.target.value as string[]);
    onChange(event.target.value as string[]);
  };

  return (
    <FormControl variant={"outlined"} className={classes.formControl}>
      <InputLabel id={name}>{name}</InputLabel>
      <Select
        labelId={name}
        id="specialty"
        multiple
        value={value}
        onChange={handleChange}
        label={name}
        renderValue={(selected) => (selected as string[]).join(", ")}
        MenuProps={MenuProps}
      >
        {optionList.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={value.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

interface Props {
  name: string;
  optionList: string[];
  onChange: (event: any) => void;
  value: string[];
}
