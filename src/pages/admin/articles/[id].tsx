import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";

import AdminBody from "src/components/Admin/AdminBody";
import Loading from "src/components/Loading";

import { getArticleList } from "./api";
import { useStyles } from "./styles";
import PrimaryButton from "src/components/PrimaryButton";

export default function create() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Articles/[article_id]</title>
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
            <Typography variant="h6">[article_id]</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={6} md={2} lg={2}>
          <PrimaryButton bluePastel onClick={() => console.log("Update article")}>
            update Article
          </PrimaryButton>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Edit Article Page</Typography>
        </Grid>
      </Grid>
    </AdminBody>
  );
}
