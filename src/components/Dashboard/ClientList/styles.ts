// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: "100vh",
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
    table: {
      // minWidth: 700,
    },
    drawer: {
      width: "30vw",
    },
    tableContainer: {
      marginTop: "25px",
    },
    button: {
      margin: theme.spacing(1),
    },
    noDataTextWrapper: {
      border: `solid 1px ${colors.borderGrey}`,
      padding: "15px",
    },
    addNewButton: {
      marginLeft: "auto",
    },
    flexEndColumn: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
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
    dialogAction: {
      padding: "8px 16px 16px 8px",
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
    submitModalButton: {
      float: "right",
    },
  }),
);

export default useStyles;
