// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    containerRoot: {
      backgroundColor: colors.white,
      minHeight: "calc(100vh - 72px)",
      padding: "30px",
    },
    avatar: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    changePhotoButton: {
      marginTop: "20px",
    },
    root: {
      height: "100%",
      position: "relative",
      marginTop: "20px",
    },
    groupInput: {
      marginBottom: "4px",
    },
    titleText: {
      fontWeight: 600,
      marginBottom: "10px",
    },
    titleWrapper: {
      marginBottom: "35px",
    },
    formInput: {
      margin: "12px 0",
    },
    formWrapper: {
      width: "70%",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    buttonWrapper: {
      marginTop: "25px",
    },
    sectionTitle: {
      marginTop: "15px",
      fontWeight: "bold",
    },
    sectionSubTitle: {
      marginTop: "15px",
      color: colors.black,
      fontWeight: 500,
    },
    fileInput: {
      visibility: "hidden",
      width: 0,
    },
    artistProfile: {
      marginTop: "20px",
    },
  }),
);

export default useStyles;
