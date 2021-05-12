import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { useRouter } from "next/router";
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
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

import AdminBody from "src/components/Admin/AdminBody";
import PrimaryButton from "src/components/PrimaryButton";
import Loading from "src/components/Loading";
import { InfoAlert } from "src/components/Admin/FormInputs";

import CreateNew from "./create";
import { getArticle, editArticle, deleteArticle } from "./api";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

export default function create() {
  const classes = useStyles();
  const router = useRouter();

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

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [editableItem, setEditableItem] = useState("");

  const [content, setContent] = useState("Content here...");
  const config: any = { readonly: false, toolbar: false, statusbar: false };

  const onSubmit = async (field: string, value: string) => {
    const payload = { [field]: value };
    try {
      const response = await editArticle(payload, articleId);
      if (!response) setInfoAlert({ severity: "error", message: "Error updating article !" });
      else {
        setInfoAlert({ severity: "success", message: "Article updated successfully" });
        refetchArticleData();
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating article! - ${error}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const onDelete = async () => {
    if (!confirm("Deleting Article \n\n" + articleData?.title + "?")) return;
    try {
      const response = await deleteArticle(articleId);
      if (response) setInfoAlert({ severity: "error", message: "Error deleting article !" });
      else {
        setInfoAlert({ severity: "success", message: "Article deleted successfully" });
        setTimeout(() => {
          router.push(`/admin/articles`);
        }, 2500);
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error deleting article! - ${error}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const EditField = ({ field, value, variant }: any) =>
    field === editableItem ? (
      <TextField
        defaultValue={value}
        variant="outlined"
        fullWidth
        autoFocus
        multiline
        size="small"
        onBlur={(e) => {
          onSubmit(field, e.target.value);
          setEditableItem("");
        }}
      />
    ) : (
      <Typography variant={variant} className={classes.articleText} gutterBottom onClick={() => setEditableItem(field)}>
        {value}
      </Typography>
    );

  const handleContentUpdate = () => {
    setTimeout(() => {
      onSubmit("content", content);
    }, 500);
    setEditableItem("");
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Articles/{articleData?.slug ?? articleId}</title>
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
            <Typography variant="h6">{articleData?.slug ?? articleId}</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={6} md={2} lg={2}>
          <PrimaryButton bluePastel onClick={() => setIsOpenCreate(true)}>
            Create Article
          </PrimaryButton>
        </Grid>

        <Grid item xs={12} className={classes.buttonWrapper}>
          {articleDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : articleDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Articles - ${articleDataError}`}</Alert>
          ) : articleData ? (
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Card variant="outlined">
                      <CardHeader
                        style={{ textTransform: "capitalize" }}
                        title={articleData?.status}
                        action={
                          <Grid container spacing={2} className={classes.statusChip}>
                            <Grid item>
                              <PrimaryButton
                                size="small"
                                bluePastel
                                onClick={() =>
                                  onSubmit("status", articleData?.status === "draft" ? "publish" : "draft")
                                }
                              >
                                {articleData?.status === "draft" ? "Publish" : "Set as Draft"}
                              </PrimaryButton>
                            </Grid>

                            <Grid item>
                              <PrimaryButton size="small" yellow onClick={() => onSubmit("status", "flagged")}>
                                Flag
                              </PrimaryButton>
                            </Grid>
                          </Grid>
                        }
                      />
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
                  </Grid>

                  <Grid item xs={12}>
                    <Card className={classes.articleEditWrapper} variant="outlined">
                      <CardContent>
                        <Typography className={classes.titleText}>Title</Typography>
                        <EditField field="title" value={articleData?.title} variant="h6" />
                        <Typography className={classes.titleText}>Page Title</Typography>
                        <EditField field="page_title" value={articleData?.page_title} variant="body1" />
                        <Typography className={classes.titleText}>Introduction</Typography>
                        <EditField field="introduction" value={articleData?.introduction} variant="body1" />

                        <Typography className={classes.titleText}>Content</Typography>
                        {editableItem === "content" ? (
                          <React.Fragment>
                            <Grid container item xs={12}>
                              <JoditEditor
                                value={articleData?.content}
                                // onChange={(newContent) => setContent(newContent)}
                                // preferred to use only this option to update the content for performance reasons
                                onBlur={(newContent) => setContent(newContent)}
                              />
                            </Grid>

                            <Grid container className={classes.buttonWrapper} spacing={2}>
                              <Grid item>
                                <PrimaryButton size="small" bluePastel onClick={handleContentUpdate}>
                                  Save Changes
                                </PrimaryButton>
                              </Grid>

                              <Grid item>
                                <PrimaryButton
                                  variant="outlined"
                                  size="small"
                                  bluePastel
                                  onClick={() => setEditableItem("")}
                                >
                                  Cancel
                                </PrimaryButton>
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        ) : (
                          <Grid
                            container
                            item
                            className={classes.articleContent}
                            onClick={() => setEditableItem("content")}
                          >
                            <JoditEditor value={articleData?.content} config={config} />
                          </Grid>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4} className={classes.metaWrapper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Card variant="outlined" className={classes.imageCard}>
                      <CardContent>
                        <Typography className={classes.titleText}>Article image</Typography>
                        <CardMedia
                          className={classes.imageCardMedia}
                          image={articleData?.image?.image_url ?? "/images/camera.png"}
                          title={articleData?.image?.name}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card variant="outlined" className={classes.cardItem}>
                      <CardContent>
                        <Typography className={classes.titleText}>Category</Typography>
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
                        <Typography className={classes.titleText}>Tags</Typography>
                        {articleData?.tags?.map((style: string, index: number) => (
                          <Chip label={style} size="small" key={index} className={classes.tagsChips} />
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card variant="outlined" className={classes.cardItem}>
                      <CardContent>
                        <Typography className={classes.titleText}>Author</Typography>
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
                                  <Link href={`mailto:${articleData?.user?.email}`}>{articleData?.user.email}</Link>
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid container justify="center">
                          <Grid item xs={8}>
                            <PrimaryButton fullWidth yellow onClick={onDelete}>
                              Delete Article
                            </PrimaryButton>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Alert severity="info">Article record not found...</Alert>
          )}
        </Grid>
        {isOpenCreate ? <CreateNew isOpen={setIsOpenCreate} /> : null}
      </Grid>
    </AdminBody>
  );
}
