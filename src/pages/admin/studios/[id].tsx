import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { green, red } from "@material-ui/core/colors";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

import AdminBody from "src/components/Admin/AdminBody";
import Loading from "src/components/Loading";
import PrimaryButton from "src/components/PrimaryButton";
import { InfoAlert } from "src/components/Admin/FormInputs";

import { useStyles, StyledTableCell, StyledTableRow, useImageStyles } from "./styles";
import { getStudio, approveStudio, rejectStudio, flagTattoo } from "./api";

export default function Studio() {
  const router = useRouter();
  const classes = useStyles();

  const [studioId, setStudioId] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  // Fetch Studio data using param
  const { status: studioDataStatus, data: studioData, error: studioDataError, refetch: studioDataRefetch } = useQuery(
    "studioData",
    async () => await getStudio(studioId),
    {
      enabled: studioId ? true : false,
    },
  );

  useEffect(() => {
    router.query.id ? setStudioId(router.query.id?.toString()) : null;
  }, [router.query.id]);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const updateStatus = async (status: string) => {
    try {
      let response;
      if (status === "approve") response = await approveStudio(studioData?.id);
      if (status === "reject") response = await rejectStudio(studioData?.id);

      if (!response) setInfoAlert({ severity: "error", message: "Error updating studio !" });
      else {
        setInfoAlert({ severity: "success", message: "Studio updated successfully" });
        studioDataRefetch();
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating studio! - ${error}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Studio - {studioData?.name ?? "Null"}</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Breadcrumbs>
            <Typography variant="body1">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="body1">
              <Link href="/admin/studios">Studios</Link>
            </Typography>
            <Typography variant="body1">Profile</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          {studioDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : studioDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Studio record - ${studioDataError}`}</Alert>
          ) : studioData ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} lg={3}>
                <Card variant="outlined" className={classes.divider}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Profile Details
                    </Typography>
                    <Grid container item justify="center">
                      <Avatar
                        alt={studioData?.name ?? "Null"}
                        src={studioData?.avatar?.image_url}
                        className={classes.avatar}
                      />
                    </Grid>

                    <Grid container>
                      <Grid item xs={12}>
                        <Typography color="textPrimary" align="center">
                          <b>{studioData?.name ?? "Null"}</b>
                        </Typography>
                        <pre>
                          <Typography variant="body2" align="center">
                            <b>Status:{"   "}</b>
                            {studioData?.status}
                          </Typography>
                        </pre>
                      </Grid>
                    </Grid>

                    <Grid container item justify="space-evenly">
                      <PrimaryButton size="small" primaryColor onClick={() => updateStatus("approve")}>
                        Approve
                      </PrimaryButton>
                      <PrimaryButton
                        size="small"
                        variant="outlined"
                        primaryColor
                        onClick={() => updateStatus("reject")}
                      >
                        Reject
                      </PrimaryButton>
                    </Grid>
                  </CardContent>
                </Card>

                {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}

                <Card variant="outlined" className={classes.divider}>
                  <CardContent>
                    {studioData?.services?.map((style: string, index: number) => (
                      <Chip label={style} size="small" key={index} className={classes.chips} />
                    ))}
                  </CardContent>
                </Card>

                <Card variant="outlined" className={classes.divider}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Social Handles
                    </Typography>

                    <List dense>
                      {studioData?.facebook_url ? (
                        <ListItem>
                          <FacebookIcon />
                          <Link href={studioData?.facebook_url}>
                            <a className={classes.listLink}>Facebook</a>
                          </Link>
                        </ListItem>
                      ) : null}

                      {studioData?.instagram_url ? (
                        <ListItem>
                          <InstagramIcon />
                          <Link href={studioData?.instagram_url}>
                            <a className={classes.listLink}>Instagram</a>
                          </Link>
                        </ListItem>
                      ) : null}

                      {studioData?.twitter_url ? (
                        <ListItem>
                          <TwitterIcon />
                          <Link href={studioData?.twitter_url}>
                            <a className={classes.listLink}>Twitter</a>
                          </Link>
                        </ListItem>
                      ) : null}

                      {studioData?.website_url ? (
                        <ListItem>
                          <LanguageIcon />
                          <Link href={studioData?.website_url}>
                            <a className={classes.listLink}>Website</a>
                          </Link>
                        </ListItem>
                      ) : null}
                    </List>
                  </CardContent>
                </Card>

                <Card variant="outlined" className={classes.divider}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Contact Information
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <colgroup>
                          <col width="30%" />
                          <col width="70%" />
                        </colgroup>
                        <TableBody>
                          <StyledTableRow>
                            <StyledTableCell colSpan={2}>
                              <b>Email </b>
                              <Link href={`mailto:${studioData?.email}`}>
                                <a className={classes.listLink}>{studioData?.email}</a>
                              </Link>
                            </StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>Phone</b>
                            </StyledTableCell>
                            <StyledTableCell>{studioData?.phone_number}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>Country</b>
                            </StyledTableCell>
                            <StyledTableCell>{studioData?.country}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>City</b>
                            </StyledTableCell>
                            <StyledTableCell>{studioData?.city}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>State</b>
                            </StyledTableCell>
                            <StyledTableCell>{studioData?.state}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>Street</b>
                            </StyledTableCell>
                            <StyledTableCell>{studioData?.street_address}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>Zip Code</b>
                            </StyledTableCell>
                            <StyledTableCell>{studioData?.zip_code}</StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={9} lg={9}>
                <Card style={{ height: "100%" }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Tabs value={tabIndex} onChange={handleChange} indicatorColor="primary">
                        <Tab label="Business Settings" />
                        <Tab label="Studio Artists" />
                        <Tab label="Tattoo Images" />
                      </Tabs>
                    </Grid>
                    <Grid item xs={12}>
                      <TabPanel value={tabIndex} index={0}>
                        <BusinessSettings studioData={studioData} />
                      </TabPanel>
                      <TabPanel value={tabIndex} index={1}>
                        <StudioArtists artists={studioData.artists} />
                      </TabPanel>
                      <TabPanel value={tabIndex} index={2}>
                        <TattooImages tattoos={studioData.tattoos} />
                      </TabPanel>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Alert severity="info">Studio record not found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Grid role="tabpanel" hidden={value !== index} id={`info-panel-${index}`} {...other}>
      {value === index && children}
    </Grid>
  );
}

function BusinessSettings({ studioData }: { studioData: Admin.StudioProfile }) {
  const classes = useStyles();

  const {
    cosmetic_tattoos,
    accepted_payment_methods,
    price_per_hour,
    lgbt_friendly,
    accepting_guest_artist,
    parking,
    languages,
    bio,
    piercings,
    privacy_dividers,
    vegan_ink,
    wheelchair_access,
    wifi,
  } = studioData;

  const showBoolean = (value: boolean) =>
    value ? (
      <CheckCircleIcon fontSize="small" style={{ color: green[500] }} />
    ) : (
      <CancelIcon fontSize="small" style={{ color: red[500] }} />
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>Languages :</StyledTableCell>
                <StyledTableCell>{languages}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Price per Hour :</StyledTableCell>
                <StyledTableCell>{price_per_hour}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Accepted Payment Methods :</StyledTableCell>
                <StyledTableCell>{accepted_payment_methods}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Accepting Guest Artist :</StyledTableCell>
                <StyledTableCell>{showBoolean(accepting_guest_artist)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Cosmetic Tattoos :</StyledTableCell>
                <StyledTableCell>{showBoolean(cosmetic_tattoos)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Vegan Ink:</StyledTableCell>
                <StyledTableCell>{showBoolean(vegan_ink)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Piercings :</StyledTableCell>
                <StyledTableCell>{showBoolean(piercings)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Privacy Dividers :</StyledTableCell>
                <StyledTableCell>{showBoolean(privacy_dividers)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>LGBT_Friendly :</StyledTableCell>
                <StyledTableCell>{showBoolean(lgbt_friendly)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Wi-Fi :</StyledTableCell>
                <StyledTableCell>{showBoolean(wifi)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Parking :</StyledTableCell>
                <StyledTableCell>{showBoolean(parking)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Wheelchair Access :</StyledTableCell>
                <StyledTableCell>{showBoolean(wheelchair_access)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell colSpan={2}>
                  <Typography variant="body1">
                    <b>Bio :</b>
                  </Typography>
                  {bio}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={12} lg={6}></Grid>
    </Grid>
  );
}

function TattooImages({ tattoos }: { tattoos: Admin.Tattoo[] }) {
  return (
    <React.Fragment>
      {tattoos.length > 0 ? (
        tattoos?.map((tattoo, index) => <TattooImage tattoo={tattoo} key={index} />)
      ) : (
        <Alert severity="info">No tattoo images found...</Alert>
      )}
      ;
    </React.Fragment>
  );
}

function TattooImage({ tattoo }: { tattoo: Admin.Tattoo }) {
  const classes = useImageStyles();

  // Create a Alert for feedback info
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const updateStatus = async () => {
    try {
      const response = await flagTattoo(tattoo?.image?.id);

      if (response) setInfoAlert({ severity: "error", message: "Error updating image !" });
      else {
        setInfoAlert({ severity: "success", message: "Image updated successfully" });
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating image! - ${error}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  return (
    <Grid container spacing={2} className={classes.tattooItemWrapper}>
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="outlined">
          <CardContent>
            <CardMedia
              className={classes.media}
              image={tattoo?.image?.image_url ?? "/images/camera.png"}
              title={tattoo?.color}
            />
            <CardHeader subheader={tattoo?.image?.name} className={classes.cardHeader} />
          </CardContent>
        </Card>

        <Grid container item xs={12} justify="space-evenly" className={classes.buttonWrapper}>
          <Typography variant="body2">
            <b>Status : </b>
            {tattoo?.image?.status}
          </Typography>

          <PrimaryButton size="small" primaryColor onClick={updateStatus}>
            Flag image
          </PrimaryButton>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
            <TableContainer>
              <Table size="small">
                <colgroup>
                  <col width="30%" />
                  <col width="70%" />
                </colgroup>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell>
                      <b>Color :</b>
                    </StyledTableCell>
                    <StyledTableCell>{tattoo?.color}</StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell>
                      <b>Size :</b>
                    </StyledTableCell>
                    <StyledTableCell>{tattoo?.size}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={6} lg={6}>
            <TableContainer>
              <Table size="small">
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell>
                      <b>Placement :</b>
                    </StyledTableCell>
                    <StyledTableCell>{tattoo?.placement}</StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell>
                      <b>Featured :</b>
                    </StyledTableCell>
                    <StyledTableCell>{tattoo?.featured ? "Yes" : "No"}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell>
                      <b>Caption :</b>
                      {tattoo?.caption}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell>
                      <b>Styles :</b>
                      {tattoo?.styles}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell>
                      <b>Categories :</b>
                      {tattoo?.categories}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell>
                      <b>Tags :</b>
                      {tattoo?.tags?.map((style: string, index: number) => (
                        <Chip label={style} size="small" key={index} className={classes.chips} />
                      ))}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {/* Show info alerts for update status */}
        {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}
      </Grid>
    </Grid>
  );
}

function StudioArtists({ artists }: { artists: Admin.ArtistProfile[] }) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {artists.length > 0 ? (
          <React.Fragment>
            <TableContainer className={classes.tableContainer}>
              <Table size="small">
                <colgroup>
                  <col width="auto" />
                  <col width="auto" />
                  <col width="auto" />
                  <col width="auto" />
                  <col width="30%" />
                </colgroup>
                <TableBody>
                  {artists.map((artist, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Link href={`/admin/artists/${artist.id}`}>
                          <a target="_blank" className={classes.listLink}>
                            {artist.name ?? "Null"}
                          </a>
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>{artist.phone_number}</StyledTableCell>
                      <StyledTableCell>{artist.city}</StyledTableCell>
                      <StyledTableCell>{artist.country}</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 20, 40, 60, { value: artists.length, label: "All" }]}
              rowsPerPage={rowsPerPage}
              count={artists.length}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              className={classes.paginationWrapper}
            />
          </React.Fragment>
        ) : (
          <Alert severity="info">No studio artists found...</Alert>
        )}
      </Grid>
    </Grid>
  );
}
