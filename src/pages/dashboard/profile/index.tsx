import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function Profile() {
  return (
    <Container>
      <Grid container item alignItems={"center"}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant={"h4"}>Edit Profile</Typography>
      </Grid>
    </Container>
  );
}
