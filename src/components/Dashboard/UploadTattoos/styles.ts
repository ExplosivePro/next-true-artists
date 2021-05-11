// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: "inherit",
      position: "relative",
      backgroundColor: colors.white,
      padding: "30px",
    },
    rootWithoutContent: {
      height: "calc(100vh - 75px)",
    },
    titleText: {
      fontWeight: 600,
      marginBottom: "10px",
    },
    titleWrapper: {
      marginBottom: "25px",
    },
    formWrapper: {
      width: "70%",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    avatar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    fileInput: {
      visibility: "hidden",
      width: 0,
    },
    buttonWrapper: {
      padding: "50px 0",
      width: "100%",
      margin: 0,
    },
  }),
);

export default useStyles;
