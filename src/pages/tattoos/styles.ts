// External import
import { createStyles, fade, makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "15px",
    },
    seeMoreButton: {
      width: "191px",
    },
    operationContainer: {
      marginTop: "20px",
    },
    galleryContainer: {
      margin: "20px 0 40px 0",
    },
    galleryWrapper: {
      width: "100%",
    },
    padding: {
      padding: `0 ${theme.spacing(1)}px`,
    },
    mobileMargin: {
      [theme.breakpoints.down("md")]: {
        marginTop: `${theme.spacing(3)}px`,
      },
    },
    search: {
      height: "100%",
      minHeight: "56px",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: "100%",
      border: `solid 1px ${colors.borderGrey} !important`,
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      paddingLeft: "10px",
      height: "100%",
      "& input": {
        width: "100%",
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    topBlock: {
      marginBottom: "20px",
      width: "100%",
      padding: "20px 5px 60px 5px",
      backgroundColor: colors.standardGreyFooter,
    },
    filterWrapper: {
      padding: "0 8px",
      marginTop: "15px",
    },
  }),
);

export default useStyles;
