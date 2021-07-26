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

import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";
import Loading from "src/components/Loading";
import PrimaryButton from "src/components/PrimaryButton";
import { InfoAlert } from "src/components/Admin/FormInputs";

import { useStyles, StyledTableCell, StyledTableRow, useImageStyles } from "./styles";
import { getArtist, approveArtist, rejectArtist, flagTattoo } from "./api";

export default function Artist() {
  const router = useRouter();
  const classes = useStyles();
  const imageClasses = useImageStyles();

  const [artistId, setArtistId] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  // Fetch Artist data using param
  const { status: artistDataStatus, data: artistData, error: artistDataError, refetch: artistDataRefetch } = useQuery(
    "artistData",
    async () => await getArtist(artistId),
    {
      enabled: artistId ? true : false,
    },
  );

  useEffect(() => {
    router.query.id ? setArtistId(router.query.id?.toString()) : null;
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
      if (status === "approve") response = await approveArtist(artistData?.id);
      if (status === "reject") response = await rejectArtist(artistData?.id);

      if (response) setInfoAlert({ severity: "error", message: "Error updating artist !" });
      else {
        setInfoAlert({ severity: "success", message: "Artist updated successfully" });
        artistDataRefetch();
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating artist! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Artist - {artistData?.slug ?? artistId}</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Breadcrumbs>
            <Typography variant="body1">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="body1">
              <Link href="/admin/artists">Artists</Link>
            </Typography>
            <Typography variant="body1">{artistData?.slug ?? artistId}</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          {artistDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : artistDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Artist record - ${handleApiErrors(artistDataError)}`}</Alert>
          ) : artistData ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} lg={3}>
                <Card variant="outlined" className={classes.divider}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Profile Details
                    </Typography>
                    <Grid container item justify="center">
                      <Avatar
                        alt={artistData?.name ?? "Null"}
                        src={artistData?.avatar.image_url}
                        className={classes.avatar}
                      />
                    </Grid>

                    <Grid container>
                      <Grid item xs={12}>
                        <Typography color="textPrimary" align="center">
                          <b>{artistData?.name ?? "Null"}</b>
                        </Typography>
                        <pre>
                          <Typography variant="body2" align="center">
                            <b>Status:{"   "}</b>
                            {artistData?.status}
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
                    <Typography variant="h6" component="h2" gutterBottom>
                      Styles
                    </Typography>

                    {artistData?.styles.map((style: { name: string; id: number }) => (
                      <Chip label={style.name} size="small" key={style.id} className={classes.chips} />
                    ))}
                  </CardContent>
                </Card>

                <Card variant="outlined" className={classes.divider}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Social Handles
                    </Typography>

                    <List dense>
                      {artistData?.facebook_url ? (
                        <ListItem>
                          <FacebookIcon />
                          <Link href={artistData?.facebook_url}>
                            <a className={classes.listLink}>Facebook</a>
                          </Link>
                        </ListItem>
                      ) : null}

                      {artistData?.instagram_url ? (
                        <ListItem>
                          <InstagramIcon />
                          <Link href={artistData?.instagram_url}>
                            <a className={classes.listLink}>Instagram</a>
                          </Link>
                        </ListItem>
                      ) : null}

                      {artistData?.twitter_url ? (
                        <ListItem>
                          <TwitterIcon />
                          <Link href={artistData?.twitter_url}>
                            <a className={classes.listLink}>Twitter</a>
                          </Link>
                        </ListItem>
                      ) : null}

                      {artistData?.website ? (
                        <ListItem>
                          <LanguageIcon />
                          <Link href={artistData?.website}>
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
                            <StyledTableCell>
                              <b>Phone</b>
                            </StyledTableCell>
                            <StyledTableCell>{artistData?.phone_number}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>Country</b>
                            </StyledTableCell>
                            <StyledTableCell>{artistData?.country}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>City</b>
                            </StyledTableCell>
                            <StyledTableCell>{artistData?.city}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>State</b>
                            </StyledTableCell>
                            <StyledTableCell>{artistData?.state}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>Street</b>
                            </StyledTableCell>
                            <StyledTableCell>{artistData?.street_address}</StyledTableCell>
                          </StyledTableRow>

                          <StyledTableRow>
                            <StyledTableCell>
                              <b>Zip Code</b>
                            </StyledTableCell>
                            <StyledTableCell>{artistData?.zip_code}</StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={9} lg={9}>
                <Card>
                  <Grid container>
                    <Grid item xs={12}>
                      <Tabs value={tabIndex} onChange={handleChange} indicatorColor="primary">
                        <Tab label="Business Settings" />
                        <Tab label="Tattoo Images" />
                      </Tabs>
                    </Grid>
                    <Grid item xs={12}>
                      <TabPanel value={tabIndex} index={0}>
                        <BusinessSettings artistData={artistData} />
                      </TabPanel>
                      <TabPanel value={tabIndex} index={1}>
                        <TattooImages tattoos={artistData.tattoos} />
                      </TabPanel>
                    </Grid>
                  </Grid>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Hero Banner
                    </Typography>

                    {artistData?.hero_banner ? (
                      <CardMedia
                        className={imageClasses.media}
                        image={artistData?.hero_banner?.image_url ?? "/images/camera.png"}
                        title={artistData?.hero_banner?.name}
                      />
                    ) : (
                      <CardHeader subheader="No image!" className={imageClasses.cardHeader} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Alert severity="info">Artist record not found...</Alert>
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

function BusinessSettings({ artistData }: { artistData: Admin.ArtistProfile }) {
  const classes = useStyles();

  const {
    specialty,
    licensed,
    years_of_experience,
    currency_code,
    price_per_hour,
    minimum_spend,
    guest_artist,
    seeking_guest_spot,
    bio,
  } = artistData;

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
                <StyledTableCell>Years of Experience :</StyledTableCell>
                <StyledTableCell>{years_of_experience}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Speciality :</StyledTableCell>
                <StyledTableCell>{specialty}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Currency Code :</StyledTableCell>
                <StyledTableCell>{currency_code}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Price per Hour :</StyledTableCell>
                <StyledTableCell>{price_per_hour}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Minimum Spend:</StyledTableCell>
                <StyledTableCell>{minimum_spend}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Licensed :</StyledTableCell>
                <StyledTableCell>{showBoolean(licensed)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Guest Artist :</StyledTableCell>
                <StyledTableCell>{showBoolean(guest_artist)}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>Seeking Guest Spot :</StyledTableCell>
                <StyledTableCell>{showBoolean(seeking_guest_spot)}</StyledTableCell>
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
      const response = await flagTattoo(tattoo?.image.id);

      if (response) setInfoAlert({ severity: "error", message: "Error updating image !" });
      else {
        setInfoAlert({ severity: "success", message: "Image updated successfully" });
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error updating image! - ${handleApiErrors(error)}` });
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
