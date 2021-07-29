import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";

import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});
import "jodit/build/jodit.min.css";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Alert from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";
import PrimaryButton from "src/components/PrimaryButton";
import Loading from "src/components/Loading";
import { InfoAlert, TextInput, SelectInput } from "src/components/Admin/FormInputs";
import { JoditUploadButton } from "src/components/Admin/JoditCustomUploadButton";

import { getArticle, editArticle } from "src/api/admin/articles";
import { article_status } from "src/constants/admin/articles";
import { useStyles, StyledTableCell, StyledTableRow } from "src/styles/admin/articles";

export default function EditArticles() {
  const classes = useStyles();
  const router = useRouter();

  // Jodit editor config
  const config = {
    removeButtons: ["image"],
    extraButtons: JoditUploadButton,
  };

  const [articleId, setArticleId] = useState("");

  // Fetch Article data using param
  const {
    status: articleDataStatus,
    data: articleData,
    error: articleDataError,
    refetch: refetchArticleData,
  } = useQuery("articleData", async () => await getArticle(articleId), {
    enabled: articleId ? true : false,
  });

  useEffect(() => {
    router.query.id ? setArticleId(router.query.id?.toString()) : null;
  }, [router.query.id]);

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [preview, setPreview] = useState<any>("");
  const [image, setImage] = useState<File | string>("");

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const getFormDefaultValues = () => ({
    status: "",
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
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: getFormDefaultValues(),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (articleDataStatus === "success") {
      setValue("status", articleData?.status);
      setValue("title", articleData?.title);
      setValue("introduction", articleData?.introduction);
      setValue("page_title", articleData?.page_title);
      setValue("content", articleData?.content);
    }
  }, [articleDataStatus]);

  const onSubmit = async (formValues: { [T: string]: any }) => {
    const { title, page_title, introduction } = formValues;
    const formData = new FormData();

    Object.entries(formValues).map(([key, value]) => formData.append(key, value));
    formData.append(
      "meta_description",
      JSON.stringify({ title: title, page_title: page_title, introduction: introduction }),
    );
    if (image)
      if (image === "remove") formData.append("image", "");
      else formData.append("image", image);

    try {
      const response = await editArticle(formData, articleId);
      if (!response) setInfoAlert({ severity: "error", message: "Error updating article !" });
      else {
        setInfoAlert({ severity: "success", message: "Article updated successfully" });
        setPreview("");
        refetchArticleData();
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating article! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const handleImageChangeClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  const handleImageRemoveClick = () => {
    setImage("remove");
    setPreview(" ");
  };

  // image change
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
        <title>TrueArtists: Admin/Articles/{articleData?.slug ?? articleId}</title>
      </Head>

      <Grid container>
        <Grid item xs={12}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">
              <Link href="/admin/articles">Articles</Link>
            </Typography>
            <Typography variant="h6">{articleData?.slug ?? articleId}</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} className={classes.buttonWrapper}>
          {articleDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : articleDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Articles - ${handleApiErrors(articleDataError)}`}</Alert>
          ) : articleData ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
                    </Grid>

                    <Grid item xs={6}>
                      <SelectInput
                        name="status"
                        control={control}
                        required={true}
                        label="Status"
                        errors={!!errors.status}
                        errorMessage={errors.status?.message}
                        dropDownList={article_status.map((status) => ({ id: status, name: status }))}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <TextInput
                        name="title"
                        register={register}
                        required={true}
                        label="Title *"
                        errors={!!errors.title}
                        errorMessage={errors.title?.message}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <TextInput
                        name="page_title"
                        register={register}
                        required={true}
                        label="Page Title *"
                        errors={!!errors.page_title}
                        errorMessage={errors.page_title?.message}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <TextInput
                        name="introduction"
                        register={register}
                        required={true}
                        multiline={true}
                        label="Introduction *"
                        errors={!!errors.introduction}
                        errorMessage={errors.introduction?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
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
                              // @ts-ignore
                              config={config}
                              value={props?.value ?? ""}
                              onChange={(newContent) => {
                                props.onChange(newContent);
                              }}
                            />
                          )}
                        />

                        {errors.content && (
                          <FormHelperText error>{`Required ! ${errors.content?.message}`}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={4} className={classes.metaWrapper}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Card variant="outlined" className={classes.imageCard}>
                        <CardContent>
                          <Typography>Article image</Typography>
                          <CardMedia
                            className={classes.imageCardMedia}
                            image={preview ? preview : articleData?.image?.image_url ?? "/images/camera.png"}
                          />
                          <input
                            className={classes.fileInput}
                            type={"file"}
                            accept="image/*"
                            ref={hiddenFileInput}
                            onChange={(e) => {
                              if (e.target.files) handleImageChange(e.target.files[0]);
                            }}
                          />
                        </CardContent>
                        <CardActions>
                          <Chip icon={<EditIcon />} label="Change" size="small" onClick={handleImageChangeClick} />
                          <Chip
                            icon={<DeleteOutlineIcon />}
                            label="Remove"
                            size="small"
                            onClick={handleImageRemoveClick}
                          />
                        </CardActions>
                      </Card>
                    </Grid>

                    <Grid item xs={12}>
                      <Card variant="outlined" className={classes.cardItem}>
                        <CardContent>
                          <Typography>Category</Typography>
                          <TableContainer>
                            <Table size="small">
                              <colgroup>
                                <col width="15%" />
                                <col width="auto" />
                              </colgroup>
                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell>
                                    <b>Name </b>
                                  </StyledTableCell>
                                  <StyledTableCell>{articleData?.category?.name}</StyledTableCell>
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12}>
                      <Card variant="outlined" className={classes.cardItem}>
                        <CardContent>
                          <Typography>Tags</Typography>
                          {articleData?.tags?.map((style: string, index: number) => (
                            <Chip label={style} size="small" key={index} className={classes.tagsChips} />
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12}>
                      <Card variant="outlined" className={classes.cardItem}>
                        <CardContent>
                          <Typography>Author</Typography>
                          <TableContainer>
                            <Table size="small">
                              <colgroup>
                                <col width="15%" />
                                <col width="auto" />
                              </colgroup>
                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell>
                                    <b>Name </b>
                                  </StyledTableCell>
                                  <StyledTableCell>{articleData?.user?.full_name}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                  <StyledTableCell>
                                    <b>Email </b>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Link href={`mailto:${articleData?.user?.email}`}>
                                      <a target="_blank" className={classes.listLink}>
                                        {articleData?.user?.email}
                                      </a>
                                    </Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                    <PrimaryButton size="small" fullWidth variant="outlined" primaryColor onClick={handleCancel}>
                      Cancel
                    </PrimaryButton>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <PrimaryButton size="small" fullWidth primaryColor disabled={isSubmitting} type="submit">
                      Save Changes
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          ) : (
            <Alert severity="info">Article record not found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}
