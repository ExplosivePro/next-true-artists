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
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

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

  const [editMode, setEditMode] = useState(false);
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState(false);

  const editModeOpen = () => {
    setEditMode(true);
  };

  const editModeClose = () => {
    setEditMode(false);
  };

  const resetPasswordConfirmOpen = () => {
    setResetPasswordConfirm(true);
  };

  const resetPasswordConfirmClose = () => {
    setResetPasswordConfirm(false);
  };

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
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : userDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Users - ${userDataError}`}</Alert>
          ) : userData ? (
            <Grid container spacing={2}>
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
                      <PrimaryButton
                        variant={editMode ? "outlined" : "contained"}
                        size="small"
                        bluePastel
                        onClick={editMode ? editModeClose : editModeOpen}
                      >
                        {editMode ? "Cancel Edit" : "Edit Profile"}
                      </PrimaryButton>
                      <PrimaryButton size="small" bluePastel onClick={resetPasswordConfirmOpen}>
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
              {editMode ? (
                <Grid item xs={12} md={9}>
                  <EditProfile userData={userData} editModeClose={editModeClose} />
                </Grid>
              ) : null}
            </Grid>
          ) : (
            <Alert severity="info">User record not found...</Alert>
          )}
        </Grid>
      </Grid>

      {resetPasswordConfirm ? (
        <ConfirmResetPassword
          name={userData?.full_name}
          close={resetPasswordConfirmClose}
          isOpen={resetPasswordConfirm}
        />
      ) : (
        <React.Fragment />
      )}
    </AdminBody>
  );
}

function EditProfile({ userData, editModeClose }: any) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.editUserCard}>
        <Typography>
          <b>Edit Profile</b>
        </Typography>

        <CardContent>
          <Grid container item xs={6} direction="column">
            <TextField variant="outlined" margin="dense" label="Name" defaultValue={userData.full_name} />
            <TextField
              variant="outlined"
              margin="dense"
              label="Email Address"
              type="email"
              defaultValue={userData.email}
            />
            <TextField variant="outlined" margin="dense" label="Role" defaultValue={userData.role} />
            <TextField variant="outlined" margin="dense" label="Status" defaultValue={userData.status ?? "Pending"} />
          </Grid>
        </CardContent>

        <CardActions>
          <PrimaryButton variant="outlined" size="small" bluePastel onClick={editModeClose}>
            Cancel
          </PrimaryButton>
          <PrimaryButton size="small" bluePastel onClick={editModeClose}>
            Save Profile
          </PrimaryButton>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

function ConfirmResetPassword({ name, close, isOpen }: any) {
  return (
    <React.Fragment>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Confirm Reset Password</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Reset password for user - <b>{name}</b> ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <PrimaryButton variant="outlined" size="small" bluePastel onClick={close}>
            Cancel
          </PrimaryButton>
          <PrimaryButton size="small" bluePastel onClick={() => console.log(name)}>
            Reset Password
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
