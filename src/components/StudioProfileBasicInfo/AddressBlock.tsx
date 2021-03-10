import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Material UI Components
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";

// Custom component
import PrimaryButton from "../PrimaryButton";
import GoogleWithSearch from "../GoogleMapWithSearch";
import colors from "../../palette";

const useStyles = makeStyles(() =>
  createStyles({
    cardHeader: {
      backgroundColor: colors.standardGreyFooter,
      padding: "40px",
      width: "100%",
      "& .MuiCardHeader-content": {
        paddingRight: "20px",
      },
      alignSelf: "center",
      "& .MuiCardHeader-action": {
        alignSelf: "center",
        marginTop: 0,
      },
    },
  }),
);

export default function AddressBlock({
  className,
  address,
  name,
  city,
  country,
  lat = 10.7718225,
  long = 106.7041598,
}: Props) {
  const classes = useStyles();

  return (
    <Grid container className={clsx(className)}>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <GoogleWithSearch
          height={200}
          noSearch
          disableDefaultUI
          defaultMarkerLocation={{ lat: lat, lng: long, name: name }}
        />
      </Grid>
      <Grid container item lg={8} md={8} sm={12} xs={12} alignItems={"center"}>
        <CardHeader
          action={
            <PrimaryButton variant="outlined" color="primary" size="small" bluePastel>
              Get direction
            </PrimaryButton>
          }
          title={
            <Typography>
              <b>{name}</b>
            </Typography>
          }
          subheader={
            <Typography>
              {address} {city}, {country}
            </Typography>
          }
          className={classes.cardHeader}
        />
      </Grid>
    </Grid>
  );
}

interface Props {
  className?: any;
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  lat?: number;
  long?: number;
}
