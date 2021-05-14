// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors, { boxShadow } from "../../../palette";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      boxShadow: boxShadow.primary,
      position: "relative",
    },
    cardHeader: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 10,
    },
    moreButton: {
      backgroundColor: colors.standardGreySubFooter,
      opacity: 0.4,
    },
    seeMoreButton: {
      width: "191px",
      marginTop: "20px",
      marginBottom: "100px",
    },
    loading: {
      margin: "20px 0",
    },
    container: {
      minHeight: "100vh",
    },
  }),
);

export default useStyles;
