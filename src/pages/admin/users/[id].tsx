import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

import AdminBody from "src/components/Admin/AdminBody";
import Loading from "src/components/Loading";
import PrimaryButton from "src/components/PrimaryButton";

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

  console.log(userData);

  return (
    <AdminBody>
      <Head>
        <title>Admin - {userData?.full_name}</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Breadcrumbs>
            <Typography variant="body1">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="body1">
              <Link href="/admin/users">Users</Link>
            </Typography>
            <Typography variant="body1">Profile</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
          {userDataStatus === "loading" ? (
            <>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </>
          ) : userDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Users - ${userDataError}`}</Alert>
          ) : userData ? (
            <Grid item xs={12} md={3}>
              <Card>
                <Typography>
                  <b>Profile Details</b>
                </Typography>

                <CardContent>
                  <Grid container item justify="center">
                    <Avatar alt={userData?.full_name} src="" className={classes.avatar} />
                  </Grid>
                  <Typography align="center">{userData?.full_name}</Typography>
                  <Typography align="center">{userData?.role}</Typography>
                  <Grid container item justify="space-around" className={classes.buttonWrapper}>
                    <PrimaryButton size="small" bluePastel>
                      Edit Profile
                    </PrimaryButton>
                    <PrimaryButton size="small" bluePastel>
                      Reset Password
                    </PrimaryButton>
                  </Grid>
                </CardContent>
              </Card>
              <Divider className={classes.divider} />
              <Card>
                <Typography>
                  <b>Contact Information</b>
                </Typography>

                <CardContent>
                  <Typography>
                    E-mail : <Link href={`mailto:${userData?.email}`}>{userData?.email}</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Alert severity="info">User record not found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}
