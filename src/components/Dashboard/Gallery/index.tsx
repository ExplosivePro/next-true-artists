import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Loading from "../../Loading";
import PrimaryButton from "../../PrimaryButton";

import { getTattooListByRole } from "../../../api";
import { Roles, useAuth } from "../../../contexts";

import { capitalizeFirstLetter } from "../../../utils";

const useStyles = makeStyles({
  root: {
    boxShadow: `0 4px 4px 0 rgb(136 118 118 / 15%)`,
  },
  seeMoreButton: {
    width: "191px",
    marginTop: "20px",
    marginBottom: "100px",
  },
  loading: {
    margin: "20px 0",
  },
});

const getRoleId = (role: Roles, data: any) => {
  switch (role) {
    case Roles.ARTIST: {
      return data.artist.id;
    }
    case Roles.STUDIO: {
      return data.studio.id;
    }
    default: {
      return {};
    }
  }
};

export default function ImgMediaCard() {
  const classes = useStyles();
  const { user, user: { role } = { role: Roles.REGULAR } } = useAuth();

  const [currentUserId] = useState(getRoleId(role, user));
  const [loading, setLoading] = useState(false);
  const [tattoos, setTattoos] = useState<Resource.TattooDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState<boolean>(false);

  const getTattooList = async () => {
    const {
      meta: { last_page },
      tattoos,
    } = await getTattooListByRole(currentUserId, role, currentPage);
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
    } = await getTattooListByRole(currentUserId, role, currentPage + 1);

    setTattoos(tattoos.concat(tattooList));
    setLastPage(last_page);

    setLoading(false);
  };

  useEffect(() => {
    getTattooList();
  }, []);

  const getTattooName = (data: any) => {
    if (data.artist) {
      return data.artist.name;
    }

    if (data.studio) {
      return data.studio.name;
    }

    return "";
  };

  const getImageInfo = (data: any) => {
    const info = [];
    if (data.size) {
      info.push(capitalizeFirstLetter(data.size));
    }

    if (data.placement) {
      info.push(capitalizeFirstLetter(data.placement));
    }

    if (data.color) {
      info.push(capitalizeFirstLetter(data.color));
    }

    return info.join(" | ");
  };

  return (
    <>
      <Container>
        <Grid container alignItems={"center"} spacing={4}>
          {tattoos.length === 0 && (
            <Grid container justify={"center"}>
              <Typography>No image</Typography>
            </Grid>
          )}
          {tattoos.map((item, index) => {
            return (
              <Grid container item lg={4} md={4} sm={6} xs={12} key={index} justify={"center"}>
                <Card className={classes.root} key={index}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="250"
                      image={item.image?.image_url}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="subtitle2">
                        <b>{getTattooName(item)}</b>
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="span">
                        {getImageInfo(item)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
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
