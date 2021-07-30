import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Head from "next/head";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";
import PrimaryButton from "src/components/PrimaryButton";
import { TextInput, PasswordInput, InfoAlert } from "src/components/Admin/FormInputs";

import { useStyles } from "src/styles/admin/users";
import { createUser } from "src/api/admin/users";

export default function User() {
  const router = useRouter();
  const classes = useStyles();

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const getFormDefaultValues = () => ({
    firstName: "",
    lastName: "",
    otherNames: "",
    email: "",
    email_confirmation: "",
    password: "",
    password_confirmation: "",
  });

  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setError,
    clearErrors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: getFormDefaultValues(),
    shouldUnregister: false,
  });

  const onSubmit = async (formValues: { [T: string]: any }) => {
    // Validate form values
    if (validateForm()) return;

    // Process payload
    const formData = new FormData();
    const payload = processPayload(formValues);
    Object.entries(payload).map(([key, value]) => formData.append(key, value));

    try {
      const response = await createUser(formData);
      if (!response) setInfoAlert({ severity: "error", message: "Error creating User !" });
      else {
        setInfoAlert({ severity: "success", message: "User created successfully" });
        setTimeout(() => {
          router.push(`/admin/users/${response.id}`);
        }, 2500);
        return;
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error creating User! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const validateForm = () => {
    let errors = false;

    // Validate presence of recipients and/or custom emails
    if (getValues("email") !== getValues("email_confirmation")) {
      setError("email_confirmation", { type: "manual", message: `Email mismatch !` });
      setError("email", { type: "manual", message: `Email mismatch !` });

      setTimeout(() => {
        clearErrors("email");
        clearErrors("email_confirmation");
      }, 3500);
      errors = true;
    }

    // Validate presence of send-when and/or send-now
    if (getValues("password") !== getValues("password_confirmation")) {
      setError("password", { type: "manual", message: `Password mismatch !` });
      setError("password_confirmation", { type: "manual", message: `Password mismatch !` });

      setTimeout(() => {
        clearErrors("password");
        clearErrors("password_confirmation");
      }, 3500);
      errors = true;
    }
    return errors;
  };

  const processPayload = (formValues: { [T: string]: any }) => {
    const { firstName, lastName, otherNames, email, password, password_confirmation } = formValues;
    const full_name = `${firstName} ${otherNames} ${lastName}`;
    const formData = { full_name, email, password, password_confirmation };
    return formData;
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/User - New User</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Breadcrumbs>
            <Typography variant="body1">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="body1">
              <Link href="/admin/users">Users</Link>
            </Typography>
            <Typography variant="body1">New User</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card variant="outlined" className={classes.gridSpacer}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextInput
                              name="firstName"
                              register={register}
                              required={true}
                              label="First Name*"
                              errors={!!errors.firstName}
                              errorMessage={errors.firstName?.message}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextInput
                              name="lastName"
                              register={register}
                              required={true}
                              label="Last Name*"
                              errors={!!errors.lastName}
                              errorMessage={errors.lastName?.message}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <TextInput
                          name="otherNames"
                          register={register}
                          required={false}
                          label="Other Names"
                          errors={!!errors.otherNames}
                          errorMessage={errors.otherNames?.message}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextInput
                          name="email"
                          register={register}
                          required={true}
                          label="Email Address *"
                          errors={!!errors.email}
                          errorMessage={errors.email?.message}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextInput
                          name="email_confirmation"
                          register={register}
                          required={true}
                          label="Confirm Email Address *"
                          errors={!!errors.email_confirmation}
                          errorMessage={errors.email_confirmation?.message}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <PasswordInput
                          name="password"
                          register={register}
                          required={true}
                          label="Password *"
                          errors={!!errors.password}
                          errorMessage={errors.password?.message}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <PasswordInput
                          name="password_confirmation"
                          register={register}
                          required={true}
                          label="Confirm Password *"
                          errors={!!errors.password_confirmation}
                          errorMessage={errors.password_confirmation?.message}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Grid container justify="space-around" spacing={2} className={classes.buttonWrapper}>
                      <Grid item xs={8}>
                        <PrimaryButton fullWidth size="small" primaryColor disabled={isSubmitting} type="submit">
                          Create User
                        </PrimaryButton>
                      </Grid>

                      <Grid item xs={8}>
                        <PrimaryButton fullWidth variant="outlined" size="small" primaryColor onClick={handleCancel}>
                          Cancel
                        </PrimaryButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        </Grid>
      </Grid>
    </AdminBody>
  );
}
