// External import
import React, { useEffect, useState } from "react";

// Material UI Components
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Custom UI Components
import Loading from "../../Loading";
import PrimaryButton from "../../PrimaryButton";
import ImageCard from "./ImageCard";

// Utils
import { getTattooListByRole } from "../../../api";

// Contexts
import { Role, useAuth } from "../../../contexts";

import useStyles from "./styles";

export default function ImageMediaCard() {
  const classes = useStyles();
  const { user: { role } = { role: Role.REGULAR }, getRoleId } = useAuth();

  const [currentUserId] = useState(getRoleId());
  const [loading, setLoading] = useState(false);
  const [tattoos, setTattoos] = useState<Resource.TattooDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState<boolean>(false);

  const getTattooList = async () => {
    const {
      meta: { last_page },
      tattoos,
    } = await getTattooListByRole(currentUserId as number, role, currentPage);
    setTattoos(tattoos);
    setLastPage(last_page);
  };

  const loadMore = async () => {
    setLoading(true);

    // Increase current page
    setCurrentPage(currentPage + 1);

    // Get artist by current page
    const {
      tattoos: tattooList,
      meta: { last_page },
    } = await getTattooListByRole(currentUserId as number, role, currentPage + 1);

    setTattoos(tattoos.concat(tattooList));
    setLastPage(last_page);

    setLoading(false);
  };

  useEffect(() => {
    getTattooList();
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <Grid container alignItems={"center"} spacing={4}>
          {tattoos.length === 0 && (
            <Grid container justify={"center"}>
              <Typography>You do not have any tattoo images</Typography>
            </Grid>
          )}
          {tattoos.map((item, index) => {
            return (
              <Grid container item lg={4} md={4} sm={6} xs={12} key={index} justify={"center"}>
                <ImageCard item={item} getTattooList={getTattooList} />
              </Grid>
            );
          })}

          {loading && <Loading className={classes.loading} />}

          {tattoos.length > 0 && !lastPage && (
            <Grid container alignItems={"center"} justify={"center"}>
              <PrimaryButton
                variant="contained"
                color="primary"
                size="medium"
                yellow
                className={classes.seeMoreButton}
                onClick={loadMore}
              >
                See More
              </PrimaryButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
