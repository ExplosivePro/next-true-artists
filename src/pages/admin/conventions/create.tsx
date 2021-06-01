import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";
import PrimaryButton from "src/components/PrimaryButton";
import { TextInput, InfoAlert } from "src/components/Admin/FormInputs";

import { createConvention } from "./api";
import { useStyles } from "./styles";

import getConfig from "next/config";

export default function CreateNew() {
  const classes = useStyles();
  const router = useRouter();
  const PUBLIC_BASE = getConfig().publicRuntimeConfig.PUBLIC_PAGE_BASE_URL;

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  const [preview, setPreview] = useState<any>("");
  const [avatar, setAvatar] = useState<File | string>("");

  const getFormDefaultValues = () => ({
    status: "",
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: getFormDefaultValues(),
    shouldUnregister: false,
  });

  const onSubmit = async (formValues: { [T: string]: any }) => {
    const { description, start_date, name } = formValues;
    const formData = new FormData();

    Object.entries(formValues).map(([key, value]) => formData.append(key, value));
    formData.append(
      "meta_description",
      JSON.stringify({ description: description, start_date: start_date, name: name }),
    );
    if (avatar) formData.append("avatar", avatar);

    try {
      const response = await createConvention(formData);
      if (!response) setInfoAlert({ severity: "error", message: "Error creating convention!" });
      else {
        setInfoAlert({ severity: "success", message: "Convention created successfully" });
        setTimeout(() => {
          router.push(`${PUBLIC_BASE}/conventions${response.name}`);
        }, 2500);
        return;
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error creating convention! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const handleAvatarClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  const handleAvatarRemoveClick = () => {
    setAvatar("remove");
    setPreview("");
  };

  // File input change
  const handleAvatarChange = (fileUploaded: File) => {
    setAvatar(fileUploaded);
    const reader = new FileReader();
    reader.readAsDataURL(fileUploaded);
    reader.onloadend = () => setPreview(reader.result);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Conventions/Create</title>
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">
              <Link href="/admin/conventions">Conventions</Link>
            </Typography>
            <Typography variant="h6">New Convention</Typography>
          </Breadcrumbs>
        </Grid>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}

                <Grid item xs={12}>
                  <TextInput
                    name="name"
                    register={register}
                    required={true}
                    label="Name *"
                    errors={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    name="description"
                    register={register}
                    required={true}
                    label="Description *"
                    errors={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    name="start_date"
                    register={register}
                    required={true}
                    label="Start Date *"
                    errors={!!errors.start_date}
                    errorMessage={errors.start_date?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    name="end_date"
                    register={register}
                    required={true}
                    label="End Date *"
                    errors={!!errors.start_date}
                    errorMessage={errors.start_date?.message}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container item justify={"center"}>
                <Card variant="outlined" className={classes.imageCard && classes.addConventionImage}>
                  <CardContent>
                    <Typography>Upload Convention image</Typography>
                    <CardMedia
                      className={classes.imageCardMedia}
                      image={preview ? preview : "/images/camera.png"}
                      onClick={handleAvatarClick}
                    />
                    <input
                      className={classes.fileInput}
                      type={"file"}
                      ref={hiddenFileInput}
                      onChange={(e) => {
                        if (e.target.files) handleAvatarChange(e.target.files[0]);
                      }}
                    />
                    {preview ? (
                      <Chip
                        icon={<DeleteOutlineIcon />}
                        label="Remove"
                        size="small"
                        onClick={handleAvatarRemoveClick}
                      />
                    ) : null}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.buttonWrapper}>
            <Grid item xs={12} sm={6} md={2}>
              <PrimaryButton size="small" fullWidth variant="outlined" primaryColor onClick={handleCancel}>
                Cancel
              </PrimaryButton>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <PrimaryButton size="small" fullWidth primaryColor disabled={isSubmitting} type="submit">
                Save
              </PrimaryButton>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </AdminBody>
  );
}
