import React from "react";
import Head from "next/head";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import AdminBody from "src/components/Admin/AdminBody";

export default function Users() {
  return (
    <AdminBody>
      <Container maxWidth="lg">
        <Head>
          <title>Admin - Users</title>
        </Head>
        <Typography variant={"h5"}>
          <b>Admin - Users</b>
        </Typography>
      </Container>
    </AdminBody>
  );
}
