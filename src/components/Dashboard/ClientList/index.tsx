import React, { useState } from "react";

// Material import
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

// Custom Components
import PrimaryButton from "../../PrimaryButton";
import StyledTableCell from "./TableCell";
import StyledTableRow from "./TableRow";

import useStyles from "./styles";
import { useRouter } from "next/router";

const data = [
  {
    id: 1,
    name: "1",
    email: "a@g.com",
    active: true,
  },
  {
    id: 2,
    name: "2",
    email: "b@g.com",
    active: true,
  },
];

export default function ClientList() {
  const classes = useStyles();
  const { push } = useRouter();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeUserId, setActiveUserId] = useState<number>();

  const createNewUser = () => {
    push(`dashboard/users/create`);
  };

  // Activate a user
  const activateAUser = (id: number | undefined, active: boolean) => {
    if (id) {
      // TODO: Call API here

      console.log(active);
      // Hide confirmation modal
      setShowConfirmModal(false);
    }
  };

  const toggleActive = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    // Change active to deactive
    if (!event.target.checked) {
      openConfirmModal(id);
    } else {
      activateAUser(id, true);
    }
  };

  // Open confirm modal
  const openConfirmModal = (id: number) => {
    setActiveUserId(id);

    // Show modal
    setShowConfirmModal(true);
  };

  // Close confirm modal
  const handleClose = () => {
    // Hide modal
    setShowConfirmModal(false);
  };

  function PaperComponent(props: PaperProps) {
    return <Paper {...props} />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <div>
        <Grid container alignItems={"center"}>
          <FormControl className={classes.textField} variant="outlined">
            <OutlinedInput
              className={classes.inputWrapper}
              id="search"
              type={"text"}
              placeholder={"Search by Name"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <PrimaryButton
            onClick={createNewUser}
            variant="contained"
            primaryColor
            startIcon={<AddIcon />}
            className={classes.addNewButton}
          >
            Add New User
          </PrimaryButton>
        </Grid>

        <TableContainer component={Paper} classes={{ root: classes.tableContainer }}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className={classes.checkBoxCell}>
                  <Checkbox disabled />
                </StyledTableCell>
                <StyledTableCell>
                  <b>Name</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b>Email</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b>Phone number</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b>Active</b>
                </StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index: number) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    <Checkbox checked={false} color="primary" />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell>{item.email}</StyledTableCell>
                  <StyledTableCell />
                  <StyledTableCell>{`${item.active ? "Active" : "Deactive"}`}</StyledTableCell>
                  <StyledTableCell className={classes.flexEndColumn}>
                    <Switch
                      checked={item.active}
                      onChange={(e) => {
                        toggleActive(e, item.id);
                      }}
                      name="checkedB"
                      color="primary"
                    />
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        open={showConfirmModal}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to deactivate this user ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <PrimaryButton variant={"outlined"} primaryColor onClick={handleClose}>
            Cancel
          </PrimaryButton>
          <PrimaryButton
            variant={"contained"}
            onClick={() => {
              activateAUser(activeUserId, false);
            }}
            primaryColor
          >
            OK
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
