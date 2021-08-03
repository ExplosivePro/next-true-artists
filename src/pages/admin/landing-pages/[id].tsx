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

import { getLandingPage, editLandingPage } from "src/api/admin/landingPages";
import { landingPageStatus } from "src/constants/admin/landingPages";
import { useStyles, StyledTableCell, StyledTableRow } from "src/styles/admin/landingPages";

export default function EditLandingPages() {
  const classes = useStyles();
  const router = useRouter();

  // Jodit editor config
  const config = {
    removeButtons: ["image"],
    extraButtons: JoditUploadButton,
  };

  const [pageId, setPageId] = useState("");

  // Fetch Landing Page data using param
  const { status: pageDataStatus, data: pageData, error: pageDataError, refetch: refetchPageData } = useQuery(
    "landingPageData",
    async () => await getLandingPage(pageId),
    {
      enabled: pageId ? true : false,
    },
  );

  useEffect(() => {
    router.query.id ? setPageId(router.query.id?.toString()) : null;
  }, [router.query.id]);

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [preview, setPreview] = useState<any>("");
  const [avatar, setAvatar] = useState<File | string>("");

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const getFormDefaultValues = () => ({
    status: "",
    page_key: "",
    title: "",
    page_title: "",
    meta_description: "",
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
    if (pageDataStatus === "success") {
      setValue("status", pageData?.status);
      setValue("page_key", pageData?.page_key);
      setValue("title", pageData?.title);
      setValue("page_title", pageData?.page_title);
      setValue("meta_description", pageData?.meta_description);
      setValue("content", pageData?.content);
    }
  }, [pageDataStatus]);

  const onSubmit = async (formValues: { [T: string]: any }) => {
    const formData = new FormData();
    Object.entries(formValues).map(([key, value]) => formData.append(key, value));

    if (avatar)
      if (avatar === "remove") formData.append("avatar", "");
      else formData.append("avatar", avatar);

    try {
      const response = await editLandingPage(formData, pageId);
      if (!response) setInfoAlert({ severity: "error", message: "Error updating article !" });
      else {
        setInfoAlert({ severity: "success", message: "Landing page updated successfully" });
        setPreview("");
        refetchPageData();
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating landing page! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const handleAvatarChangeClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  const handleAvatarRemoveClick = () => {
    setAvatar("remove");
    setPreview(" ");
  };

  // avatar change
  const handleAvatarChange = (fileUploaded: File) => {
    setAvatar(fileUploaded);
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
        <title>TrueArtists: Admin/Landing Pages/{pageData?.title ?? pageId}</title>
      </Head>

      <Grid container>
        <Grid item xs={12}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">
              <Link href="/admin/landing-pages">Landing Pages</Link>
            </Typography>
            <Typography variant="h6">{pageData?.title ?? pageId}</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} className={classes.buttonWrapper}>
          {pageDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : pageDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Landing Pages - ${handleApiErrors(pageDataError)}`}</Alert>
          ) : pageData ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
                    </Grid>

                    <Grid item xs={6} sm={4} lg={3}>
                      <SelectInput
                        name="status"
                        control={control}
                        required={true}
                        label="Status"
                        errors={!!errors.status}
                        errorMessage={errors.status?.message}
                        dropDownList={Object.entries(landingPageStatus).map(([status, value]) => ({
                          id: value,
                          name: status,
                        }))}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <TextInput
                        name="page_key"
                        register={register}
                        required={true}
                        label="Page url (Example /tattoos/back) *"
                        errors={!!errors.page_key}
                        errorMessage={errors.page_key?.message}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <TextInput
                        name="title"
                        register={register}
                        required={true}
                        label="Header Title *"
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
                        multiline={true}
                        name="meta_description"
                        register={register}
                        required={false}
                        label="Meta Description"
                        errors={!!errors.meta_description}
                        errorMessage={errors.meta_description?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth error={errors.content ? true : false} required={true}>
                        <FormHelperText>
                          <b>Page Content</b>
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
                          <Typography>Edit LP image</Typography>
                          <CardMedia
                            className={classes.imageCardMedia}
                            image={preview ? preview : pageData?.avatar?.image_url ?? "/images/camera.png"}
                          />
                          <input
                            className={classes.fileInput}
                            type={"file"}
                            accept="image/*"
                            ref={hiddenFileInput}
                            onChange={(e) => {
                              if (e.target.files) handleAvatarChange(e.target.files[0]);
                            }}
                          />
                        </CardContent>
                        <CardActions>
                          <Chip icon={<EditIcon />} label="Change" size="small" onClick={handleAvatarChangeClick} />
                          <Chip
                            icon={<DeleteOutlineIcon />}
                            label="Remove"
                            size="small"
                            onClick={handleAvatarRemoveClick}
                          />
                        </CardActions>
                      </Card>
                    </Grid>

                    <Grid item xs={12}>
                      <Card variant="outlined" className={classes.cardItem}>
                        <CardContent>
                          <Typography>Last updated by</Typography>
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
                                  <StyledTableCell>{pageData?.last_updated_by}</StyledTableCell>
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
            <Alert severity="info">Landing Page record not found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}
