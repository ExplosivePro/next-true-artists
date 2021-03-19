import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export default function FilterBlock({ name, id, group, removeFilter }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.filterBlock}>
      <Typography display={"inline"}>{name}</Typography>
      <CloseIcon
        fontSize="small"
        onClick={() => {
          if (removeFilter) {
            removeFilter(id, group);
          }
        }}
      />
    </div>
  );
}

interface Props {
  id: number;
  name: string;
  group: string;
  removeFilter?: (id: number, group: string) => void;
}
