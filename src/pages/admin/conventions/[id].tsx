import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";

import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Alert from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import SyncIcon from "@material-ui/icons/Sync";
import PageviewIcon from "@material-ui/icons/Pageview";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";
import PrimaryButton from "src/components/PrimaryButton";
import Loading from "src/components/Loading";
import { InfoAlert, TextInput, DatePickerInput } from "src/components/Admin/FormInputs";

import { getConvention, editConvention, approveConvention, rejectConvention, submitForReviewConvention } from "./api";
import { countryList } from "src/constants";
import { conventionStatus } from "./constants";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

export default function ShowEditConventions() {
  const classes = useStyles();
  const router = useRouter();

  const [conventionId, setConventionId] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Fetch Convention data using param
  const {
    status: conventionDataStatus,
    data: conventionData,
    error: conventionDataError,
    refetch: refetchConventionData,
  } = useQuery("conventionData", async () => await getConvention(conventionId), {
    enabled: conventionId ? true : false,
  });

  useEffect(() => {
    router.query.id ? setConventionId(router.query.id?.toString()) : null;
  }, [router.query.id]);

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Conventions/{conventionData?.slug ?? conventionId}</title>
      </Head>

      <Grid container>
        <Grid item xs={12}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">
              <Link href="/admin/conventions">Conventions</Link>
            </Typography>
            <Typography variant="h6">{conventionData?.slug ?? conventionId}</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} className={classes.gridSpacer}>
          {conventionDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : conventionDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Conventions - ${handleApiErrors(conventionDataError)}`}</Alert>
          ) : conventionData ? (
            editMode ? (
              <EditConvention
                setEditMode={setEditMode}
                conventionData={conventionData}
                refetchConventionData={refetchConventionData}
              />
            ) : (
              <ShowConvention
                setEditMode={setEditMode}
                conventionData={conventionData}
                refetchConventionData={refetchConventionData}
              />
            )
          ) : (
            <Alert severity="info">Convention record not found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}

function ShowConvention({
  conventionData,
  refetchConventionData,
  setEditMode,
}: {
  conventionData: Admin.Conventions;
  refetchConventionData: () => void;
  setEditMode: (T: boolean) => void;
}) {
  const classes = useStyles();

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const updateStatus = async (status: string) => {
    if (status === conventionData?.status) setInfoAlert({ severity: "warning", message: `Convention is ${status} !` });
    else
      try {
        let response = "null";
        if (status === conventionStatus.Approved) response = await approveConvention(conventionData?.id);
        if (status === conventionStatus.Rejected) response = await rejectConvention(conventionData?.id);
        if (status === conventionStatus["Pending Review"])
          response = await submitForReviewConvention(conventionData?.id);

        if (response) setInfoAlert({ severity: "error", message: "Error updating convention !" });
        else {
          setInfoAlert({ severity: "success", message: "Convention updated successfully" });
          refetchConventionData();
        }
      } catch (error) {
        setInfoAlert({ severity: "error", message: `Error updating convention! - ${handleApiErrors(error)}` });
      }

    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const showStatus = (value: string) =>
    value === conventionStatus.Approved ? (
      <Chip icon={<CheckCircleIcon fontSize="small" className={classes.greenIcon} />} label="Approved" size="small" />
    ) : value === conventionStatus.Rejected ? (
      <Chip icon={<CancelIcon fontSize="small" className={classes.redIcon} />} label="Rejected" size="small" />
    ) : value === conventionStatus.Pending ? (
      <Chip icon={<PageviewIcon fontSize="small" className={classes.blueIcon} />} label="Pending" size="small" />
    ) : (
      <Chip icon={<PageviewIcon fontSize="small" className={classes.blueIcon} />} label="Pending Review" size="small" />
    );

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} md={8} lg={6}>
        {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h2" align="center" gutterBottom>
                  {conventionData?.name ?? "<no name>"}
                </Typography>

                <Grid container spacing={2} justify="center">
                  <Grid item className={classes.titleCell}>
                    Status:
                  </Grid>
                  <Grid item>{showStatus(conventionData?.status)}</Grid>
                </Grid>

                <Grid container item justify="space-evenly" className={classes.buttonWrapper}>
                  <PrimaryButton size="small" primaryColor onClick={() => updateStatus("approved")}>
                    Approve
                  </PrimaryButton>

                  <PrimaryButton size="small" yellow onClick={() => updateStatus("rejected")}>
                    Reject
                  </PrimaryButton>
                </Grid>
              </CardContent>
            </Card>

            <Card variant="outlined" className={classes.gridSpacer}>
              <CardContent>
                <Grid container justify="center" spacing={2}>
                  {conventionData?.status === "pending" ? (
                    <Grid item xs={8}>
                      <PrimaryButton
                        fullWidth
                        size="small"
                        variant="outlined"
                        yellow
                        onClick={() => updateStatus("pending_review")}
                      >
                        Submit for Review
                      </PrimaryButton>
                    </Grid>
                  ) : null}

                  <Grid item xs={8}>
                    <PrimaryButton
                      fullWidth
                      variant="outlined"
                      primaryColor
                      size="small"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Convention
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card variant="outlined" className={classes.gridSpacer}>
              <CardContent>
                <Typography>Created by</Typography>
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
                      <StyledTableCell>{conventionData?.user?.full_name}</StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                      <StyledTableCell>
                        <b>Email </b>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link href={`mailto:${conventionData?.user?.email}`}>
                          <a target="_blank" className={classes.listLink}>
                            {conventionData?.user?.email}
                          </a>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <Typography>Convention info</Typography>
                <Card variant="outlined">
                  <Table size="medium">
                    <colgroup>
                      <col width="150px" />
                      <col width="auto" />
                    </colgroup>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell className={classes.titleCell}>Start Date</StyledTableCell>
                        <StyledTableCell>
                          {moment(conventionData?.start_date).format("dddd, DD MMMM yyyy")}
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell className={classes.titleCell}>End Date</StyledTableCell>
                        <StyledTableCell>
                          {moment(conventionData?.end_date).format("dddd, DD MMMM yyyy")}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </Card>

                <Typography className={classes.gridSpacer}>Address info</Typography>
                <Card variant="outlined">
                  <Table size="medium">
                    <colgroup>
                      <col width="150px" />
                      <col width="auto" />
                    </colgroup>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell className={classes.titleCell}>Country</StyledTableCell>
                        <StyledTableCell>{conventionData?.country}</StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell className={classes.titleCell}>State</StyledTableCell>
                        <StyledTableCell>{conventionData?.state}</StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell className={classes.titleCell}>City</StyledTableCell>
                        <StyledTableCell>{conventionData?.city}</StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell className={classes.titleCell}>Address</StyledTableCell>
                        <StyledTableCell>{conventionData?.address}</StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </Card>

                <Typography className={classes.gridSpacer}>Social media details</Typography>
                <Card variant="outlined">
                  <Table size="medium">
                    <colgroup>
                      <col width="150px" />
                      <col width="auto" />
                    </colgroup>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell className={classes.titleCell}>Official site</StyledTableCell>
                        <StyledTableCell>
                          {conventionData?.link_to_official_site ? (
                            <Link href={conventionData?.link_to_official_site}>
                              <a target="_blank" className={classes.listLink}>
                                {conventionData?.link_to_official_site}
                              </a>
                            </Link>
                          ) : (
                            "--"
                          )}
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell className={classes.titleCell}>Facebook</StyledTableCell>
                        <StyledTableCell>
                          {conventionData?.facebook_link ? (
                            <Link href={conventionData?.facebook_link}>
                              <a target="_blank" className={classes.listLink}>
                                {conventionData?.facebook_link}
                              </a>
                            </Link>
                          ) : (
                            "--"
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </Card>
              </Grid>

              <Grid item sm={12} md={6}>
                <Card variant="outlined" className={classes.imageCard}>
                  <CardContent>
                    <Typography>Convention image</Typography>
                    <CardMedia
                      className={classes.imageCardMedia}
                      image={conventionData?.image?.image_url ?? "/images/camera.png"}
                    />
                  </CardContent>
                </Card>

                <Card variant="outlined" className={classes.gridSpacer}>
                  <Table size="medium">
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell className={classes.titleCell}>Description:</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>{conventionData?.description}</StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function EditConvention({
  conventionData,
  refetchConventionData,
  setEditMode,
}: {
  conventionData: Admin.Conventions;
  refetchConventionData: () => void;
  setEditMode: (T: boolean) => void;
}) {
  const classes = useStyles();

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [preview, setPreview] = useState<any>("");
  const [image, setImage] = useState<File | string>("");
  const [formImageIsDirty, setFormIsDirty] = useState(false);

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const getFormDefaultValues = () => ({
    name: conventionData?.name,
    description: conventionData?.description,
    start_date: conventionData?.start_date,
    end_date: conventionData?.end_date,
    country: conventionData?.country,
    state: conventionData?.state,
    city: conventionData?.city,
    address: conventionData?.address,
    link_to_official_site: conventionData?.link_to_official_site,
    facebook_link: conventionData?.facebook_link,
  });

  const {
    register,
    handleSubmit,
    errors,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm({
    defaultValues: getFormDefaultValues(),
    shouldUnregister: false,
  });

  const onSubmit = async (formValues: { [T: string]: any }) => {
    const formData = new FormData();

    Object.entries(formValues).map(([key, value]) => formData.append(key, value));

    if (image)
      if (image === "remove") formData.append("image", "");
      else formData.append("image", image);

    try {
      const response = await editConvention(formData, conventionData.id);
      if (!response) setInfoAlert({ severity: "error", message: "Error updating convention !" });
      else {
        setInfoAlert({ severity: "success", message: "Convention updated successfully" });
        setPreview("");
        refetchConventionData();
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating convention! - ${handleApiErrors(error)}` });
    }

    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const handleImageChangeClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  // image remove
  const handleImageRemoveClick = () => {
    setImage("remove");
    setPreview("");
    setFormIsDirty(true);
  };

  // image change
  const handleImageChange = (fileUploaded: File) => {
    setImage(fileUploaded);
    const reader = new FileReader();
    reader.readAsDataURL(fileUploaded);
    reader.onloadend = () => setPreview(reader.result);
    setFormIsDirty(true);
  };

  // image reset
  const handleImageResetClick = () => {
    setImage("");
    setPreview("");
    setFormIsDirty(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
            </Grid>

            <Grid item xs={12}>
              <Typography>Convention info</Typography>
              <Card variant="outlined" className={classes.cardItem}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={8}>
                      <TextInput
                        name="name"
                        register={register}
                        required={true}
                        label="Convention name *"
                        errors={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                      <DatePickerInput
                        name={"start_date"}
                        control={control}
                        required={true}
                        label="Start Date *"
                        errors={!!errors.start_date}
                        errorMessage={errors.start_date?.message}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                      <DatePickerInput
                        name={"end_date"}
                        control={control}
                        required={true}
                        label="End Date *"
                        errors={!!errors.end_date}
                        errorMessage={errors.end_date?.message}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} className={classes.gridSpacer}>
              <Typography>Address info</Typography>
              <Card variant="outlined" className={classes.cardItem}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8} lg={6}>
                      <FormControl fullWidth error={errors.country ? true : false} required>
                        <FormHelperText>
                          <b>Country *</b>
                        </FormHelperText>
                        <Controller
                          name={"country"}
                          control={control}
                          rules={{ required: true }}
                          render={(props: any) => (
                            <Autocomplete
                              autoHighlight
                              options={countryList?.map((option: { label: string }) => option.label ?? "")}
                              defaultValue={conventionData?.country}
                              inputValue={props?.value}
                              onInputChange={(event, newInputValue) => props.onChange(newInputValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  variant="outlined"
                                  InputProps={{ ...params.InputProps }}
                                />
                              )}
                            />
                          )}
                        />
                        {errors.country && (
                          <FormHelperText error>{`Required ! ${errors.country?.message}`}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                      <TextInput
                        name="state"
                        register={register}
                        required={true}
                        label="State *"
                        errors={!!errors.state}
                        errorMessage={errors.state?.message}
                      />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                      <TextInput
                        name="city"
                        register={register}
                        required={true}
                        label="City *"
                        errors={!!errors.city}
                        errorMessage={errors.city?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextInput
                        name="address"
                        register={register}
                        required={true}
                        multiline={true}
                        label="Address *"
                        errors={!!errors.address}
                        errorMessage={errors.address?.message}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} className={classes.gridSpacer}>
              <Typography>Social media details</Typography>
              <Card variant="outlined" className={classes.cardItem}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextInput
                        name="link_to_official_site"
                        register={register}
                        label="Official site"
                        errors={!!errors.link_to_official_site}
                        errorMessage={errors.link_to_official_site?.message}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextInput
                        name="facebook_link"
                        register={register}
                        label="Facebook"
                        errors={!!errors.facebook_link}
                        errorMessage={errors.facebook_link?.message}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} className={classes.gridSpacer}>
              <Typography>Description *</Typography>
              <Card variant="outlined" className={classes.cardNoBorder}>
                <TextInput
                  name="description"
                  register={register}
                  required={true}
                  multiline={true}
                  rows={4}
                  errors={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container>
            <Grid item xs={12}>
              <Card variant="outlined" className={classes.imageCard}>
                <CardContent>
                  <Typography>Convention image</Typography>
                  <CardMedia
                    className={classes.imageCardMedia}
                    image={
                      preview
                        ? preview
                        : image === "remove"
                        ? "/images/camera.png"
                        : conventionData?.image?.image_url ?? "/images/camera.png"
                    }
                  />
                  <input
                    className={classes.fileInput}
                    type={"file"}
                    ref={hiddenFileInput}
                    onChange={(e) => {
                      if (e.target.files) handleImageChange(e.target.files[0]);
                    }}
                  />
                </CardContent>
                <CardActions>
                  <Chip icon={<EditIcon />} label="Change" size="small" onClick={handleImageChangeClick} />

                  {(conventionData?.image && image !== "remove") || preview ? (
                    <Chip icon={<DeleteOutlineIcon />} label="Remove" size="small" onClick={handleImageRemoveClick} />
                  ) : null}

                  {formImageIsDirty ? (
                    <Chip icon={<SyncIcon />} label="Reset" size="small" onClick={handleImageResetClick} />
                  ) : null}
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" className={classes.cardItem}>
                <CardContent>
                  <Typography>Created by</Typography>
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
                          <StyledTableCell>{conventionData?.user?.full_name}</StyledTableCell>
                        </StyledTableRow>

                        <StyledTableRow>
                          <StyledTableCell>
                            <b>Email </b>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Link href={`mailto:${conventionData?.user?.email}`}>
                              <a target="_blank" className={classes.listLink}>
                                {conventionData?.user?.email}
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

        <Grid item xs={12}>
          <Grid container spacing={2} className={classes.gridSpacer}>
            <Grid item xs={12} sm={4} md={2}>
              <PrimaryButton size="small" fullWidth variant="outlined" primaryColor onClick={handleCancel}>
                Cancel
              </PrimaryButton>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <PrimaryButton
                size="small"
                fullWidth
                variant={isDirty || formImageIsDirty ? "contained" : "outlined"}
                primaryColor
                disabled={(isSubmitting || !isDirty) && !formImageIsDirty}
                type="submit"
              >
                Save Changes
              </PrimaryButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
