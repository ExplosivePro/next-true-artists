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

import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";
import PrimaryButton from "src/components/PrimaryButton";
import { TextInput, InfoAlert } from "src/components/Admin/FormInputs";

import { createArticle } from "src/api/admin/articles";
import { useStyles } from "src/styles/admin/articles";

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
  const [image, setImage] = useState<File | string>("");

  const getFormDefaultValues = () => ({
    title: "",
    introduction: "",
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
    const { title, page_title, introduction } = formValues;
    const formData = new FormData();

    Object.entries(formValues).map(([key, value]) => formData.append(key, value));
    formData.append(
      "meta_description",
      JSON.stringify({ title: title, page_title: page_title, introduction: introduction }),
    );
    if (image) formData.append("image", image);

    try {
      const response = await createArticle(formData);
      if (!response) setInfoAlert({ severity: "error", message: "Error creating article !" });
      else {
        setInfoAlert({ severity: "success", message: "Article created successfully" });
        setTimeout(() => {
          router.push(`${PUBLIC_BASE}/articles/${response.slug}`);
        }, 2500);
        return;
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error creating article! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const handleImageClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  // File input change
  const handleImageChange = (fileUploaded: File) => {
    setImage(fileUploaded);
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
        <title>TrueArtists: Admin/Articles</title>
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">
              <Link href="/admin/articles">Articles</Link>
            </Typography>
            <Typography variant="h6">New Article</Typography>
          </Breadcrumbs>
        </Grid>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
                <Grid item xs={12} md={8}>
                  <TextInput
                    name="title"
                    register={register}
                    required={true}
                    label="Title *"
                    errors={!!errors.title}
                    errorMessage={errors.title?.message}
                  />
                </Grid>

                <Grid item xs={12} md={8}>
                  <TextInput
                    name="page_title"
                    register={register}
                    required={true}
                    label="Page Title *"
                    errors={!!errors.page_title}
                    errorMessage={errors.page_title?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    multiline={true}
                    name="introduction"
                    register={register}
                    required={true}
                    label="Introduction *"
                    errors={!!errors.introduction}
                    errorMessage={errors.introduction?.message}
                  />
                  <Typography variant="caption">
                    <i>Provide a short description of the article.</i>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <Grid container item justify={"center"}>
                <Card variant="outlined" className={classes.imageCard && classes.addArticleImage}>
                  <CardContent>
                    <Typography>Article image</Typography>
                    <CardMedia
                      className={classes.imageCardMedia}
                      image={preview ? preview : "/images/camera.png"}
                      onClick={handleImageClick}
                    />
                    <input
                      className={classes.fileInput}
                      type={"file"}
                      ref={hiddenFileInput}
                      onChange={(e) => {
                        if (e.target.files) handleImageChange(e.target.files[0]);
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid container item justify={"center"}>
                <Typography variant="caption">Add article image</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs={12} className={classes.buttonWrapper}>
            <FormControl fullWidth error={errors.content ? true : false} required={true}>
              <FormHelperText>
                <b>Content</b>
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
            <Grid item xs={12} md={2}>
              <PrimaryButton size="small" fullWidth variant="outlined" primaryColor onClick={handleCancel}>
                Cancel
              </PrimaryButton>
            </Grid>

            <Grid item xs={12} md={3}>
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
