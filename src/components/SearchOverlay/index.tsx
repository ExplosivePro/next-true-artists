import TextField from "@material-ui/core/TextField";

import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useEffect } from "react";

const SearchOverlay = ({ onClose }: Props) => {
  const classes = useStyles();

  const escFunction = (event: any) => {
    if (event.keyCode === 27) {
      // Close modal on esc pressed
      onClose();
    }
  };

  useEffect(() => {
    return document.addEventListener("keydown", escFunction, false);
  }, []);

  return (
    <div className={classes.searchWrapper}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <HighlightOffIcon />
      </IconButton>

      <TextField
        className={classes.searchInput}
        id="search-input"
        label={<Typography>Search...</Typography>}
        defaultValue=""
        helperText={
          <Typography className={classes.helperText}>Type above and press Enter to Search. Esc to cancel</Typography>
        }
        autoFocus={true}
      />
    </div>
  );
};

interface Props {
  onClose: () => void;
}

export default SearchOverlay;
