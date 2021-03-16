// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: "100vh",
      padding: 0,
    },
    leftBarContainer: {
      [theme.breakpoints.down("sm")]: {
        height: "70px",
      },
    },
    fullHeightContainer: {
      height: "100%",
    },
    relativeContainer: {
      position: "relative",
    },
    formWrapper: {
      position: "relative",
      height: "100%",
    },
    formInput: {
      margin: "10px 0",
    },
    rightContainer: {
      height: "100%",
      padding: "50px 65px",
      backgroundColor: colors.lightGrey,
      [theme.breakpoints.down("sm")]: {
        padding: "50px 22px",
      },
    },
    title: {
      fontWeight: "bold",
      marginLeft: "10px",
    },
    resetPasswordButton: {
      marginTop: "15px",
    },
    image: {
      width: "70%",
      height: "auto",
    },
    iconButton: {
      marginLeft: "-12px", // Adjust margin instead of padding to prevent affecting to hover circle shape
    },
    backButton: {
      color: colors.black,
    },
  }),
);

export default useStyles;
