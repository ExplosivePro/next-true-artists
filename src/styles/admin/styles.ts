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
  paginationWrapper: {
    border: "solid thin lightGrey",
  },
  listLink: {
    color: colors.primaryColor,
  },
  actionsHeader: {
    textAlign: "center",
  },
  deleteCell: {
    textDecoration: "underline",
    cursor: "pointer",
    textAlign: "center",
  },
  closeButton: {
    float: "right",
    color: colors.grey[500],
  },
  nameCell: {
    paddingLeft: "50px",
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
