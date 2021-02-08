import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import colors from "../../palette";

const useStyles = makeStyles({
  root: {
    width: "12px",
    height: "12px",
    margin: "24px 4px 23px",
    border: `solid 2px ${colors.standardGreyBorder}`,
    borderRadius: "50%",
    display: "inline-block",
  },
  active: {
    borderColor: colors.standardGreen,
    backgroundColor: colors.standardGreen,
  },
  selected: {
    borderColor: colors.black,
  },
});

export default function StepCircle({ active = false, selected = false }: { active?: boolean; selected?: boolean }) {
  const classes = useStyles();

  return <div className={clsx(classes.root, { [classes.active]: active, [classes.selected]: selected })} />;
}
