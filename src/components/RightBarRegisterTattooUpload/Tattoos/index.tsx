// External
import clsx from "clsx";
import React, { useEffect, useState } from "react";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ErrorIcon from "@material-ui/icons/Error";

// Custom Components
import PrimaryButton from "../../PrimaryButton";
import Loading from "../../Loading";

// Contexts
import { placements } from "../../../constants";

import useStyles from "./styles";
import { useRouter } from "next/router";

// APIs
import { getWorkingStyleList } from "../../../api";
import MultipleSelection from "../../ArtistProfile/MutilpleSelection";

const ImageItem = ({ data, className, editMode = false }: { data: any; className?: any; editMode?: boolean }) => {
  // Import class styles
  const classes = useStyles();

  return (
    <div className={clsx(classes.imageBox, className)}>
      <img src={editMode ? data.image?.image_url : data.preview} alt={`tattoos`} />
    </div>
  );
};

const AddImageItem = ({
  onAdd,
  setLoading,
  editMode = false,
}: {
  onAdd: (data: any) => void;
  setLoading: (value: boolean) => void;
  editMode: boolean;
}) => {
  // Import class styles
  const classes = useStyles();

  const hiddenFileInput = React.useRef(null);

  // Read files to generate preview images
  const processFileUpload = async (i: number, files: any[], results: any[]): Promise<any[]> => {
    return new Promise((resolve) => {
      const fileUploaded = files[i];

      if (fileUploaded) {
        const reader = new FileReader();
        reader.readAsDataURL(fileUploaded);

        reader.onloadend = async function () {
          results.push({
            file: fileUploaded,
            preview: reader.result,
            styles: [],
            placement: "",
            caption: "",
            featured: false,
          });

          if (i === files.length - 1) {
            resolve(results);
          } else {
            resolve(await processFileUpload(i + 1, files, results));
          }
        };
      }
    });
  };

  // File input change
  const handleChange = async (event: any) => {
    if (event.target.files.length > 0) {
      // Show loading
      setLoading(true);

      // Process uploading files
      const results = await processFileUpload(0, event.target.files, []);

      onAdd(results);
    }
  };

  const handleClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  return (
    <>
      <PrimaryButton variant="outlined" color="primary" primaryColor size="medium" onClick={handleClick}>
        {editMode ? "Replace image" : "Upload images"}
      </PrimaryButton>
      <input className={classes.fileInput} type={"file"} multiple ref={hiddenFileInput} onChange={handleChange} />
    </>
  );
};

const Tattoos = ({
  data,
  addImage,
  loading = false,
  onSetLoading,
  onUpdate,
  onChange,
  onDelete,
  editMode = false,
}: Props) => {
  // Import class styles
  const classes = useStyles();
  const { push } = useRouter();

  const [workingStyles, setWorkingStyles] = useState([]);

  const fetchWorkingStyle = async () => {
    const rs = await getWorkingStyleList();

    setWorkingStyles(rs);
  };

  useEffect(() => {
    fetchWorkingStyle();
  }, []);

  return (
    <>
      <div className={classes.imageList}>
        <AddImageItem onAdd={addImage} setLoading={onSetLoading} editMode={editMode} />
      </div>
      <Grid container>
        <Grid container justify={"center"}>
          {loading && <Loading />}
        </Grid>

        {data.map((item, index) => {
          return (
            <Grid container key={index} spacing={2} className={classes.tattooCard}>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                <ImageItem data={item} className={classes.alignCenter} editMode={editMode} />
              </Grid>
              <Grid item lg={7} md={7} sm={12} xs={12}>
                {!editMode && !item?.saved && (
                  <Grid container alignItems={"center"} className={classes.alertWrapper}>
                    <ErrorIcon />
                    <Typography display={"inline"} variant={"subtitle2"}>
                      Your image information is not saved yet.
                    </Typography>
                  </Grid>
                )}

                <IconButton
                  className={classes.deleteIcon}
                  onClick={() => {
                    onDelete(item.id as number);
                  }}
                >
                  <DeleteIcon />
                </IconButton>

                <form id={`tattoo-detail-${index}`} className={classes.form}>
                  <Grid item lg={12} md={12} xs={12} className={classes.inputWrapper}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item.featured}
                          onChange={(e) => {
                            onChange(index, "featured", e.target.checked);
                          }}
                          name="featured"
                          color="primary"
                        />
                      }
                      label={
                        <Typography>
                          <b>Display in My Best Artwork?</b>
                        </Typography>
                      }
                    />

                    <Typography variant={"subtitle2"}>
                      (All photos are displayed in your gallery, you may choose 4 images to show at the top of your page
                      in My Best Artwork area)
                    </Typography>
                  </Grid>

                  <Grid item lg={12} md={12} xs={12} className={classes.inputWrapper}>
                    <Typography className={classes.sectionSubTitle}>Styles)</Typography>

                    <MultipleSelection
                      name={"Styles"}
                      value={item.styles || []}
                      optionList={workingStyles.map((workingStyle: any) => workingStyle.name)}
                      onChange={(value) => {
                        onChange(index, "styles", value);
                      }}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} xs={12} className={classes.inputWrapper}>
                    <Typography className={classes.sectionSubTitle}>Placement (on body)</Typography>
                    <TextField
                      name="placement"
                      select
                      classes={{ root: classes.formInput }}
                      label={"Placement"}
                      id="placement"
                      placeholder={"Placement"}
                      fullWidth
                      variant={"outlined"}
                      value={item.placement}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(index, "placement", e.target.value);
                      }}
                    >
                      {placements.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item lg={12} md={12} xs={12} className={classes.inputWrapper}>
                    <Typography className={classes.sectionSubTitle}>Caption</Typography>

                    <TextField
                      name="caption"
                      classes={{ root: classes.formInput }}
                      label={"Caption"}
                      id={`caption-${index}`}
                      placeholder={"Caption"}
                      fullWidth
                      value={item.caption}
                      variant={"outlined"}
                      multiline
                      rows={3}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(index, "caption", e.target.value);
                      }}
                    />
                  </Grid>

                  {!editMode && (
                    <PrimaryButton
                      type={"button"}
                      variant="contained"
                      fullWidth
                      color="primary"
                      size="large"
                      primaryColor
                      onClick={() => {
                        onUpdate(
                          item.id as number,
                          {
                            styles: workingStyles
                              .filter((workingStyle: any) => item.styles.includes(workingStyle.name))
                              .map((filteredStyle: any) => filteredStyle.id),
                            placement: item.placement,
                            caption: item.caption,
                            featured: item.featured,
                          },
                          index,
                        );
                      }}
                    >
                      Save changes
                    </PrimaryButton>
                  )}

                  {editMode && (
                    <Grid container spacing={1}>
                      <Grid item lg={6} md={6} xs={6}>
                        <PrimaryButton
                          type={"button"}
                          variant="outlined"
                          fullWidth
                          color="primary"
                          size="large"
                          primaryColor
                          onClick={() => {
                            push("/dashboard/gallery");
                          }}
                        >
                          Cancel
                        </PrimaryButton>
                      </Grid>
                      <Grid item lg={6} md={6} xs={6}>
                        <PrimaryButton
                          type={"button"}
                          variant="contained"
                          fullWidth
                          color="primary"
                          size="large"
                          primaryColor
                          onClick={() => {
                            onUpdate(
                              item.id as number,
                              {
                                styles: workingStyles
                                  .filter((workingStyle: any) => item.styles.includes(workingStyle.name))
                                  .map((filteredStyle: any) => filteredStyle.id),
                                placement: item.placement,
                                caption: item.caption,
                                featured: item.featured,
                              },
                              index,
                            );
                          }}
                        >
                          Save changes
                        </PrimaryButton>
                      </Grid>
                    </Grid>
                  )}
                </form>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export interface Image {
  id?: number;
  file: any;
  preview: string;
  workplace: string;
  placement: string;
  color: string;
  caption: string;
  featured: boolean;
  saved: boolean;
  styles: string[];
}

interface Props {
  data: Image[];
  addImage: (data: any) => void;
  loading: boolean;
  onSetLoading: (value: boolean) => void;
  onUpdate: (id: number, payload: any, index: number) => void;
  onDelete: (id: number) => void;
  onChange: (index: number, name: string, value: any) => void;
  editMode?: boolean;
}

export default Tattoos;
