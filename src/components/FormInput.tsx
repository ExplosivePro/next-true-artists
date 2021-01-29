// External
import React, { useState } from "react";
import clsx from "clsx";

import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import ErrorMessage from "./ErrorMessage";
import { Controller } from "react-hook-form";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";

type CustomTextFieldProps = TextFieldProps & { control: any; errors: any };

export default function FormInput(props: CustomTextFieldProps) {
  const customProps = { ...props };
  // Delete invalid props for text field so that material ui wont complain with any alert
  delete customProps.control;
  delete customProps.errors;
  delete customProps.defaultValue;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      name={props.name || ""}
      control={props.control}
      defaultValue={props.defaultValue}
      render={({ value, onChange }) => {
        return (
          <>
            {customProps.type !== "password" && (
              <TextField
                {...customProps}
                className={clsx(props.className, `${props.errors && props.errors.message ? "error" : ""}`)}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
            )}

            {customProps.type === "password" && (
              <FormControl
                variant="outlined"
                fullWidth
                className={clsx(props.className, `${props.errors && props.errors.message ? "error" : ""}`)}
              >
                <InputLabel htmlFor="outlined-adornment-password">{customProps.label}</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            )}
            <ErrorMessage>{props.errors && props.errors.message}</ErrorMessage>
          </>
        );
      }}
    />
  );
}
