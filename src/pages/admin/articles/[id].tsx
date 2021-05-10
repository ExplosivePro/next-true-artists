import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import AdminBody from "src/components/Admin/AdminBody";
import PrimaryButton from "src/components/PrimaryButton";
import Loading from "src/components/Loading";
import { TextInput, SelectInput, InfoAlert } from "src/components/Admin/FormInputs";
import CreateNew from "./create";

import { getArticle, editArticle } from "./api";
import { useStyles } from "./styles";

export default function create() {
  const classes = useStyles();
  const router = useRouter();

  const [articleId, setArticleId] = useState("");

  // Fetch Article data using param
  /* const {
    status: articleDataStatus,
    data: articleData,
    error: articleDataError,
    refetch: refetchArticleData,
  } = useQuery("articleData", async () => await getArticle(articleId), {
    enabled: articleId ? true : false,
  }); */

  useEffect(() => {
    router.query.id ? setArticleId(router.query.id?.toString()) : null;
  }, [router.query.id]);

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const onSubmitStatus = async (status: string) => {
    const payload = { status: status };

    console.log(payload);

    try {
      const response = await editArticle(payload, articleId);
      console.log(response);

      if (!response) setInfoAlert({ severity: "error", message: "Error updating article status !" });
      else setInfoAlert({ severity: "success", message: "Article status updated successfully" });
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating article status! - ${error}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const editModeEnable = () => {
    setIsEditMode(true);
  };

  const handleUpdate = () => {
    setInfoAlert({ severity: "info", message: "Error updating article status !" });
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 3000);
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Articles/{articleId}</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">
              <Link href="/admin/articles">Articles</Link>
            </Typography>
            <Typography variant="h6">{articleId}</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={6} md={2} lg={2}>
          <PrimaryButton bluePastel onClick={() => setIsOpenCreate(true)}>
            Create Article
          </PrimaryButton>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />

          {/* {articleDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : articleDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Articles - ${articleDataError}`}</Alert>
          ) : articleData ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography>
                  <b>Article Details</b>
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Alert severity="info">Article record not found...</Alert>
          )} */}

          <Grid container spacing={2}>
            <Grid item xs={8}>
              {isEditMode ? (
                <ArticleEditing article={[]} isOpen={setIsEditMode} />
              ) : (
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography className={classes.titleText} display="inline">
                      Status
                    </Typography>
                    <Typography className={classes.articleText} display="inline">
                      Article Status{"  "}
                    </Typography>
                    <PrimaryButton
                      size="small"
                      bluePastel
                      // onClick={() => onSubmitStatus(articleData.status === "draft" ? "publish" : "draft")}
                      onClick={handleUpdate}
                    >
                      {/* {article.status === "draft" ? "Publish" : "Set as Draft"} */}
                      Set as Draft
                    </PrimaryButton>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
                  </Grid>

                  <Grid item xs={12}>
                    <Card className={classes.buttonWrapper} variant="outlined" onClick={editModeEnable}>
                      <CardContent>
                        <Grid container item xs={12} justify="center">
                          (<i>Click to edit</i>)
                        </Grid>

                        <Typography className={classes.titleText}>Title</Typography>
                        <Typography className={classes.articleText}>Article 1: Title.</Typography>

                        <Typography className={classes.titleText}>Introduction</Typography>
                        <Typography className={classes.articleText}>Article 1: Introduction.</Typography>

                        <Typography className={classes.titleText}>Page Title</Typography>
                        <Typography className={classes.articleText}>Article 1: Page Title.</Typography>

                        <Typography className={classes.titleText}>Content</Typography>
                        <Typography className={classes.articleText}>Article 1: Content.</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid item xs={4} className={classes.metaWrapper}>
              <Typography className={classes.titleText}>Article Meta</Typography>
              <Typography className={classes.articleText}>Article Meta.</Typography>
            </Grid>
          </Grid>
        </Grid>
        {isOpenCreate ? <CreateNew isOpen={setIsOpenCreate} /> : null}
      </Grid>
    </AdminBody>
  );
}

function ArticleEditing({ article, isOpen }: { article: any; isOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const classes = useStyles();

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const [content, setContent] = useState("Content here...");

  const getFormDefaultValues = () => ({
    title: "",
    introduction: "",
    page_title: "",
    status: "",
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
      const response = await editArticle(payload, article.id);
      console.log(response);

      if (!response) setInfoAlert({ severity: "error", message: "Error updating article !" });
      else setInfoAlert({ severity: "success", message: "Article updated successfully" });
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating article! - ${error}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const editModeClose = () => {
    isOpen(false);
  };

  const handleAlert = () => {
    setInfoAlert({ severity: "info", message: "Sample alert message" });
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 3000);
  };

  return (
    <Grid container direction="column" spacing={2}>
      {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Grid container item xs={12} md={6} lg={3} justify="space-around" className={classes.buttonWrapper}>
          <PrimaryButton variant="outlined" size="small" bluePastel onClick={handleAlert}>
            Alerts
          </PrimaryButton>

          <PrimaryButton variant="outlined" size="small" bluePastel onClick={editModeClose}>
            Cancel
          </PrimaryButton>

          <PrimaryButton size="small" bluePastel disabled={isSubmitting} type="submit">
            Save Changes
          </PrimaryButton>
        </Grid>
      </form>
    </Grid>
  );
}
