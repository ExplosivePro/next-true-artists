// External import
import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      background: colors.white,
      boxShadow: "none",
      color: colors.black,
      padding: "50px 0",
    },
    toolBar: {
      paddingLeft: 0,
    },
    navbarDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
    },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    linkText: {
      textDecoration: `none`,
      color: `white`,
      "&:hover": {
        borderBottom: `solid 4px ${colors.standardYellow}`,
      },
    },
    linkTextMenu: {
      margin: "10px 15px",
      "&:hover": {
        borderBottom: `solid 4px ${colors.standardYellow}`,
        marginBottom: "-4px",
        backgroundColor: colors.white,
      },
    },
    noHoverEffect: {
      "&:hover": {
        borderBottom: `none`,
        marginBottom: "15px",
      },
    },
    active: {
      borderBottom: `solid 4px ${colors.standardYellow}`,
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("lg")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
    profileButton: {
      padding: "3px 8px 1px 5px",
      borderRadius: "35px",
      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 15%)",
      border: "solid 1px #f2f2f2",
      backgroundColor: "#fafafa",
    },
    accountName: {
      marginLeft: "10px",
      marginRight: "10px",
      fontWeight: 500,
      fontSize: ".8rem",
    },
    logo: {
      width: "244px",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "180px",
      },
    },
    listItemText: {
      fontWeight: "bold",
    },
    searchButton: {
      marginRight: "50px",
    },
    operationButton: {
      marginLeft: "10px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    mobileDisplayName: {
      marginLeft: "15px",
    },
  }),
);

export default useStyles;
