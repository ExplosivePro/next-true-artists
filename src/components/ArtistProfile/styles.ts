// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100%",
      position: "relative",
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
      width: "100%",
      height: "100%",
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
    box: {
      backgroundColor: colors.standardGreyFooter,
      borderRadius: "6px",
      padding: "15px",
      margin: "15px 0",
    },
    formControlLabel: {
      width: "100%",
      flexDirection: "inherit",
    },
    checkBox: {
      position: "absolute",
      right: 0,
    },
    checkedIcon: {
      color: colors.standardGreen,
    },
    workStyleWrapper: {
      marginBottom: "35px",
    },
  }),
);

export default useStyles;
