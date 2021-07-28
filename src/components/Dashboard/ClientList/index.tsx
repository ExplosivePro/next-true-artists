import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";

// Custom Components
import PrimaryButton from "../../PrimaryButton";
import StyledTableCell from "./TableCell";
import StyledTableRow from "./TableRow";

import useStyles from "./styles";

// Utils
import { getArtistClientList, updateArtistClient } from "../../../api";
import { useAuth, Role } from "../../../contexts";
import { Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import { useDebounce } from "../../../hooks";
import Loading from "../../Loading";

export default function ClientList() {
  const classes = useStyles();
  const { push } = useRouter();
  const { getRoleId, user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client.Detail[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeUserId, setActiveUserId] = useState<number>();
  const [editUserId, setEditUserId] = useState<number>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [searchInput, setSearchInput] = useState(""); // Direct search input value before debounce
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const createNewUser = () => {
    push(`/dashboard/manage-clients/create`);
  };

  // Activate a user
  const activateAUser = async (id: number | undefined, active: boolean) => {
    if (id) {
      // Call APis
      await updateArtistClient(getRoleId() as number, id, { inactive: !active });

      // Refresh the list
      getClients();

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

  const getClients = async (searchString?: string) => {
    if (user?.role === Role.ARTIST) {
      const response = await getArtistClientList(getRoleId() as number, 0, searchString);
      setClients(response);
    }

    if (user?.role === Role.STUDIO) {
      const response = await getArtistClientList(getRoleId() as number, 0, searchString);
      setClients(response);
    }
  };

  // Open modal
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Save comments
  const saveComments = async () => {
    if (editUserId) {
      // Call APis
      await updateArtistClient(getRoleId() as number, editUserId, { comments: comment });

      // Refresh the list
      getClients();

      // Hide confirmation modal
      setModalOpen(false);
    }
  };

  // Search
  const search = async (keyword: string) => {
    // Clear all current result first
    setClients([]);

    // Show loading
    setLoading(true);

    getClients(keyword);

    // Hide loading
    setLoading(false);
  };

  // On search
  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getClients();
  }, []);

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
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
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
            Add New Client
          </PrimaryButton>
        </Grid>

        {clients.length === 0 && !loading && (
          <Grid container justify={"center"}>
            <Typography>No client yet.</Typography>
          </Grid>
        )}

        {clients.length > 0 && !loading && (
          <TableContainer component={Paper} classes={{ root: classes.tableContainer }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
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
                {clients.map((item, index: number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell>{item.email}</StyledTableCell>
                    <StyledTableCell>{item.phone_number}</StyledTableCell>
                    <StyledTableCell>{`${!item.inactive ? "Active" : "Deactivate"}`}</StyledTableCell>
                    <StyledTableCell className={classes.flexEndColumn}>
                      <Switch
                        checked={!item.inactive}
                        onChange={(e) => {
                          toggleActive(e, item.id);
                        }}
                        name={item.id.toString()}
                      />
                      <IconButton
                        onClick={() => {
                          setEditUserId(item.id);
                          setComment(item.comments);
                          handleModalOpen();
                        }}
                      >
                        <ChatIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          push(`/dashboard/manage-clients/${item.id}`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {loading && <Loading />}
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
        <DialogActions className={classes.dialogAction}>
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <CloseIcon className={classes.modalCloseButton} onClick={handleModalClose} />

            <Typography variant={"h5"} className={classes.modalTitle}>
              Edit comments
            </Typography>

            <TextField
              name="comment"
              classes={{ root: classes.formInput }}
              label={"Comment"}
              placeholder={"Comment"}
              fullWidth
              value={comment}
              multiline
              rows={3}
              variant={"outlined"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setComment(e.target.value);
              }}
            />

            <PrimaryButton
              variant="contained"
              size="large"
              primaryColor
              className={classes.submitModalButton}
              onClick={saveComments}
            >
              Save changes
            </PrimaryButton>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}
