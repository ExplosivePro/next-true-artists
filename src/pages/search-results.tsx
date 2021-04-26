// External import
import React from "react";
import Head from "next/head";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";

// Custom Components
import BodyContent from "../components/BodyContent";
import SearchCardResult from "../components/SearchCardResult";

import { useApp } from "../contexts";

export default function Artists() {
  const { searchKey } = useApp();
  return (
    <BodyContent>
      <Head>
        <title>Search Results</title>
        <meta name="description" content={"Search results"} />
        <meta key="og:title" property="og:title" content={"Search results"} />
        <meta key="og:description" property="og:description" content={"Search results"} />
      </Head>
      <Grid container>
        <Typography variant={"h5"}>
          <b>Search Result &quot; {searchKey} &quot;</b>
        </Typography>
      </Grid>
      <Grid container>
        <SearchCardResult name={"Tattoos"} data={[]} />
      </Grid>
      <Grid container>
        <SearchCardResult name={"Studios"} data={[]} />
      </Grid>
      <Grid container>
        <SearchCardResult name={"Artists"} data={[]} />
      </Grid>
      <Grid container>
        <SearchCardResult name={"Articles"} data={[]} />
      </Grid>
    </BodyContent>
  );
}
