import TableCell from "@material-ui/core/TableCell";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import colors from "../../../palette";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: colors.primaryColor,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      cursor: "pointer",
      borderBottom: "none",
    },
  }),
)(TableCell);

export default StyledTableCell;
