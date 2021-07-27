import React from "react";
import Head from "next/head";
import { useQuery } from "react-query";
import { Chart } from "react-google-charts";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Divider from "@material-ui/core/Divider";

import Loading from "src/components/Loading";
import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";

import { getDashboard } from "src/api/admin/dashboard";
import { useStyles } from "src/styles/admin/dashboard";

export default function Dashboard() {
  const classes = useStyles();

  const {
    status: dashboardStatus,
    data: dashboardData,
    error: dashboardError,
    isFetching: dashboardIsFetching,
  } = useQuery("dashboard", async () => await getDashboard());

  const ShowBackdrop = () => (
    <Backdrop className={classes.backdrop} open={dashboardIsFetching || dashboardStatus === "loading"}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Dashboard</title>
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs>
            <Typography variant="h6">Admin</Typography>
            <Typography variant="h6">Dashboard</Typography>
          </Breadcrumbs>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <ShowBackdrop />
          {dashboardStatus === "loading" ? (
            <Alert severity="info">Loading... </Alert>
          ) : dashboardStatus === "error" ? (
            <Alert severity="error">{`Retrieving dashboard items - ${handleApiErrors(dashboardError)}`}</Alert>
          ) : dashboardData?.length > 0 ? (
            <Grid container spacing={2}>
              {dashboardData?.map((item: { [key: string]: { [key: string]: number } }) =>
                Object.entries(item).map((values, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <DataCard values={values} />
                  </Grid>
                )),
              )}
            </Grid>
          ) : (
            <Alert severity="info">No dashboard records found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}

function DataCard({ values }: { values: [string, { [key: string]: number | string }] }) {
  const classes = useStyles();

  const pieOptions = {
    pieHole: 0.4,
    chartArea: {
      width: "100%",
      height: "100%",
    },
    //is3D: true,
  };

  // Data prep
  let data = [];
  if (values[0] === "users") data = Object.entries(values[1]).slice(0, 5);
  else data = Object.entries(values[1]);

  if (data.length > 1) data.splice(0, 1, ["Item", "Count"]);
  else data.unshift(["Item", "Count"]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" className={classes.listTextHeader}>
          {values[0].replace("_", " ")}
        </Typography>
        <hr />
        <Table size="small" padding="none" className={classes.listTextTable}>
          <colgroup>
            <col width="45%" />
            <col width="5%%" />
            <col width="25%" />
            <col width="auto" />
          </colgroup>
          <TableBody>
            {Object.entries(values[1]).map(([key, value], index) => (
              <TableRow key={index} className={classes.listTextBody}>
                <TableCell>{key}</TableCell>
                <TableCell>{":"}</TableCell>
                <TableCell align="right">{value}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Grid container className={classes.gridSpacer}>
          <Grid item xs={12} className={classes.listTextBody}>
            <Chart chartType="PieChart" loader={<Loading />} options={pieOptions} data={data} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
