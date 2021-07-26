// External
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/router";
import moment from "moment";

// Material UI Components
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Custom component
import FormInput from "../../FormInput";
import { useYupValidationResolver } from "../../../utils";
import PrimaryButton from "../../PrimaryButton";
import MultipleSelection from "../../ArtistProfile/MutilpleSelection";
import SettingList from "../../RightBarRegisterBusinessSettings/SettingList";

import colors from "../../../palette";

import {
  createArtistClient,
  createStudioClient,
  getArtistClientDetail,
  getStudioClientDetail,
  updateArtistClient,
  updateStudioClient,
} from "../../../api";

// Context
import { Role, useApp, useAuth } from "../../../contexts";

import { referenceList, clientSettings } from "../../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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

// Get initial value for setting list
const getDefaultValue = (values: any) => {
  const checkList: any[] = [];

  clientSettings.map((item) => {
    item.settings.map((setting: any) => {
      if (values && values[setting.name]) {
        checkList.push(setting.name);
      } else {
        // Convert inactive to active value
        if (values && setting.name === "active" && !values["inactive"]) {
          checkList.push(setting.name);
        } else {
          // Set default value
          if (setting.defaultValue) {
            checkList.push(setting.name);
          }
        }
      }
    });
  });

  return checkList;
};

export default function CreateClient({ edit = false }: Props) {
  const app = useApp();
  const { getRoleId, user } = useAuth();
  const { push, query } = useRouter();

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
  const { control, handleSubmit, errors, setValue } = useForm({ resolver });
  const [referalSources, setReferalSources] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>(getDefaultValue(null));

  const onSubmit = async ({ name, phoneNumber, email, comments, zipCode, dob }: SubmitFormData) => {
    if (edit) {
      let updateClientFunction = null;

      if (user?.role === Role.ARTIST) {
        updateClientFunction = updateArtistClient;
      }

      if (user?.role === Role.STUDIO) {
        updateClientFunction = updateStudioClient;
      }

      if (updateClientFunction) {
        const response = await updateClientFunction(getRoleId() as number, parseInt(query.id as string), {
          name,
          phone_number: phoneNumber,
          email,
          date_of_birth: dob,
          comments,
          zip_code: zipCode,
          email_notifications: checked.includes("email_notifications"),
          phone_notifications: checked.includes("phone_notifications"),
          marketing_emails: checked.includes("marketing_emails"),
          referral_source: referalSources.join(","),
          inactive: !checked.includes("active"),
        });

        const { error, errors } = response;
        // No error happens
        if (!error) {
          push("/dashboard/manage-clients");
        } else {
          app.showErrorDialog(
            true,
            errors ? errors.toString() : "We had trouble updating this record. Please try again",
          );
        }
      }
    } else {
      // Create
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
          date_of_birth: dob,
          comments,
          zip_code: zipCode,
          email_notifications: checked.includes("email_notifications"),
          phone_notifications: checked.includes("phone_notifications"),
          marketing_emails: checked.includes("marketing_emails"),
          referral_source: referalSources.join(","),
          inactive: !checked.includes("active"),
        });

        const { error, errors } = response;
        // No error happens
        if (!error) {
          push("/dashboard/manage-clients");
        } else {
          app.showErrorDialog(
            true,
            errors ? errors.toString() : "We had trouble creating this record. Please try again",
          );
        }
      }
    }
  };

  // On multi selection change
  const onSelectionChange = (value: string[]) => {
    setReferalSources(value);
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

  const getClientDetail = async (id: number) => {
    let getClientFunction = null;

    if (user?.role === Role.ARTIST) {
      getClientFunction = getArtistClientDetail;
    }

    if (user?.role === Role.STUDIO) {
      getClientFunction = getStudioClientDetail;
    }

    if (getClientFunction) {
      const response = await getClientFunction(getRoleId() as number, id);

      const { data, error } = response;
      if (!error) {
        setValue("email", data.email);
        setValue("phoneNumber", data.phone_number);
        setValue("name", data.name);
        setValue("comments", data.comments || "");
        setValue("zipCode", data.zip_code || "");
        setReferalSources(data?.referral_source ? data?.referral_source.split(",") : []);
        setChecked(getDefaultValue(data));
        setValue("dob", moment(data?.date_of_birth || new Date()).format("YYYY-MM-DD"));
      } else {
        push("/dashboard/manage-clients");
      }
    }
  };

  useEffect(() => {
    // Get client detail in edit mode
    if (edit) {
      getClientDetail(parseInt(query.id as string));
    }
  }, []);

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
            {edit ? "Edit" : "Create"} Client
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
            name="dob"
            type={"date"}
            classes={{ root: classes.formInput }}
            label={"Date Of Birth"}
            id="dob"
            placeholder={"Date of birth"}
            fullWidth
            control={control}
            variant={"outlined"}
            errors={errors.dob}
            defaultValue={moment().format("YYYY-MM-DD")}
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
            name="zipCode"
            classes={{ root: classes.formInput }}
            label={"Zipcode or city"}
            id="zipCode"
            placeholder={"Zipcode or city"}
            fullWidth
            control={control}
            variant={"outlined"}
            errors={errors.zipCode}
            defaultValue={""}
          />

          <MultipleSelection
            name={"Referral source"}
            className={classes.formInput}
            value={referalSources}
            optionList={referenceList.map((item) => item.value)}
            onChange={onSelectionChange}
          />

          {clientSettings.map((setting: any, index) => {
            return (
              <SettingList
                key={index}
                id={setting.name}
                groupName={setting.groupName}
                items={setting.settings}
                checked={checked}
                handleToggle={handleToggle}
              />
            );
          })}

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
                {edit ? "Save" : "Create"}
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
  zipCode: string;
  dob: string;
}

interface Props {
  edit?: boolean;
}
