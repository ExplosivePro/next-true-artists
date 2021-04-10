import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import colors from "../../palette";

import FormInput from "../FormInput";
import { placements } from "../../constants";
import { useYupValidationResolver } from "../../utils";
import PrimaryButton from "../PrimaryButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageListWrapper: {
      margin: "25px 0",
    },
    title: {
      fontWeight: 500,
    },
    imageList: {
      display: "flex",
      margin: "10px 0",
      flexWrap: "wrap",
    },
    imageBox: {
      width: "100px",
      height: "100px",
      minWidth: "100px",
      textAlign: "center",
      border: `solid 1px ${colors.black}`,
      margin: "5px",
      overflow: "hidden",
      "& img": {
        maxWidth: "100px",
        maxHeight: "100px",
      },
    },
    addImageBox: {
      width: "100px",
      height: "100px",
      minWidth: "100px",
      textAlign: "center",
      border: `dashed 2px ${colors.standardGreyBorder}`,
      margin: "5px",
      overflow: "hidden",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      fontSize: "30px",
      color: colors.normalGrey,
      cursor: "pointer",
    },
    finalText: {
      cursor: "pointer",
      paddingLeft: "10px",
      display: "flex",
      alignItems: "center",
      "& svg": {
        color: colors.black,
      },
      "& span": {
        color: colors.black,
        fontWeight: 500,
        marginLeft: "5px",
      },
    },
    fileInput: {
      visibility: "hidden",
      width: 0,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      "&:focus": {
        outline: "none",
      },
      width: "50%",
    },
    alignCenter: {
      margin: "0 auto",
    },
    formInput: {
      margin: "12px 0",
    },
    sectionSubTitle: {
      marginTop: "15px",
      color: colors.black,
      fontWeight: 500,
    },
    form: {
      width: "100%",
    },
    buttonWrapper: {
      marginTop: "20px",
    },
  }),
);

const ImageItem = ({ data, className }: { data: Image; className?: any }) => {
  // Import class styles
  const classes = useStyles();

  return (
    <div className={clsx(classes.imageBox, className)}>
      <img src={data.preview} alt={`tattoos`} />
    </div>
  );
};

const AddImageItem = ({ onAdd }: { onAdd: (data: any) => void }) => {
  // Import class styles
  const classes = useStyles();

  const hiddenFileInput = React.useRef(null);
  const [open, setOpen] = React.useState(false); // Upload modal
  const [placement, setPlacement] = useState(placements[0].value); // Placement data
  const [filePreview, setFilePreview] = useState<any>(); // File preview object

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        workplace: yup.string().required("Workplace is required"),
      }),
    [],
  );

  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  // Open imag upload modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close imag upload modal
  const handleClose = () => {
    // Reset all value
    setFilePreview(null);
    setPlacement(placements[0].value);

    setOpen(false);
  };

  // File input change
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(fileUploaded);

    reader.onloadend = function () {
      setFilePreview({
        file: fileUploaded,
        preview: reader.result,
      });
    };
  };

  const handleClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  // On placement selection change
  const onPlacementChange = (e: any) => {
    setPlacement(e.target.value);
  };

  // On Submit tattoo detail form
  const onSubmit = ({ workplace }: { workplace: string }) => {
    // Save file with its info
    onAdd({
      ...filePreview,
      workplace,
      placement,
    });

    handleClose();
  };

  return (
    <div className={classes.addImageBox}>
      <AddIcon onClick={handleOpen} />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Upload your image</h2>
            <input className={classes.fileInput} type={"file"} ref={hiddenFileInput} onChange={handleChange} />
            {filePreview && <ImageItem data={filePreview} className={classes.alignCenter} />}
            {!filePreview && (
              <div className={clsx(classes.addImageBox, classes.alignCenter)} onClick={handleClick}>
                <AddIcon />
              </div>
            )}

            <Grid container>
              <form id={"tattoo-detail"} onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <Grid item lg={12} md={12} xs={12}>
                  <Typography className={classes.sectionSubTitle}>Workplace</Typography>

                  <FormInput
                    name="workplace"
                    classes={{ root: classes.formInput }}
                    label={"Workplace"}
                    id="workplace"
                    placeholder={"Workplace"}
                    fullWidth
                    control={control}
                    defaultValue={""}
                    variant={"outlined"}
                    errors={errors.workplace}
                  />
                </Grid>

                <Typography className={classes.sectionSubTitle}>Placement (on body)</Typography>
                <Grid item lg={12} md={12} xs={12}>
                  <TextField
                    name="placement"
                    select
                    classes={{ root: classes.formInput }}
                    label={"Placement"}
                    id="placement"
                    placeholder={"Placement"}
                    fullWidth
                    variant={"outlined"}
                    value={placement}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onPlacementChange(e);
                    }}
                  >
                    {placements.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </form>

              <Grid
                container
                item
                justify={"flex-end"}
                alignItems={"center"}
                className={classes.buttonWrapper}
                spacing={2}
              >
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <PrimaryButton
                    type={"button"}
                    variant="outlined"
                    color="primary"
                    size="large"
                    bluePastel
                    fullWidth
                    onClick={handleClose}
                  >
                    Cancel
                  </PrimaryButton>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <PrimaryButton
                    form={"tattoo-detail"}
                    type={"submit"}
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                    bluePastel
                  >
                    Save
                  </PrimaryButton>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const Tattoos = ({ data, addImage }: Props) => {
  // Import class styles
  const classes = useStyles();

  return (
    <div className={classes.imageListWrapper}>
      <div className={classes.title}>Upload images</div>
      <div className={classes.imageList}>
        <AddImageItem onAdd={addImage} />
        {data.map((item, index) => (
          <ImageItem data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export interface Image {
  file: any;
  preview: string;
  workplace: string;
  placement: string;
}

interface Props {
  data: Image[];
  addImage: (data: any) => void;
}

export default Tattoos;
