// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const useStyles = makeStyles(() =>
  createStyles({
    searchWrapper: {
      position: "fixed",
      backgroundColor: "white",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      opacity: 0.9,
      zIndex: 9999,
    },
    searchInput: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      "& input": {
        fontSize: "24px",
      },
    },
    helperText: {
      color: colors.standardGreyBorder,
    },
    closeButton: {
      position: "absolute",
      right: "15px",
      top: "15px",
    },
  }),
);

export default useStyles;
