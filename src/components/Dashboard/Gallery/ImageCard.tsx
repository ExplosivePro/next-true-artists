// External import
import React, { useState } from "react";

// Material UI Components
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

// Utils
import { capitalizeFirstLetter } from "../../../utils";
import { deleteTattooByRole } from "../../../api";
import { Role } from "../../../constants";
import { useAuth } from "../../../contexts";

import useStyles from "./styles";

export default function ImageCard({ item, getTattooList }: Props) {
  const { user: { role } = { role: Role.REGULAR }, getRoleId } = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // More open
  const open = Boolean(anchorEl);
  const id = open ? "more-popover" : undefined;

  // On more button click
  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // On more close
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const getTattooName = (data: any) => {
    if (data.artist) {
      return data.artist.name;
    }

    if (data.studio) {
      return data.studio.name;
    }

    return "";
  };

  const getImageInfo = (data: any) => {
    const info = [];
    if (data.size) {
      info.push(capitalizeFirstLetter(data.size));
    }

    if (data.placement) {
      info.push(capitalizeFirstLetter(data.placement));
    }

    if (data.color) {
      info.push(capitalizeFirstLetter(data.color));
    }

    return info.join(" | ");
  };

  const deleteImage = async (id: number) => {
    await deleteTattooByRole(getRoleId() as number, role, id);

    // Close more popover
    handleMoreClose();

    // Refresh the list
    getTattooList();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleMoreClick} className={classes.moreButton}>
            <MoreHorizIcon />
          </IconButton>
        }
        classes={{ root: classes.cardHeader }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            onClick={() => {
              deleteImage(item.id);
            }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </ListItem>
        </List>
      </Popover>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={item.image?.name}
          height="250"
          image={item.image?.image_url}
          title={item.image?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2">
            <b>{getTattooName(item)}</b>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
            {getImageInfo(item)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

interface Props {
  item: Resource.TattooDetail;
  getTattooList: () => void;
}
