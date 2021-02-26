import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      width: "170px",
      height: "150px",
      padding: "27px 7px 12px 13px",
      borderRadius: "6px",
      border: "solid 1px #e3e3e3",
      backgroundColor: "#fafafa",
      display: "inline-block",
      marginRight: "30px",
      [theme.breakpoints.down("md")]: {
        marginRight: "10px",
      },
    },
    iconWrapper: {
      height: "100%",
    },
  });

const useStyles = makeStyles(styles);

export default function OperationBlock(props: Props) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <Grid container alignItems={"center"} justify={"center"} className={classes.iconWrapper}>
        <img src={props.icon} alt={"comestic"} />
        <Typography>
          <b>{props.name}</b>
        </Typography>
      </Grid>
    </div>
  );
}

interface Props {
  className?: any;
  icon: string;
  name: string;
}
