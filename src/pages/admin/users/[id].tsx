import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";
import Loading from "src/components/Loading";
import PrimaryButton from "src/components/PrimaryButton";
import { TextInput, SelectInput, InfoAlert } from "src/components/Admin/FormInputs";

import { useStyles } from "src/styles/admin/users";
import { user_roles, user_status } from "src/constants/admin/users";
import { getUser, updateUser, resetUserPassword } from "src/api/admin/users";

export default function User() {
  const router = useRouter();
  const classes = useStyles();

  const [userId, setUserId] = useState("");

  // Fetch User data using param
  const { status: userDataStatus, data: userData, error: userDataError, refetch: refetchUserData } = useQuery(
    "userData",
    async () => await getUser(userId),
    {
      enabled: userId ? true : false,
    },
  );

  useEffect(() => {
    router.query.id ? setUserId(router.query.id?.toString()) : null;
  }, [router.query.id]);

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

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

  // reset user password
  const handleResetPassword = async () => {
    resetPasswordConfirmClose();
    if (!userData?.email) setInfoAlert({ severity: "error", message: "User e-mail not found !" });
    else
      try {
        const response = await resetUserPassword({ email: userData?.email });
        if (response) setInfoAlert({ severity: "error", message: "Error resetting password !" });
        else setInfoAlert({ severity: "success", message: "Password reset request successfull" });
      } catch (error) {
        setInfoAlert({ severity: "error", message: `Error resetting password! - ${handleApiErrors(error)}` });
      }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/User - {userData?.full_name}</title>
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
          {infoAlert.message ? (
            <Grid container item xs={6}>
              <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} />
            </Grid>
          ) : null}
          {userDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : userDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Users - ${handleApiErrors(userDataError)}`}</Alert>
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

                    <Grid container justify="center">
                      <Grid item xs={10}>
                        <Typography color="textPrimary" align="center">
                          <b>{userData?.full_name}</b>
                        </Typography>
                        <pre>
                          <Typography variant="body2">
                            <b>Role:</b>
                            {"   "}
                            {userData?.role}
                          </Typography>
                          <Typography variant="body2">
                            <b>Status:</b>
                            {"   "}
                            {userData?.status}
                          </Typography>
                        </pre>
                      </Grid>
                    </Grid>

                    <Grid container item justify="space-around" className={classes.buttonWrapper}>
                      <PrimaryButton variant="outlined" size="small" primaryColor onClick={resetPasswordConfirmOpen}>
                        Reset Password
                      </PrimaryButton>
                      <PrimaryButton size="small" primaryColor onClick={editModeOpen}>
                        Edit Profile
                      </PrimaryButton>
                    </Grid>
                  </CardContent>
                </Card>

                <Card className={classes.divider}>
                  <Typography>
                    <b>Contact Information</b>
                  </Typography>

                  <CardContent>
                    <Typography>
                      E-mail :{" "}
                      <Link href={`mailto:${userData?.email}`}>
                        <a className={classes.listLink}>{userData?.email}</a>
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {editMode ? (
                <Grid item xs={12} md={9}>
                  <EditProfile userData={userData} editModeClose={editModeClose} refetchUserData={refetchUserData} />
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
          handleResetPassword={handleResetPassword}
        />
      ) : (
        <React.Fragment />
      )}
    </AdminBody>
  );
}

function EditProfile({
  userData,
  editModeClose,
  refetchUserData,
}: {
  userData: Admin.User;
  editModeClose: () => void;
  refetchUserData: () => void;
}) {
  const classes = useStyles();

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const getFormDefaultValues = () => ({
    email: userData.email,
    role: userData.role,
    status: userData.status,
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

  const onSubmit = async (formValues: Admin.User) => {
    try {
      const response = await updateUser(formValues, userData?.id);
      if (!response) setInfoAlert({ severity: "error", message: "Error updating User !" });
      else {
        setInfoAlert({ severity: "success", message: "User updated successfully" });
        refetchUserData();
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating User! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  return (
    <React.Fragment>
      <Card className={classes.editUserCard}>
        <IconButton className={classes.closeButton} onClick={editModeClose}>
          <CloseIcon />
        </IconButton>
        <Typography>
          <b>Edit Profile</b>
        </Typography>

        {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="email"
                  register={register}
                  required={true}
                  label="Email Address *"
                  errors={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SelectInput
                  name="role"
                  control={control}
                  label="Role *"
                  errors={!!errors.role}
                  errorMessage={errors.role?.message}
                  dropDownList={user_roles.map((role) => ({ id: role, name: role }))}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SelectInput
                  name="status"
                  control={control}
                  label="Status"
                  errors={!!errors.status}
                  errorMessage={errors.status?.message}
                  dropDownList={user_status.map((status) => ({ id: status, name: status }))}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions>
            <Grid container item xs={12} md={6} justify="space-around">
              <PrimaryButton variant="outlined" size="small" primaryColor onClick={editModeClose}>
                Cancel
              </PrimaryButton>

              <PrimaryButton size="small" primaryColor disabled={isSubmitting} type="submit">
                Save Profile
              </PrimaryButton>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </React.Fragment>
  );
}

function ConfirmResetPassword({ name, close, isOpen, handleResetPassword }: any) {
  return (
    <React.Fragment>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Confirm Reset Password</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Reset password for - <b>{name}</b> ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <PrimaryButton variant="outlined" size="small" primaryColor onClick={close}>
            Cancel
          </PrimaryButton>
          <PrimaryButton size="small" primaryColor onClick={handleResetPassword}>
            Reset Password
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
