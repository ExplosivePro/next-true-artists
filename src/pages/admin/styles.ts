import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    listTextHeader: {
      textTransform: "capitalize",
      fontWeight: 600,
    },
    listTextBody: {
      textTransform: "capitalize",
    },
    listTextTable: {
      marginLeft: "10%",
    },
    gridSpacer: {
      marginTop: "20px",
    },
  }),
);
