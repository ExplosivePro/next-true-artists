import Grid from "@material-ui/core/Grid";

export default function BodyContent({ children }: Props) {
  return <Grid container>{children}</Grid>;
}

interface Props {
  children: JSX.Element;
}
