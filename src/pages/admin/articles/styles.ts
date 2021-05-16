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
  metaWrapper: {
    borderLeft: "solid thin lightGrey",
  },
  titleText: {
    fontSize: "16px",
    fontWeight: 600,
  },
  articleText: {
    padding: "0px 0px 10px 10px",
  },
  closeButton: {
    float: "right",
    color: colors.grey[800],
    backgroundColor: colors.normalGrey,
    top: 0,
    right: 0,
  },
  statusChip: {
    marginTop: "5px",
    paddingLeft: "40px",
  },
  cardItem: {
    border: "none",
    margin: 0,
    padding: 0,
  },
  imageCard: {
    margin: 0,
    padding: 0,
  },
  imageCardMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  tagsChips: {
    margin: "2px",
    padding: 0,
  },
  avatar: {
    width: "300px",
    height: "220px",
    cursor: "pointer",
  },
  fileInput: {
    visibility: "hidden",
    width: 0,
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
      display: "flex",
      padding: "20px",
      border: "none",
    },
    chips: {
      margin: "2px",
      padding: 0,
    },
  }),
);
