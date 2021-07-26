import React, { useEffect, useState } from "react";
import moment from "moment";

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
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
import BlockIcon from "@material-ui/icons/Block";
import DoneIcon from "@material-ui/icons/Done";

// Custom Components
import PrimaryButton from "../../PrimaryButton";
import StyledTableCell from "./TableCell";
import StyledTableRow from "./TableRow";

import useStyles from "./styles";

// Utils
import { getStudioInvitations, updateStudioInvitation } from "../../../api";
import { Role, useAuth } from "../../../contexts";
import { Typography } from "@material-ui/core";
import { useDebounce } from "../../../hooks";
import Loading from "../../Loading";

enum ConfirmType {
  CANCEL = "cancel",
  REJECT = "reject",
}

export default function Invitations() {
  const classes = useStyles();
  const { getRoleId, user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState<Invitation.Detail[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [inviteUserId, setInviteUserId] = useState<number>();
  const [confirmType, setConfirmType] = useState<ConfirmType>(ConfirmType.CANCEL);
  const [searchInput, setSearchInput] = useState(""); // Direct search input value before debounce
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  // Accept invitation
  const acceptInvitation = async (id: number | undefined) => {
    if (id) {
      // Call APis
      await updateStudioInvitation(user?.role as Role, getRoleId() as number, id, "accept");

      // Refresh the list
      getInvitations();

      // Hide confirmation modal
      setShowConfirmModal(false);
    }
  };

  // Cancel invitation
  const cancelInvitation = async (id: number | undefined) => {
    if (id) {
      // Call APis
      await updateStudioInvitation(user?.role as Role, getRoleId() as number, id, "cancel");

      // Refresh the list
      getInvitations();

      // Hide confirmation modal
      setShowConfirmModal(false);
    }
  };

  // Reject invitation
  const rejectInvitation = async (id: number | undefined) => {
    if (id) {
      // Call APis
      await updateStudioInvitation(user?.role as Role, getRoleId() as number, id, "reject");

      // Refresh the list
      getInvitations();

      // Hide confirmation modal
      setShowConfirmModal(false);
    }
  };

  // Open confirm modal
  const openConfirmModal = (id: number, type: ConfirmType) => {
    setConfirmType(type);
    setInviteUserId(id);

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

  const getInvitations = async (searchString?: string) => {
    const response = await getStudioInvitations(user?.role as Role, getRoleId() as number, 0, searchString);
    setInvitations(response);
  };

  // Search
  const search = async (keyword: string) => {
    // Clear all current result first
    setInvitations([]);

    // Show loading
    setLoading(true);

    getInvitations(keyword);

    // Hide loading
    setLoading(false);
  };

  const getFieldDataByCurrentRole = (fieldName: string, data: any) => {
    if ((user?.role as Role) === Role.ARTIST) {
      return data.artist[fieldName];
    }

    if ((user?.role as Role) === Role.STUDIO) {
      return data.studio[fieldName];
    }
  };

  // On search
  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getInvitations();
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

          {/*<PrimaryButton*/}
          {/*  onClick={createNewUser}*/}
          {/*  variant="contained"*/}
          {/*  primaryColor*/}
          {/*  startIcon={<AddIcon />}*/}
          {/*  className={classes.addNewButton}*/}
          {/*>*/}
          {/*  Add New User*/}
          {/*</PrimaryButton>*/}
        </Grid>

        {invitations.length === 0 && !loading && (
          <Grid container justify={"center"}>
            <Typography>No invitation yet.</Typography>
          </Grid>
        )}

        {invitations.length > 0 && !loading && (
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
                    <b>Status</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Date</b>
                  </StyledTableCell>
                  <StyledTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {invitations.map((item, index: number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {getFieldDataByCurrentRole("name", item)}
                    </StyledTableCell>
                    <StyledTableCell>{getFieldDataByCurrentRole("email", item)}</StyledTableCell>
                    <StyledTableCell className={classes.status}>{`${item.status}`}</StyledTableCell>
                    <StyledTableCell>{moment(item.created_at).fromNow()}</StyledTableCell>
                    {
                      <StyledTableCell className={classes.flexEndColumn}>
                        {user?.role === Role.STUDIO && item.status === "pending" && (
                          <Tooltip title="Cancel this invitation">
                            <IconButton
                              onClick={() => {
                                // setEditUserId(item.id);
                                // setComment(item.comments);
                                openConfirmModal(item.id, ConfirmType.CANCEL);
                              }}
                            >
                              <BlockIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        {user?.role === Role.ARTIST && item.status === "pending" && (
                          <Tooltip title="Accept this invitation">
                            <IconButton
                              onClick={() => {
                                acceptInvitation(item.id);
                              }}
                            >
                              <DoneIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {user?.role === Role.ARTIST && item.status === "pending" && (
                          <Tooltip title="Reject this invitation">
                            <IconButton
                              onClick={() => {
                                // setEditUserId(item.id);
                                // setComment(item.comments);
                                openConfirmModal(item.id, ConfirmType.REJECT);
                              }}
                            >
                              <BlockIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </StyledTableCell>
                    }
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
          <DialogContentText>
            Are you sure you want to {confirmType === ConfirmType.CANCEL ? "cancel" : "reject"} this invitation ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <PrimaryButton variant={"outlined"} primaryColor onClick={handleClose}>
            {confirmType === ConfirmType.CANCEL ? "Cancel" : "Reject"}
          </PrimaryButton>
          <PrimaryButton
            variant={"contained"}
            onClick={() => {
              if (confirmType === ConfirmType.CANCEL) {
                cancelInvitation(inviteUserId);
              }

              if (confirmType === ConfirmType.REJECT) {
                rejectInvitation(inviteUserId);
              }
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
