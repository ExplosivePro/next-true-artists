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
      minWidth: 700,
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
    checkBoxCell: {
      "& span": {
        color: colors.white,
      },
    },
  }),
);

export default useStyles;
