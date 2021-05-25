import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Head from "next/head";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import AdminBody from "src/components/Admin/AdminBody";
import Loading from "src/components/Loading";
import PrimaryButton from "src/components/PrimaryButton";
import { TextInput, InfoAlert } from "src/components/Admin/FormInputs";

import { useStyles } from "./styles";
import { getStyle, updateStyle } from "./api";

export default function Style() {
  const router = useRouter();
  const classes = useStyles();

  const [styleId, setStyleId] = useState("");

  // Fetch Style data using param
  const { status: styleDataStatus, data: styleData, error: styleDataError, refetch: refetchStyleData } = useQuery(
    "styleData",
    async () => await getStyle(styleId),
    {
      enabled: styleId ? true : false,
    },
  );

  useEffect(() => {
    router.query.id ? setStyleId(router.query.id?.toString()) : null;
  }, [router.query.id]);

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const getFormDefaultValues = () => ({ name: "" });

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: getFormDefaultValues(),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (styleDataStatus === "success") {
      setValue("name", styleData?.name);
    }
  }, [styleDataStatus]);

  const onSubmit = async (formValues: Admin.Style) => {
    try {
      const response = await updateStyle(formValues, styleData?.id);
      if (!response) setInfoAlert({ severity: "error", message: "Error updating Style !" });
      else {
        setInfoAlert({ severity: "success", message: "Style updated successfully" });
        refetchStyleData();
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating Style! - ${error}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Style - {styleData?.slug}</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">
              <Link href="/admin/styles">Styles</Link>
            </Typography>
            <Typography variant="h6">{styleData?.slug ?? styleId}</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.buttonWrapper} />
          {styleDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : styleDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Styles - ${styleDataError}`}</Alert>
          ) : styleData ? (
            <Grid container spacing={2} className={classes.buttonWrapper}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <Typography variant="h6">
                    <b>Edit Style</b>
                  </Typography>
                  {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                      <TextInput
                        name="name"
                        register={register}
                        required={true}
                        label="Name *"
                        errors={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                    </CardContent>
                    <CardActions>
                      <Grid container spacing={2}>
                        <Grid item>
                          <PrimaryButton variant="outlined" size="small" primaryColor onClick={handleCancel}>
                            Cancel
                          </PrimaryButton>
                        </Grid>

                        <Grid item>
                          <PrimaryButton size="small" primaryColor disabled={isSubmitting} type="submit">
                            Update Style
                          </PrimaryButton>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </form>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Alert severity="info">Style record not found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}
