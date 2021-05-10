import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PrimaryButton from "src/components/PrimaryButton";
import { TextInput, SelectInput, InfoAlert } from "src/components/Admin/FormInputs";

import { createArticle } from "./api";
import { useStyles } from "./styles";

export default function CreateNew({ isOpen }: any) {
  const classes = useStyles();

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const [content, setContent] = useState("Content here...");

  const getFormDefaultValues = () => ({
    title: "",
    introduction: "",
    page_title: "",
    status: "draft", // default
    content: "",
    category_id: 1,
    meta_description: "meta:",
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

  const onSubmit = async (formValues: Admin.Articles) => {
    const payload = { ...formValues, content };
    console.log(payload);

    try {
      const response = await createArticle(payload);
      console.log(response);

      if (!response) setInfoAlert({ severity: "error", message: "Error creating article !" });
      else setInfoAlert({ severity: "success", message: "Article created successfully" });
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error creating article! - ${error}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const handleCancel = () => {
    console.log("Editor closed");
    isOpen(false);
  };

  const handleAlert = () => {
    setInfoAlert({ severity: "info", message: "Sample alert message" });
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 3000);
  };

  return (
    <React.Fragment>
      <Dialog open={true} fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className={classes.titleText}>
            Create new article
            <IconButton className={classes.closeButton} onClick={handleCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="title"
                  register={register}
                  required={true}
                  label="Title *"
                  errors={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SelectInput
                  disabled
                  name="status"
                  control={control}
                  label="Status *"
                  errors={!!errors.status}
                  errorMessage={errors.status?.message}
                  dropDownList={[
                    { id: "draft", name: "Draft" },
                    { id: "published", name: "Published" },
                  ]}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
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

              <Grid item xs={12}>
                <JoditEditor
                  value={content}
                  // onChange={(newContent) => setContent(newContent)}
                  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                />
              </Grid>
            </Grid>
          </DialogContent>

          {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}

          <DialogActions>
            <PrimaryButton variant="outlined" size="small" bluePastel onClick={handleAlert}>
              Cancel
            </PrimaryButton>
            <PrimaryButton size="small" bluePastel disabled={isSubmitting} type="submit">
              Save
            </PrimaryButton>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
