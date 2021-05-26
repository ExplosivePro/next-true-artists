import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import debounce from "lodash.debounce";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";
import PrimaryButton from "src/components/PrimaryButton";
import Loading from "src/components/Loading";
import { InfoAlert } from "src/components/Admin/FormInputs";

import { getStyleList, deleteStyle } from "./api";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

export default function Styles() {
  const classes = useStyles();
  const router = useRouter();

  // Fetch Style list
  const { status: styleListStatus, data: styleListData, error: styleListError, refetch: styleListRefetch } = useQuery(
    "styleList",
    async () => await getStyleList(location.search),
  );

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const [pageOptions, setPageOptions] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [deleteStyleDialog, setDeleteStyleDialog] = useState({ isOpen: false, title: "", styleId: "" });

  // Force refetch after search update
  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: searchValue ? { query: searchValue, ...pageOptions } : pageOptions,
    });
    setTimeout(() => styleListRefetch(), 500);
  }, [searchValue, pageOptions]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    setPageOptions({ per_page: rowsPerPage, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPageOptions({ per_page: parseInt(event.target.value, 10), page: 1 });
  };

  const debouncedSearchInput = useCallback(
    debounce((value: string) => setSearchValue(value), 2000),
    [],
  );

  const onDelete = async (styleId: string) => {
    deleteStyleDialogClose();
    try {
      const response = await deleteStyle(styleId);
      if (response) setInfoAlert({ severity: "error", message: "Error deleting style !" });
      else {
        setInfoAlert({ severity: "success", message: "Style deleted successfully" });
        setTimeout(() => styleListRefetch(), 500);
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error deleting style! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const deleteStyleDialogOpen = (title: string, styleId: string) => {
    setDeleteStyleDialog({ isOpen: true, title: title, styleId: styleId });
  };

  const deleteStyleDialogClose = () => {
    setDeleteStyleDialog({ isOpen: false, title: "", styleId: "" });
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Styles</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={5}>
          {infoAlert.message ? (
            <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} />
          ) : (
            <Breadcrumbs>
              <Typography variant="h6">
                <Link href="/admin">Dashboard</Link>
              </Typography>
              <Typography variant="h6">Styles</Typography>
            </Breadcrumbs>
          )}
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <Autocomplete
            freeSolo
            options={
              styleListStatus === "success" ? styleListData?.map((option: Admin.Style) => option.name ?? "") : []
            }
            inputValue={searchInputValue}
            onInputChange={(event, newInputValue) => {
              setSearchInputValue(newInputValue);
              debouncedSearchInput(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Styles"
                size="small"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={2} md={3}>
          <Grid container justify="center">
            <PrimaryButton primaryColor onClick={() => router.push(`${router.pathname}/create`)}>
              Add New Style
            </PrimaryButton>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.buttonWrapper} />
          <Grid container item justify="center">
            {styleListStatus === "loading" ? (
              <React.Fragment>
                <Alert severity="info">Loading... </Alert>
                <Loading />
              </React.Fragment>
            ) : styleListStatus === "error" ? (
              <Alert severity="error">{`Retrieving Styles - ${handleApiErrors(styleListError)}`}</Alert>
            ) : styleListData.length > 0 ? (
              <React.Fragment>
                <TableContainer className={classes.tableContainer}>
                  <Table stickyHeader>
                    <colgroup>
                      <col width="auto" />
                      <col width="15%" />
                      <col width="15%" />
                    </colgroup>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell className={classes.actionsHeader} colSpan={2}>
                          Actions
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {styleListData.map((style: Admin.Style, index: number) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>{style.name}</StyledTableCell>
                          <StyledTableCell>
                            <Link href={`${router.pathname}/${style.id}`}>
                              <a className={classes.listLink}>Edit</a>
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.deleteCell}
                            onClick={() => deleteStyleDialogOpen(style.name, style.id.toString())}
                          >
                            Delete
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  component="div"
                  rowsPerPageOptions={[5, 10, 25, 40, 60]}
                  rowsPerPage={rowsPerPage}
                  count={-1}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  className={classes.paginationWrapper}
                />
              </React.Fragment>
            ) : (
              <Alert severity="info">No styles records found...</Alert>
            )}
          </Grid>
        </Grid>
      </Grid>

      {deleteStyleDialog.isOpen ? (
        <ConfirmResetPassword
          title={deleteStyleDialog.title}
          styleId={deleteStyleDialog.styleId}
          close={deleteStyleDialogClose}
          isOpen={deleteStyleDialog.isOpen}
          handleDelete={onDelete}
        />
      ) : (
        <React.Fragment />
      )}
    </AdminBody>
  );
}

function ConfirmResetPassword({
  title,
  styleId,
  close,
  isOpen,
  handleDelete,
}: {
  title: string;
  styleId: string;
  close: () => void;
  isOpen: boolean;
  handleDelete: (T: string) => void;
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <IconButton className={classes.closeButton} onClick={close}>
        <CloseIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this style?
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            <b>{title}</b>
          </Typography>
        </DialogContent>
        <DialogActions>
          <PrimaryButton variant="outlined" size="small" primaryColor onClick={close}>
            Cancel
          </PrimaryButton>
          <PrimaryButton size="small" primaryColor onClick={() => handleDelete(styleId)}>
            Delete
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
