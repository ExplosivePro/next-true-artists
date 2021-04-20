import { makeStyles, createStyles, Theme, withStyles } from "@material-ui/core/styles";
import colors from "src/palette";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

const drawerWidth = 150;

export const useStyles = makeStyles({
  buttonWrapper: {
    marginTop: "15px",
  },
  tableContainer: {
    marginTop: "10px",
  },
  divider: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  paginationWrapper: {
    border: "solid thin lightGrey",
  },
  avatar: {
    textAlign: "center",
    width: "120px",
    height: "120px",
  },
  editUserCard: {
    width: "65%",
  },
});

export const useLayoutStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
    header: {
      height: "145px",
      marginLeft: "5vw",
    },
    drawer: {
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: "150px",
      marginLeft: "5vw",
      height: "40vh",
      borderRadius: "10px",
      backgroundColor: colors.lightGrey,
    },
    content: {
      flexGrow: 1,
      marginLeft: drawerWidth + 100,
      marginRight: 20,
    },
  }),
);

export const useMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      paddingRight: "10px",
    },
    listItem: {
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
      cursor: "pointer",
    },
    nested: {
      paddingLeft: theme.spacing(8),
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
      "& .MuiListItemText-root": {
        paddingLeft: "10px",
      },
    },
    activeBar: {
      backgroundColor: colors.defaultColor,
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: colors.defaultColor,
        borderTopRightRadius: "25px",
        borderBottomRightRadius: "25px",
      },
      "& span": {
        fontWeight: "bold",
      },
      "& svg": {
        fill: colors.white,
      },
    },
    activeSubBar: {
      "& .MuiListItemText-root": {
        borderLeft: `solid 4px ${colors.defaultColor}`,
        color: colors.defaultColor,
      },
    },
    listItemRoot: {
      minWidth: "35px",
    },
  }),
);

export const useFormInputStyles = makeStyles({
  alertWrapper: {
    marginTop: "10px",
  },
  buttonWrapper: {
    marginTop: "15px",
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

export const StyledTableCellLink = withStyles(() =>
  createStyles({
    body: {
      textDecorationLine: "underline",
      fontSize: 14,
      cursor: "pointer",
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

export const StyledTooltip = withStyles(() =>
  createStyles({
    arrow: {
      color: colors.chipYellow,
    },
    tooltip: {
      backgroundColor: colors.darkBluePastel,
    },
  }),
)(Tooltip);

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
