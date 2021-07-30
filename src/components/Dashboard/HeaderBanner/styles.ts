// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "fixed",
      top: 0,
      left: "73px",
      width: "100%",
      textAlign: "center",
      padding: "15px",
      zIndex: 10,
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        left: 0,
      },
    },
    inReview: {
      backgroundColor: colors.standardBannerGreen,
      "& svg": {
        color: colors.standardGreen,
        marginRight: "15px",
      },
    },
    underReview: {
      backgroundColor: colors.standardBannerYellow,
      "& svg": {
        color: colors.standardYellow,
        marginRight: "15px",
      },
    },
    rejected: {
      backgroundColor: colors.standardBannerRed,
      "& svg": {
        color: colors.standardRed,
        marginRight: "15px",
      },
    },
    activate: {
      backgroundColor: colors.standardBannerYellow,
      "& svg": {
        color: colors.standardYellow,
        marginRight: "15px",
      },
      cursor: "pointer",
    },
    text: {
      fontSize: 14,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      "&:hover": {
        outline: "none",
      },
      position: "relative",
      width: "50%",
      borderRadius: "5px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    modalCloseButton: {
      position: "absolute",
      right: "15px",
      cursor: "pointer",
    },
    formInput: {
      margin: "10px 0",
    },
    modalTitle: {
      marginBottom: "15px",
      color: colors.standardGreyBorder,
    },
    inline: {
      display: "inline",
    },
    list: {
      padding: 0,
    },
    selectedList: {
      "& .MuiListItem-button": {
        opacity: 0.5,
      },
    },
    checkIcon: {
      color: colors.standardGreen,
    },
  }),
);

export default useStyles;
