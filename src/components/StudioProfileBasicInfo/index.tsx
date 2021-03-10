import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

// Material UI
import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// Custom Components
import OperationBlockList from "./OperationBlockList";
import ImageCarousel from "./ImageCarousel";
import AddressBlock from "./AddressBlock";
import Portfolio from "./Portfolio";
import Preview from "./Review";

const styles = () =>
  createStyles({
    root: {},
    title: {
      marginTop: "40px",
      marginBottom: "50px",
    },
    block: {
      marginTop: "40px",
    },
    imageBlock: {
      padding: "40px 25px 0 50px",
    },
  });

const useStyles = makeStyles(styles);

const styleList = [
  {
    label: "Any style",
    value: "any style",
  },
];

const operationList = [
  { icon: "/images/icons/conversation-icon.svg", name: "Consult with the Studio" },
  { icon: "/images/icons/conversation-icon.svg", name: "Walk-ins Welcome" },
  { icon: "/images/icons/comestic-icon.svg", name: "Comestic Tatoo" },
];

const reviews = [
  {
    name: "Alena Levin",
    avatar: "/images/sample-girl-avatar.svg",
    rate: 5,
    comment:
      "Pellentesque accumsan augue nisl, sed suscipit lacus commodo a. Cras dictum euismod tortor eget tincidunt. Ut turpis ex, hendrerit sed augue a, pharetra pellentesque ipsum. Maecenas tincidunt sollicitudin dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus ridiculus mus. Nulla fringilla turpis elit. Aenean at ex facilisis, mollis neque vitae, ornare erat.",
  },
  {
    name: "Minh Hoang",
    avatar: "/images/sample-girl-avatar.svg",
    rate: 3,
    comment:
      "Pellentesque accumsan augue nisl, sed suscipit lacus commodo a. Cras dictum euismod tortor eget tincidunt. Ut turpis ex, hendrerit sed augue a, pharetra pellentesque ipsum. Maecenas tincidunt sollicitudin dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus ridiculus mus. Nulla fringilla turpis elit. Aenean at ex facilisis, mollis neque vitae, ornare erat.",
  },
  {
    name: "Bad Guy",
    avatar: "/images/sample-girl-avatar.svg",
    rate: 4,
    comment:
      "Pellentesque accumsan augue nisl, sed suscipit lacus commodo a. Cras dictum euismod tortor eget tincidunt. Ut turpis ex, hendrerit sed augue a, pharetra pellentesque ipsum. Maecenas tincidunt sollicitudin dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus ridiculus mus. Nulla fringilla turpis elit. Aenean at ex facilisis, mollis neque vitae, ornare erat.",
  },
];

export default function StudioProfileBasicInfo({
  data: { bio, street_address, city, country, name, lat, long, images },
}: Props) {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant={"h5"} className={classes.title}>
            About the Studio
          </Typography>
          <Typography>{bio}</Typography>

          <TextField
            id="outlined-select-currency"
            select
            label="Art style"
            value={styleList[0].value}
            variant="outlined"
            fullWidth
            className={classes.block}
            disabled
          >
            {styleList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <OperationBlockList className={classes.block} list={operationList} />
        </Grid>
        <Hidden smDown>
          <Grid item lg={6} md={6} className={classes.imageBlock}>
            <ImageCarousel />
          </Grid>
        </Hidden>
      </Grid>

      <AddressBlock
        className={classes.block}
        name={name}
        address={street_address}
        city={city}
        country={country}
        lat={lat}
        long={long}
      />

      <Portfolio className={classes.block} data={images} />

      <Preview className={classes.block} list={reviews} />
    </>
  );
}

interface Props {
  data: Resource.StudioDetail;
}
