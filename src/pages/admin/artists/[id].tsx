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
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";

import AdminBody from "src/components/Admin/AdminBody";
import Loading from "src/components/Loading";
import PrimaryButton from "src/components/PrimaryButton";
import { InfoAlert } from "src/components/Admin/FormInputs";

import { useStyles } from "../styles";
import { getArtist } from "../api";

export default function Artist() {
  const router = useRouter();
  const classes = useStyles();

  const [artistId, setArtistId] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  // Fetch Artist data using param
  const { status: artistDataStatus, data: artistData, error: artistDataError } = useQuery(
    "artistData",
    async () => await getArtist(artistId),
    {
      enabled: artistId ? true : false,
    },
  );

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setArtistId(id.toString());
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  return (
    <AdminBody>
      <Head>
        <title>Admin - {artistData?.name ?? "Null"}</title>
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
            <Typography variant="body1">Profile</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
          {artistDataStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : artistDataStatus === "error" ? (
            <Alert severity="error">{`Retrieving Artist record - ${artistDataError}`}</Alert>
          ) : artistData ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} lg={3}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h2">
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
                      <PrimaryButton size="small" bluePastel onClick={() => console.log(artistData)}>
                        Approve
                      </PrimaryButton>
                      <PrimaryButton size="small" yellow onClick={() => console.log(artistData)}>
                        Reject
                      </PrimaryButton>
                    </Grid>
                  </CardContent>
                </Card>

                {infoAlert.message ? <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} /> : null}

                <Divider className={classes.divider} />
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Styles
                    </Typography>
                    {
                      //artistData?.styles.
                      ["payöoad", "motessori", "punk", "digger"].map((style, index) => (
                        <Chip label={style} size="small" key={index} className={classes.chips} />
                      ))
                    }
                  </CardContent>
                </Card>

                <Divider className={classes.divider} />
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Social Handles
                    </Typography>

                    <List dense>
                      {artistData?.facebook_url ? (
                        <ListItem>
                          <FacebookIcon />
                          <Link href={artistData?.facebook_url}>Facebook</Link>
                        </ListItem>
                      ) : null}

                      {artistData?.instagram_url ? (
                        <ListItem>
                          <InstagramIcon />
                          <Link href={artistData?.instagram_url}>Instagram</Link>
                        </ListItem>
                      ) : null}

                      {artistData?.twitter_url ? (
                        <ListItem>
                          <TwitterIcon />
                          <Link href={artistData?.twitter_url}>Twitter</Link>
                        </ListItem>
                      ) : null}

                      {artistData?.website ? (
                        <ListItem>
                          <LanguageIcon />
                          <Link href={artistData?.website}>Website</Link>
                        </ListItem>
                      ) : null}
                    </List>
                  </CardContent>
                </Card>

                <Divider className={classes.divider} />
                <Card>
                  <b>Contact Information</b>
                  <List dense>
                    <ListItem>
                      <b>Phone : </b> {artistData?.phone_number}
                    </ListItem>
                    <ListItem>
                      <b>Country : </b> {artistData?.country}
                    </ListItem>
                    <ListItem>
                      <b>City : </b> {artistData?.city}
                    </ListItem>
                    <ListItem>
                      <b>State : </b> {artistData?.state}
                    </ListItem>
                    <ListItem>
                      <b>Street : </b> {artistData?.street_address}
                    </ListItem>
                    <ListItem>
                      <b>Zip Code : </b> {artistData?.zip_code}
                    </ListItem>
                  </List>
                </Card>
              </Grid>

              <Grid item xs={12} md={9} lg={9}>
                <Card style={{ height: "70%" }}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12}>
                        <Tabs value={tabIndex} onChange={handleChange} indicatorColor="primary">
                          <Tab label="Business Settings" />
                          <Tab label="Tattoo Images" />
                        </Tabs>
                      </Grid>

                      <Grid item xs={10}>
                        <TabPanel value={tabIndex} index={0}>
                          <Typography variant="h5" align="center">
                            <b>Business Settings</b>
                          </Typography>
                        </TabPanel>

                        <TabPanel value={tabIndex} index={1}>
                          <Typography variant="h5" align="center">
                            <b>Tattoo Images</b>
                          </Typography>
                        </TabPanel>
                      </Grid>
                    </Grid>
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
