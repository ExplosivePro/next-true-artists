import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";

const useStyles = makeStyles({
  title: {
    marginBottom: "15px",
  },
});

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

export default function FooterItem({ name, data }: Props) {
  const classes = useStyles();
  return (
    <>
      <Typography variant={"h6"} className={classes.title}>
        {name}
      </Typography>
      <List component="nav" aria-label="secondary mailbox folders">
        {data.map((item, index) => {
          return (
            <ListItemLink href={item.url} key={index}>
              <ListItemText primary={item.label} />
            </ListItemLink>
          );
        })}
      </List>
    </>
  );
}

interface Item {
  label: string;
  url: string;
}

interface Props {
  name: string;
  data: Item[];
}
