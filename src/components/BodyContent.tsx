// External import
import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Custom Components
import Header from "../components/Header";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 200px",
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    seeMoreButton: {
      width: "191px",
    },
  }),
);

export default function BodyContent({ children }: Props) {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth={false} className={classes.root}>
        <Header />
        <Grid container>{children}</Grid>
      </Container>
      <Footer />
    </>
  );
}

interface Props {
  children: JSX.Element;
}
