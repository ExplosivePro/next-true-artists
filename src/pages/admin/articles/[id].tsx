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
import "jodit/build/jodit.min.css";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Alert from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

import AdminBody from "src/components/Admin/AdminBody";
import PrimaryButton from "src/components/PrimaryButton";
import Loading from "src/components/Loading";
import { InfoAlert } from "src/components/Admin/FormInputs";

import { getArticle } from "./api";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

export default function EditArticles() {
  const classes = useStyles();
  const router = useRouter();

  const [articleId, setArticleId] = useState("");

  // Fetch Article data using param
  const { status: articleDataStatus, data: articleData, error: articleDataError } = useQuery(
    "articleData",
    async () => await getArticle(articleId),
    {
      enabled: articleId ? true : false,
    },
  );

  useEffect(() => {
    router.query.id ? setArticleId(router.query.id?.toString()) : null;
  }, [router.query.id]);

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const config: any = { readonly: true, toolbar: false, statusbar: false };

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
          <PrimaryButton bluePastel onClick={() => router.push(`/admin/articles/edit/${articleData?.id}`)}>
            Edit Article
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
                  <Grid item xs={12} md={6}>
                    {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
                  </Grid>

                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>Title</Typography>
                    <Typography variant="h6" className={classes.articleText} gutterBottom>
                      {articleData?.title}
                    </Typography>

                    <Typography className={classes.titleText}>Page Title</Typography>
                    <Typography variant="body1" className={classes.articleText} gutterBottom>
                      {articleData?.page_title}
                    </Typography>

                    <Typography className={classes.titleText}>Introduction</Typography>
                    <Typography variant="body1" className={classes.articleText} gutterBottom>
                      {articleData?.introduction}
                    </Typography>

                    <Typography className={classes.titleText}>Content</Typography>

                    <Grid container item>
                      <JoditEditor value={articleData?.content} config={config} />
                    </Grid>
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
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Alert severity="info">Article record not found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}
