import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// Custom Components
import TimeIndicator from "./TimeIndicator";

import colors from "../../palette";

const styles = () =>
  createStyles({
    time: {
      marginLeft: "auto",
    },
    greyText: {
      "& p": {
        color: colors.standardGreyBorder,
      },
    },
  });

const useStyles = makeStyles(styles);

const TimeBlock = ({ leftText, rightText, grey = true, indicator = false }: Props) => {
  const classes = useStyles();
  return (
    <Grid container>
      {indicator && <TimeIndicator />}
      <div className={clsx({ [classes.greyText]: grey })}>{leftText}</div>
      <div className={clsx(classes.time, { [classes.greyText]: grey })}>{rightText}</div>
    </Grid>
  );
};

interface Props {
  leftText?: JSX.Element;
  rightText?: JSX.Element;
  grey?: boolean;
  indicator?: boolean;
}

export default TimeBlock;
