import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Grid from "@material-ui/core/Grid";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";

import { publicPageBaseUrl } from "../../../constants";

import colors from "../../../palette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: `0 4px 4px 0 rgb(136 118 118 / 15%)`,
      borderRadius: "10px",
      width: "100%",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatarWrapper: {
      padding: "20px 70px",
      marginTop: "-50px",
    },
    avatar: {
      width: theme.spacing(17),
      height: theme.spacing(17),
    },
    cardContent: {
      textAlign: "center",
    },
    cardAction: {
      justifyContent: "center",
    },
    facebookIcon: {
      color: colors.facebookColor,
    },
    twitterIcon: {
      color: colors.twitterColor,
    },
    instagramIcon: {
      color: colors.instagramColor,
    },
    title: {
      fontSize: "18px",
    },
    subTitle: {
      fontSize: "14px",
      textTransform: "capitalize",
    },
  }),
);

export default function UserCard({ data }: Props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // On more button click
  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // On more close
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const goToPage = (url: string) => {
    window.open(`http://${url}`, "_blank");
  };

  const openSlug = (slug: string, resource: string) => {
    window.open(`${publicPageBaseUrl}/${resource}/${slug}`, "_blank");
  };

  // More open
  const open = Boolean(anchorEl);
  const id = open ? "more-popover" : undefined;

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleMoreClick}>
            <MoreHorizIcon />
          </IconButton>
        }
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            onClick={() => {
              openSlug(data?.slug, "artists");
            }}
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="View" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </ListItem>
        </List>
      </Popover>
      <Grid container justify={"center"} className={classes.avatarWrapper}>
        <Avatar src={data?.avatar?.image_url} className={classes.avatar} />
      </Grid>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom className={classes.title}>
          <b>{data?.name}</b>
        </Typography>
        <Typography color="textSecondary" component="span" className={classes.subTitle}>
          {data?.status}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardAction}>
        <IconButton
          aria-label="facebook"
          onClick={() => {
            goToPage(data?.facebook_url);
          }}
        >
          <FacebookIcon className={classes.facebookIcon} />
        </IconButton>
        <IconButton
          aria-label="twitter"
          onClick={() => {
            goToPage(data?.twitter_url);
          }}
        >
          <TwitterIcon className={classes.twitterIcon} />
        </IconButton>
        <IconButton
          aria-label="instagram"
          onClick={() => {
            goToPage(data?.instagram_url);
          }}
        >
          <InstagramIcon className={classes.instagramIcon} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

interface Props {
  data: any;
}
