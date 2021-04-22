import { makeStyles, createStyles, Theme, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import colors from "src/palette";

export const useStyles = makeStyles({
  buttonWrapper: {
    marginTop: "15px",
  },
  tableContainer: {
    marginTop: "10px",
  },
  divider: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  paginationWrapper: {
    border: "solid thin lightGrey",
  },
  avatar: {
    textAlign: "center",
    width: "120px",
    height: "120px",
    marginBottom: "10px",
  },
  editUserCard: {
    width: "65%",
  },
  closeButton: {
    float: "right",
    color: colors.grey[500],
  },
  chips: {
    margin: "2px",
    padding: 0,
  },
});

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      paddingRight: 5,
    },
  }),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

export const useImageStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
      "& .MuiPaper-elevation1": {
        boxShadow:
          "0px 0px 1px -1px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 3px 0px rgb(0 0 0 / 12%)",
      },
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    cardHeader: {
      "& .MuiCardHeader-content": {
        paddingRight: "20px",
      },
      alignSelf: "center",
      "& .MuiCardHeader-action": {
        alignSelf: "center",
      },
    },
    buttonWrapper: {
      marginTop: "15px",
    },
    tattooItemWrapper: {
      marginTop: "20px",
      border: "solid thin lightGrey",
      borderRadius: 8,
    },
  }),
);
