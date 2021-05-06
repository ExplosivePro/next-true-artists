// External
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Material UI Components
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";

// Custom component
import FormInput from "../../FormInput";
import { useYupValidationResolver } from "../../../utils";
import PrimaryButton from "../../PrimaryButton";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import colors from "../../../palette";

import { createArtistClient, createStudioClient } from "../../../api";

// Context
import { Role, useApp, useAuth } from "../../../contexts";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      position: "relative",
    },
    groupInput: {
      marginBottom: "4px",
    },
    titleText: {
      fontWeight: 600,
    },
    titleWrapper: {
      marginBottom: "30px",
      display: "flex",
      alignItems: "center",
    },
    formInput: {
      margin: "12px 0",
    },
    formWrapper: {
      width: "100%",
      height: "100%",
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      "& form": {
        backgroundColor: colors.white,
        padding: "40px",
        borderRadius: "5px",
      },
    },
    buttonWrapper: {
      marginTop: "25px",
    },
    signInText: {
      fontWeight: "bold",
      color: colors.extremeDarkYellow,
      marginLeft: "5px",
      cursor: "pointer",
      fontSize: "14px",
      textDecoration: "underline",
    },
  }),
);

export default function CreateClient() {
  const app = useApp();
  const { getRoleId, user } = useAuth();
  const { push } = useRouter();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required").email("Wrong email format"),
        phoneNumber: yup.string().required("Phone number is required"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  const onSubmit = async ({ name, phoneNumber, email, comments }: SubmitFormData) => {
    let createClientFunction = null;

    if (user?.role === Role.ARTIST) {
      createClientFunction = createArtistClient;
    }

    if (user?.role === Role.STUDIO) {
      createClientFunction = createStudioClient;
    }

    if (createClientFunction) {
      const response = await createClientFunction(getRoleId() as number, {
        name,
        phone_number: phoneNumber,
        email,
        comments,
      });

      const { error, errors } = response;
      // No error happens
      if (!error) {
        push("/dashboard/manage-clients");
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
      }
    }
  };

  return (
    <Container className={classes.root}>
      <div className={classes.formWrapper}>
        <div className={classes.titleWrapper}>
          <IconButton
            onClick={() => {
              push("/dashboard/manage-clients");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography display={"inline"} variant={"h5"} className={classes.titleText}>
            Create Client
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            classes={{ root: classes.formInput }}
            label={"Name"}
            id="name"
            placeholder={"Name"}
            fullWidth
            control={control}
            variant={"outlined"}
            errors={errors.name}
            defaultValue={""}
          />

          <FormInput
            name="email"
            classes={{ root: classes.formInput }}
            label={"Email"}
            id="email"
            placeholder={"Email"}
            fullWidth
            control={control}
            variant={"outlined"}
            errors={errors.email}
            defaultValue={""}
          />

          <FormInput
            name="phoneNumber"
            classes={{ root: classes.formInput }}
            label={"Phone number"}
            id="phoneNumber"
            placeholder={"Phone number"}
            fullWidth
            control={control}
            variant={"outlined"}
            errors={errors.phoneNumber}
            defaultValue={""}
          />

          <FormInput
            name="comments"
            classes={{ root: classes.formInput }}
            label={"Comments"}
            id="comments"
            placeholder={"Comments"}
            fullWidth
            control={control}
            variant={"outlined"}
            errors={errors.comments}
            defaultValue={""}
            multiline={true}
            rows={3}
          />

          <Grid container spacing={2} className={classes.buttonWrapper}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <PrimaryButton
                type={"button"}
                variant="outlined"
                color="primary"
                size="large"
                primaryColor
                fullWidth
                onClick={() => {
                  push("/dashboard/manage-clients");
                }}
              >
                Cancel
              </PrimaryButton>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <PrimaryButton type={"submit"} variant="contained" color="primary" size="large" fullWidth primaryColor>
                Create
              </PrimaryButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

interface SubmitFormData {
  email: string;
  name: string;
  phoneNumber: string;
  comments: string;
}
