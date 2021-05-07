// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    title: {
      fontWeight: "bold",
    },
    userNumber: {
      marginRight: "20px",
    },
    breaker: {
      margin: "0 20px",
      color: colors.standardGreyBorder,
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
    inputWrapper: {
      borderRadius: "20px",
      backgroundColor: colors.white,
      "& input": {
        borderRadius: "20px",
        padding: "10px 15px",
      },
      "& fieldset": {
        border: "none",
      },
    },
    userCard: {
      marginTop: "15px",
    },
    inviteButton: {
      marginLeft: "auto",
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
    },
    inviteModalButton: {
      float: "right",
    },
    container: {
      minHeight: "100vh",
    },
  }),
);

export default useStyles;
