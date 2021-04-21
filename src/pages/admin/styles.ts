import { makeStyles, createStyles, Theme, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import colors from "src/palette";

const drawerWidth = 180;

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

export const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      top: "64px",
      zIndex: 0,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: colors.white,
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
