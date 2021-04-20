import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import AdminBody from "src/components/Admin/AdminBody";

import { useStyles } from "../styles";
import { getUser } from "../api";

export default function User() {
  const router = useRouter();
  const classes = useStyles();

  const [userId, setUserId] = useState("");

  // Fetch User data using param
  const { status: userDataStatus, data: userData, error: userDataError } = useQuery(
    "userData",
    async () => await getUser(userId),
    {
      enabled: userId ? true : false,
    },
  );

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setUserId(id.toString());
    }
  }, []);

  return (
    <AdminBody>
      <Head>
        <title>Admin - {userData?.full_name}</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Breadcrumbs>
            <Typography variant="body1">
              <Link href="/admin">Admin</Link>
            </Typography>
            <Typography variant="body1">
              <Link href="/admin/users">Users</Link>
            </Typography>
            <Typography variant="body1">{userData?.full_name}</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          {userDataStatus === "loading" ? (
            <Alert severity="info">Loading... </Alert>
          ) : userDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Users - ${userDataError}`}</Alert>
          ) : userData ? (
            <Grid item xs={12} sm={6} md={8} lg={8}>
              <Typography variant="h5" gutterBottom>
                <b>Profile</b>
              </Typography>
            </Grid>
          ) : (
            <Alert severity="info">User record not found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}
