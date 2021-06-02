import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";

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
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

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

import { getConvention, editConvention } from "./api";
import { convention_status } from "./constants";
import { countryList } from "src/constants";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

export default function EditConventions() {
  const classes = useStyles();
  const router = useRouter();

  const [conventionId, setConventionId] = useState("");

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

        <Grid item xs={12} className={classes.buttonWrapper}>
          {conventionDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : conventionDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Conventions - ${handleApiErrors(conventionDataError)}`}</Alert>
          ) : conventionData ? (
            <Edit conventionData={conventionData} refetchConventionData={refetchConventionData} />
          ) : (
            <Alert severity="info">Convention record not found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}

function Edit({
  conventionData,
  refetchConventionData,
}: {
  conventionData: Admin.Conventions;
  refetchConventionData: () => void;
}) {
  const classes = useStyles();
  const router = useRouter();

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [preview, setPreview] = useState<any>("");
  const [image, setImage] = useState<File | string>("");

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const getFormDefaultValues = () => ({
    verified: conventionData?.verified,
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
    formState: { isSubmitting },
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <SelectInput
                    name="verified"
                    control={control}
                    required={true}
                    label="Status"
                    errors={!!errors.verified}
                    errorMessage={errors.verified?.message}
                    dropDownList={convention_status.map((status) => ({ id: status.value, name: status.status }))}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4} lg={3}>
                      <FormControl fullWidth error={errors.start_date ? true : false} required={true}>
                        <FormHelperText>
                          <b>Start Date *</b>
                        </FormHelperText>
                        <Controller
                          name={"start_date"}
                          control={control}
                          rules={{ required: true }}
                          render={(props: any) => (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                disableToolbar
                                format="dd MMM yyyy"
                                value={props?.value ? moment(props?.value) : ""}
                                onChange={(date) => props.onChange(moment(date))}
                              />
                            </MuiPickersUtilsProvider>
                          )}
                        />
                        {errors.start_date && (
                          <FormHelperText error>{`Required ! ${errors.start_date?.message}`}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} sm={4} lg={3}>
                      <FormControl fullWidth error={errors.end_date ? true : false} required={true}>
                        <FormHelperText>
                          <b>End Date *</b>
                        </FormHelperText>
                        <Controller
                          name={"end_date"}
                          control={control}
                          rules={{ required: true }}
                          render={(props: any) => (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                disableToolbar
                                format="dd MMM yyyy"
                                value={props?.value ? moment(props?.value) : ""}
                                onChange={(date) => props.onChange(moment(date))}
                              />
                            </MuiPickersUtilsProvider>
                          )}
                        />
                        {errors.end_date && (
                          <FormHelperText error>{`Required ! ${errors.end_date?.message}`}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} className={classes.buttonWrapper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextInput
                    name="name"
                    register={register}
                    required={true}
                    label="Convention name *"
                    errors={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    name="link_to_official_site"
                    register={register}
                    label="Link to official site"
                    errors={!!errors.link_to_official_site}
                    errorMessage={errors.link_to_official_site?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    name="facebook_link"
                    register={register}
                    label="Facebook link"
                    errors={!!errors.facebook_link}
                    errorMessage={errors.facebook_link?.message}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} className={classes.buttonWrapper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={errors.country ? true : false} required={true}>
                    <FormHelperText>
                      <b>Country *</b>
                    </FormHelperText>
                    <Controller
                      name={"country"}
                      control={control}
                      rules={{ required: true }}
                      render={(props: any) => (
                        <Autocomplete
                          freeSolo
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
                    {errors.country && <FormHelperText error>{`Required ! ${errors.country?.message}`}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextInput
                    name="state"
                    register={register}
                    required={true}
                    label="State *"
                    errors={!!errors.state}
                    errorMessage={errors.state?.message}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
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
            </Grid>

            <Grid item xs={12} className={classes.buttonWrapper}>
              <TextInput
                name="description"
                register={register}
                required={true}
                multiline={true}
                label="Description *"
                errors={!!errors.description}
                errorMessage={errors.description?.message}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4} className={classes.metaWrapper}>
          <Grid container>
            <Grid item xs={12}>
              <Card variant="outlined" className={classes.imageCard}>
                <CardContent>
                  <Typography>Convention image</Typography>
                  <CardMedia
                    className={classes.imageCardMedia}
                    image={preview ? preview : conventionData?.image?.image_url ?? "/images/camera.png"}
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
                  <Chip icon={<DeleteOutlineIcon />} label="Remove" size="small" onClick={handleImageRemoveClick} />
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
          <Grid container spacing={2} className={classes.buttonWrapper}>
            <Grid item xs={12} sm={4} md={2}>
              <PrimaryButton size="small" fullWidth variant="outlined" primaryColor onClick={handleCancel}>
                Cancel
              </PrimaryButton>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <PrimaryButton size="small" fullWidth primaryColor disabled={isSubmitting} type="submit">
                Save Changes
              </PrimaryButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
