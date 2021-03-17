// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "100vh",
      padding: 0,
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
    joinArtistButton: {
      position: "absolute",
      bottom: "70px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    rightContainer: {
      padding: "50px 65px",
      backgroundColor: colors.lightGrey,
    },
    title: {
      marginBottom: "35px",
      fontWeight: "bold",
      textAlign: "center",
    },
    subTitle: {
      fontWeight: "bold",
      margin: "15px 0",
    },
    facebookLoginIcon: {
      width: "45px",
      height: "45px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.normalGrey,
      borderRadius: "5px",
      cursor: "pointer",
    },
    greyText: {
      color: colors.grey,
    },
    dividerContainer: {
      marginTop: "10px",
    },
    signUpButton: {
      marginTop: "15px",
    },
    alreadyMemberWrapper: {
      marginTop: "15px",
      cursor: "pointer",
    },
    boldText: {
      fontWeight: 500,
    },
    forgotPasswordText: {
      fontWeight: 500,
      color: colors.standardRed,
      marginLeft: "5px",
      "& a": {
        textDecoration: "none",
      },
    },
    image: {
      width: "70%",
      height: "auto",
      cursor: "pointer",
    },
  }),
);

export default useStyles;
