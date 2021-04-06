// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    header: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "12px 22px",
      borderBottom: `solid 1px ${colors.borderGrey}`,

      [theme.breakpoints.down("sm")]: {
        position: "fixed",
        backgroundColor: colors.white,
        zIndex: 10,
      },
    },
    container: {
      [theme.breakpoints.down("sm")]: {
        paddingTop: "80px",
      },
    },
    closeIcon: {
      cursor: "pointer",
      marginLeft: "auto",
    },
    formControl: {
      margin: theme.spacing(3),
    },
    footer: {
      padding: "12px 22px",
      backgroundColor: colors.standardGreyFooter,
      [theme.breakpoints.down("sm")]: {
        position: "fixed",
        bottom: 0,
        justifyContent: "center",
      },
    },
    resetButton: {
      color: colors.bluePastel,
      marginRight: "50px",
      cursor: "pointer",
      fontWeight: 600,
    },
    filterGroupTitle: {
      color: `${colors.black} !important`,
      fontWeight: "bold",
      marginBottom: "25px",
    },
    filterBlock: {
      padding: "5px",
      maxWidth: "145px",
      marginRight: "5px",
      marginBottom: "5px",
      // height: "50px",
      borderRadius: "6px",
      border: "solid 1px #242424",
      display: "flex",
      alignItems: "center",
      "& svg": {
        marginLeft: "10px",
        cursor: "pointer",
      },
    },
    button: {
      minWidth: "147px",
      marginRight: "15px",
    },
    label: {
      fontWeight: 500,
    },
    selected: {
      color: colors.bluePastel,
    },
  }),
);

export default useStyles;
