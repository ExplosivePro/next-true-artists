// Material Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

// Custom Components
import UserCard from "./Card";
import PrimaryButton from "../../PrimaryButton";

import { Role, useApp, useAuth } from "../../../contexts";

import useStyles from "./styles";

import { getMyArtistList, getMyStudioList, inviteArtist, removeArtist } from "../../../api";
import { useDebounce } from "../../../hooks";
import Loading from "../../Loading";

const getTitleByRole = (role: Role) => {
  switch (role) {
    case Role.ARTIST: {
      return "Studios";
    }
    case Role.STUDIO: {
      return "Studio Artists";
    }
    default: {
      return "";
    }
  }
};

export default function UserList() {
  const classes = useStyles();
  const { user } = useAuth();
  const { showSuccessDialog } = useApp();

  const [userList, setUserList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Direct search input value before debounce
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const title = getTitleByRole(user?.role as Role);

  const getUserList = async (role: Role, searchString?: string) => {
    switch (role) {
      case Role.ARTIST: {
        const { data, error } = await getMyStudioList(user?.artist?.id as number, 0, searchString);

        if (!error) {
          setUserList(data);
        }
        break;
      }
      case Role.STUDIO: {
        const { data, error } = await getMyArtistList(user?.studio?.id as number, 0, searchString);

        if (!error) {
          setUserList(data);
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  const getMyProfileByRole = (role: Role): any => {
    switch (role) {
      case Role.ARTIST: {
        return user?.artist?.id;
      }
      case Role.STUDIO: {
        return user?.studio?.id;
      }
      default: {
        return null;
      }
    }
  };

  // Modal open
  const [modalOpen, setModalOpen] = React.useState(false);

  // Open modal
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const submitInviteArtist = async () => {
    const { error } = await inviteArtist({
      email,
      phone_number: phoneNumber,
    });

    if (!error) {
      showSuccessDialog(true, "Invite sent successfully");
    }

    // Close modal
    handleModalClose();

    // Reset field value
    setPhoneNumber("");
    setEmail("");
  };

  // Search
  const search = async (keyword: string) => {
    // Clear all current result first
    setUserList([]);

    // Show loading
    setLoading(true);

    getUserList(user?.role as Role, keyword);

    // Hide loading
    setLoading(false);
  };

  // On remove artist/studio
  const onRemove = async (id: number) => {
    setLoading(true);

    // Remove artist if current role is studio
    if (user?.role === Role.STUDIO) {
      await removeArtist(getMyProfileByRole(user?.role as Role), id);
    }

    setLoading(false);
  };

  useEffect(() => {
    getUserList(user?.role as Role);
  }, []);

  // On search
  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <>
      <Container className={classes.container}>
        <Grid container alignItems={"center"}>
          <Typography variant={"h6"} className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.breaker}>|</Typography>
          <Typography className={classes.userNumber}>
            {userList.length} {user?.role === Role.ARTIST ? "Studios" : "Artists"}
          </Typography>

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

          {user?.role === Role.STUDIO && (
            <PrimaryButton
              variant="contained"
              className={classes.inviteButton}
              startIcon={<AddIcon />}
              primaryColor
              onClick={handleModalOpen}
            >
              Invite Tattoo Artist
            </PrimaryButton>
          )}
        </Grid>
        {!loading && (
          <Grid container spacing={4} className={classes.userCard}>
            {userList.map((user, index) => {
              return (
                <Grid container item lg={3} md={3} sm={4} xs={12} key={index} justify={"center"}>
                  <UserCard data={user} onRemove={onRemove} />
                </Grid>
              );
            })}
          </Grid>
        )}

        {loading && <Loading />}

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
                Invite by email or phone number
              </Typography>

              <TextField
                name="phoneNumber"
                classes={{ root: classes.formInput }}
                label={"Phone number"}
                placeholder={"Phone number"}
                fullWidth
                value={phoneNumber}
                variant={"outlined"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhoneNumber(e.target.value);
                }}
              />

              <TextField
                name="email"
                classes={{ root: classes.formInput }}
                label={"Email"}
                placeholder={"Email"}
                fullWidth
                value={email}
                variant={"outlined"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />

              <PrimaryButton
                variant="contained"
                size="large"
                primaryColor
                className={classes.inviteModalButton}
                onClick={submitInviteArtist}
              >
                Send Invite
              </PrimaryButton>
            </div>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}
