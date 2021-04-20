import React from "react";
import Head from "next/head";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import AdminBody from "src/components/Admin/AdminBody";

export default function Artists() {
  return (
    <AdminBody>
      <Container maxWidth="lg">
        <Head>
          <title>Admin - Artists</title>
        </Head>
        <Typography variant={"h5"}>
          <b>Admin - Artists</b>
        </Typography>
      </Container>
    </AdminBody>
  );
}
