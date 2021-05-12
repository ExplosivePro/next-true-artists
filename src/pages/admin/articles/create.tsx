import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PrimaryButton from "src/components/PrimaryButton";
import { TextInput, InfoAlert } from "src/components/Admin/FormInputs";

import { createArticle } from "./api";
import { useStyles } from "./styles";

export default function CreateNew({ isOpen, setArticleId, refetch }: any) {
  const classes = useStyles();
  const router = useRouter();

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<any>("");

  const getFormDefaultValues = () => ({
    title: "",
    introduction: "",
    page_title: "",
    content: "",
    meta_description: "meta:",
    image: File,
  });

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

  const onSubmit = async (formValues: any) => {
    const payload = { ...formValues, content };
    try {
      const response = await createArticle(payload);
      if (!response) setInfoAlert({ severity: "error", message: "Error creating article !" });
      else {
        setInfoAlert({ severity: "success", message: "Article created successfully" });
        setTimeout(() => {
          router.push(`/admin/articles/${response.id}`);
          setArticleId(response.id);
          refetch();
          handleCancel();
        }, 2500);
        return;
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error creating article! - ${error}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const handleClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  // File input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      setValue("image", fileUploaded);

      const reader = new FileReader();
      reader.readAsDataURL(fileUploaded);
      reader.onloadend = () => setPreview(reader.result);
    }
  };

  const handleCancel = () => {
    isOpen(false);
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
            <Grid container spacing={2}>
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
                <Grid container item justify={"center"}>
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <IconButton onClick={handleClick}>
                        <EditIcon />
                      </IconButton>
                    }
                  >
                    <input className={classes.fileInput} type={"file"} ref={hiddenFileInput} onChange={handleChange} />
                    <Avatar className={classes.avatar} alt="/images/camera.png" src={preview} onClick={handleClick} />
                  </Badge>
                </Grid>
                <Grid container item justify={"center"}>
                  <Typography variant="caption">Add article image</Typography>
                </Grid>
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

              <Grid container item xs={12}>
                <JoditEditor
                  value={content}
                  // onChange={(newContent) => setContent(newContent)}
                  // preferred to use only this option to update the content for performance reasons
                  onBlur={(newContent) => setContent(newContent)}
                />
              </Grid>
            </Grid>
          </DialogContent>

          {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}

          <DialogActions>
            <PrimaryButton variant="outlined" size="small" bluePastel onClick={handleCancel}>
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
