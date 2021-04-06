// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    imageContainer: {
      maxHeight: "980px",
      overflow: "hidden",
      [theme.breakpoints.down("xs")]: {
        maxHeight: "unset",
      },
    },
    title: {
      backgroundColor: colors.bluePastel,
      borderTopRightRadius: "20px",
      [theme.breakpoints.down("xs")]: {
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
      zIndex: 1,
      backgroundColor: colors.extremeDarkBluePastel,
      borderRadius: "20px",
      boxShadow: "6px 3px 6px 0px rgb(0 0 0 / 22%)",
      "& img": {
        width: "100%",
        height: "auto",
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: "25px",
      },
    },
    rightSide: {
      borderTopRightRadius: "20px",
      backgroundColor: colors.standardGreyFooter,
      borderBottomRightRadius: "20px",
      marginLeft: "-15px",
      height: "100%",
      overflow: "scroll",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "0",
      },
      zIndex: 0,
    },
    description: {
      marginBottom: "50px",
    },
    content: {
      padding: "20px 25px",
    },
    heartIcon: {
      marginRight: "25px",
      cursor: "pointer",
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
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    galleryContainer: {
      // height: "200px",
    },
    textBlock: {
      margin: "20px 0 15px 0",
      "& p": {
        fontWeight: "bold",
      },
    },
    spaceAtLeft: {
      marginLeft: "15px",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "inherit",
      },
    },
    commentInputWrapper: {
      marginLeft: "30px",
      paddingRight: "40px",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "15px",
      },
    },
    moreLikeThisText: {
      fontWeight: 500,
    },
  }),
);

export default useStyles;
