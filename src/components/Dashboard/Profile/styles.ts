// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    containerRoot: {
      minHeight: "calc(100vh - 72px)",
      padding: "30px",
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
    },
    leftBar: {
      backgroundColor: colors.white,
      marginRight: "30px",
      borderRadius: "10px",
      [theme.breakpoints.down("sm")]: {
        marginRight: 0,
        marginBottom: "20px",
      },
    },
    rightBar: {
      borderRadius: "10px",
    },
    formContainer: {
      backgroundColor: colors.white,
      borderRadius: "10px",
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
      width: "80%",
      height: "100%",
      padding: "30px",
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
    uploadIconButton: {
      padding: "5px",
      backgroundColor: colors.white,
      "&:hover": {
        backgroundColor: colors.white,
      },
      "& .MuiIconButton-label": {
        backgroundColor: colors.bluePastel,
        color: colors.white,
        borderRadius: "50%",
        padding: "5px",
      },
    },
    barHeader: {
      padding: "25px",
    },
    menuItemList: {
      padding: "25px",
    },
    menuActive: {
      "& .MuiListItemIcon-root": {
        color: colors.bluePastel,
      },
      "& .MuiTypography-root": {
        color: colors.bluePastel,
        fontWeight: "bold",
      },
    },
    coverWrapper: {
      marginBottom: "30px",
      "& img": {
        width: "100%",
        borderRadius: "10px",
      },
    },
    barDescriptionTitleWrapper: {
      width: "100%",
      padding: "18px",
    },
    divider: {
      width: "100%",
    },
  }),
);

export default useStyles;
