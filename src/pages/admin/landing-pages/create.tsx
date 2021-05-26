import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});
import "jodit/build/jodit.min.css";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
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

import { createLandingPage } from "./api";
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
    page_key: "",
    title: "",
    page_title: "",
    content: "",
  });

  const {
    register,
    handleSubmit,
    errors,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: getFormDefaultValues(),
    shouldUnregister: false,
  });

  const onSubmit = async (formValues: { [T: string]: any }) => {
    const { title, page_title, page_key } = formValues;
    const formData = new FormData();

    Object.entries(formValues).map(([key, value]) => formData.append(key, value));
    formData.append("meta_description", JSON.stringify({ title: title, page_title: page_title, page_key: page_key }));
    if (avatar) formData.append("avatar", avatar);

    try {
      const response = await createLandingPage(formData);
      if (!response) setInfoAlert({ severity: "error", message: "Error creating landing page!" });
      else {
        setInfoAlert({ severity: "success", message: "Landing page created successfully" });
        setTimeout(() => {
          router.push(`${PUBLIC_BASE}/landing_pages${response.page_key}`);
        }, 2500);
        return;
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error creating landing page! - ${handleApiErrors(error)}` });
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
        <title>TrueArtists: Admin/Landing Pages</title>
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">
              <Link href="/admin/landing-pages">Landing Pages</Link>
            </Typography>
            <Typography variant="h6">New Landing Page</Typography>
          </Breadcrumbs>
        </Grid>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}

                <Grid item xs={12}>
                  <TextInput
                    name="page_key"
                    register={register}
                    required={true}
                    label="Page url (Example /tattoos/back) *"
                    errors={!!errors.page_key}
                    errorMessage={errors.page_key?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    name="title"
                    register={register}
                    required={true}
                    label="Header Title *"
                    errors={!!errors.title}
                    errorMessage={errors.title?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    name="page_title"
                    register={register}
                    required={true}
                    label="Page Title *"
                    errors={!!errors.page_title}
                    errorMessage={errors.page_title?.message}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container item justify={"center"}>
                <Card variant="outlined" className={classes.imageCard && classes.addLandingPageImage}>
                  <CardContent>
                    <Typography>Upload LP image</Typography>
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

          <Grid container item xs={12} className={classes.buttonWrapper}>
            <FormControl fullWidth error={errors.content ? true : false} required={true}>
              <FormHelperText>
                <b>Page Content</b>
              </FormHelperText>
              <Controller
                name={"content"}
                control={control}
                rules={{ required: true }}
                render={(props: any) => (
                  <JoditEditor
                    value={props?.value ?? ""}
                    onChange={(newContent) => {
                      props.onChange(newContent);
                    }}
                  />
                )}
              />

              {errors.content && <FormHelperText error>{`Required ! ${errors.content?.message}`}</FormHelperText>}
              <Typography variant="caption" gutterBottom>
                <i>(Drag and drop or copy and paste images)</i>
              </Typography>
            </FormControl>
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
