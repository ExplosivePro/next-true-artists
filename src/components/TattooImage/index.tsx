import { Grid, Typography } from "@material-ui/core";
import Image from "material-ui-image";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

// Custom Component
import Comments from "./Comments";
import CustomGallery from "../CustomGallery";

import colors from "../../palette";

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
  {
    name: "Bad Guy",
    avatar: "/images/sample-girl-avatar.svg",
    rate: 4,
    comment:
      "Pellentesque accumsan augue nisl, sed suscipit lacus commodo a. Cras dictum euismod tortor eget tincidunt. Ut turpis ex, hendrerit sed augue a, pharetra pellentesque ipsum. Maecenas tincidunt sollicitudin dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus ridiculus mus. Nulla fringilla turpis elit. Aenean at ex facilisis, mollis neque vitae, ornare erat.",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      backgroundColor: colors.bluePastel,
      borderTopRightRadius: "20px",
      [theme.breakpoints.down("sm")]: {
        borderTopLeftRadius: "20px",
      },
    },
    titleText: {
      "& h6": {
        color: colors.white,
        fontWeight: "bold",
      },
    },
    leftSide: {
      "& img": {
        borderRadius: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: "25px",
      },
    },
    rightSide: {
      backgroundColor: colors.standardGreyFooter,
      borderBottomRightRadius: "20px",
    },
    operationContainer: {
      marginTop: "50px",
    },
    content: {
      padding: "20px 25px",
    },
    heartIcon: {
      marginRight: "25px",
    },
    greyText: {
      color: colors.standardGreyBorder,
    },
    postDateText: {
      marginLeft: "auto",
    },
    commentBLock: {
      marginTop: "15px",
    },
    margin: {
      margin: theme.spacing(1),
      "& .MuiInputBase-root": {
        borderRadius: "7px",
        border: `solid 1px ${colors.standardGreyInputBorder}`,
        paddingLeft: 0,
      },
      "& fieldset": {
        border: "none",
      },
      "& .MuiInputAdornment-root": {
        marginLeft: "-20px",
      },
    },
    commentAvatar: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    galleryContainer: {
      height: "200px",
    },
    textBlock: {
      margin: "20px 0 15px 0",
      "& p": {
        fontWeight: "bold",
      },
    },
  }),
);

export default function TattooImage({ data }: Props) {
  const classes = useStyles();

  console.log(data);

  return (
    <>
      <Grid container>
        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.leftSide}>
          <Image src={data.image?.image_url} cover={true} style={{ width: "100%" }} />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.rightSide}>
          <List dense className={classes.title}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar alt={data.artist.name} src={`${data.artist.avatar?.image_url}`} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant={"h6"}>{data.artist.name}</Typography>}
                className={classes.titleText}
              />
            </ListItem>
          </List>
          <Grid container className={classes.content}>
            <Typography>
              Hand tattoos by Clinton Lee #ClintonLee #geometrictattoos #geometric #sacredgeometry #sacredgeometrytattoo
              #pattern #line #linework #shapes #ornamental #dotwork #handtattoo
            </Typography>

            <Grid container className={classes.operationContainer}>
              <FavoriteBorderIcon className={classes.heartIcon} />
              <Typography className={classes.greyText} display={"inline"}>
                200k
              </Typography>
              <div className={classes.postDateText}>
                <Typography className={classes.greyText}>Posted 10 Months ago</Typography>
              </div>
            </Grid>
          </Grid>

          <Divider />

          <Grid container className={classes.content}>
            <Comments list={comments} className={classes.commentBLock} />
          </Grid>

          <Grid container className={classes.content}>
            <TextField
              className={classes.margin}
              id="input-with-icon-textfield"
              variant={"outlined"}
              placeholder={"Add a comment"}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar alt={`Image`} src={`/images/sample-girl-avatar.svg`} className={classes.commentAvatar} />
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
          <Typography>More Like This</Typography>
        </Grid>
        <Grid item lg={12}>
          <CustomGallery tattoos={[]} />
        </Grid>
      </Grid>
    </>
  );
}

interface Props {
  data: Resource.TattooDetail;
}
