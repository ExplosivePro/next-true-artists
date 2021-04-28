// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    imageListWrapper: {
      margin: "25px 0",
    },
    title: {
      fontWeight: 500,
    },
    imageList: {
      display: "flex",
      margin: "10px 0",
      flexWrap: "wrap",
    },
    imageBox: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      minWidth: "100px",
      textAlign: "center",
      backgroundColor: colors.standardLightGrey,
      borderRadius: "5px",
      margin: "5px",
      overflow: "hidden",
      "& img": {
        maxWidth: "100%",
        maxHeight: "auto",
      },
    },
    addImageBox: {
      width: "100px",
      height: "100px",
      minWidth: "100px",
      textAlign: "center",
      border: `dashed 2px ${colors.standardGreyBorder}`,
      margin: "5px",
      overflow: "hidden",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      fontSize: "30px",
      color: colors.normalGrey,
      cursor: "pointer",
    },
    finalText: {
      cursor: "pointer",
      paddingLeft: "10px",
      display: "flex",
      alignItems: "center",
      "& svg": {
        color: colors.black,
      },
      "& span": {
        color: colors.black,
        fontWeight: 500,
        marginLeft: "5px",
      },
    },
    fileInput: {
      visibility: "hidden",
      width: 0,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      "&:focus": {
        outline: "none",
      },
      width: "50%",
    },
    alignCenter: {
      margin: "0 auto",
    },
    formInput: {
      margin: "12px 0",
    },
    sectionSubTitle: {
      color: colors.black,
      fontWeight: 500,
    },
    form: {
      width: "100%",
    },
    buttonWrapper: {
      marginTop: "20px",
    },
    tattooCard: {
      margin: "20px 0",
      border: `solid 1px ${colors.standardLightGrey}`,
      borderRadius: "5px",
      padding: "15px 20px",
      position: "relative",
    },
    deleteIcon: {
      color: colors.standardRed,
      position: "absolute",
      right: 0,
      top: 0,
    },
    inputWrapper: {
      marginBottom: "15px",
    },
    alertWrapper: {
      color: colors.red,
      "& svg": {
        marginRight: "5px",
      },

      "& h6": {
        color: colors.red,
      },
    },
  }),
);

export default useStyles;
