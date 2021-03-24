// External
import { Grid, Typography } from "@material-ui/core";
import Image from "material-ui-image";
import clsx from "clsx";
import moment from "moment";
import { useState } from "react";

// Material UI Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

// Custom Component
import Comments from "./Comments";
import CustomGallery from "../CustomGallery";

import { useAuth } from "../../contexts";

import useStyles from "./styles";

const comments = [
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
];

export default function TattooImage({ data, relatedTattoos }: Props) {
  const auth = useAuth();
  const classes = useStyles();
  const [liked, setLiked] = useState(false);

  // Like
  const like = () => {
    setLiked(!liked);
  };

  return (
    <>
      <Grid container>
        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.leftSide}>
          <Image src={data.image?.image_url} cover={true} style={{ width: "100%" }} />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.rightSide}>
          <List dense className={classes.title}>
            <ListItem button className={classes.spaceAtLeft}>
              <ListItemAvatar>
                <Avatar alt={data.artist.name} src={`${data.artist.avatar?.image_url}`} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant={"h6"}>{data.artist.name}</Typography>}
                className={classes.titleText}
              />
            </ListItem>
          </List>
          <Grid container className={clsx(classes.content, classes.spaceAtLeft)}>
            <Typography className={classes.description}>{data.description}</Typography>

            <Grid container item alignItems={"center"}>
              {!liked && <FavoriteBorderIcon className={classes.heartIcon} onClick={like} />}
              {liked && <FavoriteIcon className={classes.heartIcon} onClick={like} />}
              <Typography className={classes.greyText} display={"inline"}>
                {data.liked || (liked ? 1 : 0)}
              </Typography>
              <div className={classes.postDateText}>
                <Typography className={classes.greyText}>
                  Posted {data.created_at ? moment(data.created_at).fromNow() : moment().fromNow()}
                </Typography>
              </div>
            </Grid>
          </Grid>

          <Divider />

          <Grid container className={clsx(classes.content, classes.spaceAtLeft)}>
            <Comments list={comments} className={classes.commentBLock} />
          </Grid>

          <Grid container className={clsx(classes.commentInputWrapper, classes.content)}>
            <TextField
              className={classes.margin}
              id="input-with-icon-textfield"
              variant={"outlined"}
              placeholder={"Add a comment"}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar alt={`Image`} src={auth.user?.avatar.image_url} className={classes.commentAvatar} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item justify={"flex-end"}>
        <IconButton aria-label="delete">
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <KeyboardArrowRightIcon />
        </IconButton>
      </Grid>
      <Grid container>
        <Grid container item lg={12} justify={"center"} className={classes.textBlock}>
          {relatedTattoos.length === 0 && <Typography>More Like This</Typography>}
        </Grid>
        <Grid item lg={12}>
          <CustomGallery tattoos={relatedTattoos} />
        </Grid>
      </Grid>
    </>
  );
}

interface Props {
  data: Resource.TattooDetail;
  relatedTattoos: Resource.TattooDetail[];
}
