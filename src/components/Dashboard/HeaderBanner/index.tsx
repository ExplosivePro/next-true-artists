import React, { useState } from "react";
import clsx from "clsx";

import useStyles from "./styles";

import { Divider, Typography } from "@material-ui/core";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import NewReleasesRoundedIcon from "@material-ui/icons/NewReleasesRounded";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";

import Attribute from "./Attribute";

import { attributes } from "../../../constants/attributes";
import { Role } from "../../../constants";
import { useAuth } from "../../../contexts";

export enum Type {
  IN_REVIEW = 0,
  UNDER_REVIEW = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export function getTypeByStatus(status: string) {
  switch (status) {
    case "pending_review": {
      return Type.UNDER_REVIEW;
    }
    case "rejected": {
      return Type.REJECTED;
    }
    case "approved": {
      return Type.APPROVED;
    }
    default: {
      return Type.IN_REVIEW;
    }
  }
}

const getMessageByStatus = (status: Type, requireActivation = false) => {
  // Profile is already valid
  if (!requireActivation) {
    switch (status) {
      case Type.UNDER_REVIEW: {
        return "Your profile is under review.";
      }
      case Type.REJECTED: {
        return "Your profile has been rejected. Check your email for more details";
      }
      default: {
        return "Thank you for joining TrueArtists. We will review your application within 3-5 business days.  We will notify you via email";
      }
    }
  } else {
    return "Activate your profile";
  }
};

const getIconByStatus = (status: Type, requireActivation = false) => {
  if (!requireActivation) {
    switch (status) {
      case Type.UNDER_REVIEW: {
        return <WarningRoundedIcon fontSize={"small"} />;
      }
      case Type.REJECTED: {
        return <CancelRoundedIcon fontSize={"small"} />;
      }
      default: {
        return <CheckCircleRoundedIcon fontSize={"small"} />;
      }
    }
  } else {
    return <NewReleasesRoundedIcon fontSize={"small"} />;
  }
};

export default function HeaderBanner({ status, requireActivation = false }: Props) {
  const classes = useStyles();
  const { user, hasAttribute } = useAuth();

  // Modal open
  const [modalOpen, setModalOpen] = useState(false);

  // Open modal
  const handleModalOpen = () => {
    if (requireActivation) {
      setModalOpen(true);
    }
  };

  // Close modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        className={clsx(classes.root, {
          [classes.inReview]: status === Type.IN_REVIEW && !requireActivation,
          [classes.underReview]: status === Type.UNDER_REVIEW && !requireActivation,
          [classes.rejected]: status === Type.REJECTED && !requireActivation,
          [classes.activate]: requireActivation,
        })}
        onClick={handleModalOpen}
      >
        {getIconByStatus(status, requireActivation)}
        <Typography className={classes.text}>{getMessageByStatus(status, requireActivation)}</Typography>
      </div>

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

            <Typography variant={"h6"}>Activate your profile</Typography>

            <Typography variant={"subtitle2"} className={classes.modalTitle}>
              Complete your profile to get verified and gain full access to True Artist
            </Typography>
            {attributes.map((attribute, index) => {
              if (attribute.acceptRoles.includes(user?.role as Role)) {
                return (
                  <div key={index}>
                    <Attribute
                      data={attribute}
                      checked={hasAttribute(attribute.mappingKey)}
                      onClick={handleModalClose}
                    />
                    {index !== attributes.length - 1 && <Divider />}
                  </div>
                );
              } else {
                return <div key={index} />;
              }
            })}
          </div>
        </Fade>
      </Modal>
    </>
  );
}

interface Props {
  status: Type;
  requireActivation: boolean;
}
