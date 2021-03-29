import { createStyles, makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const styles = () =>
  createStyles({
    outRing: {
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      flexGrow: 0,
      margin: "3px 8px 0 0",
      padding: "4px",
      backgroundColor: colors.lightBluePastel,
    },
    inRing: {
      borderRadius: "50%",
      width: "10px",
      height: "10px",
      flexGrow: 0,
      opacity: 1,
      backgroundColor: colors.bluePastel,
    },
  });

const useStyles = makeStyles(styles);

const TimeBlock = () => {
  const classes = useStyles();
  return (
    <div className={classes.outRing}>
      <div className={classes.inRing} />
    </div>
  );
};

export default TimeBlock;
