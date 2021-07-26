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
import MenuItem from "@material-ui/core/MenuItem";

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

import { getLandingPageList, deleteLandingPage } from "src/api/admin/landingPages";
import { landingPage_status } from "src/constants/admin/landingPages";
import { useStyles, StyledTableCell, StyledTableRow } from "src/styles/admin/landingPages";

import getConfig from "next/config";

export default function LandingPages() {
  const classes = useStyles();
  const router = useRouter();
  const PUBLIC_BASE = getConfig().publicRuntimeConfig.PUBLIC_PAGE_BASE_URL;

  // Fetch Landing Page list
  const {
    status: pageListStatus,
    data: { landing_pages: pageListData = [], meta = { limit_value: 60, total_count: 0 } } = {},
    error: pageListError,
    refetch: pageListRefetch,
    isFetching: pageListIsFetching,
  } = useQuery("landingPageList", async () => await getLandingPageList(location.search));

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const [pageOptions, setPageOptions] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(meta.limit_value);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchValue, setSearchValue] = useState({});
  const [statusFilter, setStatusFilter] = useState({});

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState({ isOpen: false, title: "", pageId: "" });

  // Force refetch after search update
  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: { ...statusFilter, ...searchValue, ...pageOptions },
    });
    setTimeout(() => pageListRefetch(), 500);
  }, [statusFilter, searchValue, pageOptions]);

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
    debounce((value: string) => (value ? setSearchValue({ query: value }) : setSearchValue({})), 2000),
    [],
  );

  const onDelete = async (pageId: string) => {
    confirmDeleteDialogClose();
    try {
      const response = await deleteLandingPage(pageId);
      if (response)
        setInfoAlert({ severity: "error", message: `Error deleting landing page! - ${handleApiErrors(response)}` });
      else {
        setInfoAlert({ severity: "success", message: "Landing page deleted successfully" });
        setTimeout(() => pageListRefetch(), 500);
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error deleting landing page! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const confirmDeleteDialogOpen = (title: string, pageId: string) => {
    setConfirmDeleteDialog({ isOpen: true, title: title, pageId: pageId });
  };

  const confirmDeleteDialogClose = () => {
    setConfirmDeleteDialog({ isOpen: false, title: "", pageId: "" });
  };

  const handleStatusFilterChange = (value: string) => {
    value ? setStatusFilter({ status: value }) : setStatusFilter({});
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Landing Pages</title>
      </Head>

      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              {infoAlert.message ? (
                <InfoAlert infoAlert={infoAlert} setInfoAlert={setInfoAlert} />
              ) : (
                <Breadcrumbs>
                  <Typography variant="h6">
                    <Link href="/admin">Dashboard</Link>
                  </Typography>
                  <Typography variant="h6">Landing Pages</Typography>
                </Breadcrumbs>
              )}
            </Grid>

            <Grid item xs={12} sm={1}>
              {pageListIsFetching ? <Loading /> : null}
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                variant="outlined"
                select
                fullWidth
                size="small"
                label="Filter by Status"
                defaultValue=""
                onChange={(e) => handleStatusFilterChange(e.target.value)}
              >
                <MenuItem value="">Clear Filter...</MenuItem>
                {landingPage_status.map((status, index) => (
                  <MenuItem value={status} key={index}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Autocomplete
                freeSolo
                options={
                  pageListStatus === "success"
                    ? pageListData?.map((option: Admin.LandingPages) => option.title ?? "")
                    : []
                }
                inputValue={searchInputValue}
                onInputChange={(event, newInputValue) => {
                  setSearchInputValue(newInputValue);
                  debouncedSearchInput(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search LandingPages"
                    size="small"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Grid container item justify="center">
                <PrimaryButton primaryColor onClick={() => router.push(`${router.pathname}/create`)}>
                  Add New Landing Page
                </PrimaryButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {pageListStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : pageListStatus === "error" ? (
            <Alert severity="error">{`Retrieving Landing Pages - ${handleApiErrors(pageListError)}`}</Alert>
          ) : pageListData.length > 0 ? (
            <React.Fragment>
              <TableContainer className={classes.tableContainer}>
                <Table size="small" stickyHeader>
                  <colgroup>
                    <col width="auto" />
                    <col width="auto" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Title</StyledTableCell>
                      <StyledTableCell>Page Title</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell className={classes.statusHeader} colSpan={2}>
                        Actions
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {pageListData.map((landingPage: Admin.LandingPages, index: number) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <Link href={`${PUBLIC_BASE}${landingPage?.page_key}`}>
                            <a target="_blank" className={classes.listLink}>
                              {landingPage?.title}
                            </a>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell>{landingPage?.page_title}</StyledTableCell>
                        <StyledTableCell>{landingPage?.status}</StyledTableCell>
                        <StyledTableCell className={classes.statusHeader}>
                          <Link href={`${router.pathname}/edit/${landingPage?.id}`}>
                            <a className={classes.listLink}>Edit</a>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.deleteCell}
                          onClick={() => confirmDeleteDialogOpen(landingPage?.title, landingPage?.id.toString())}
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
                rowsPerPageOptions={[5, 10, 20, 40, 60, { value: meta.total_count, label: "All" }]}
                rowsPerPage={rowsPerPage}
                count={meta.total_count}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                className={classes.paginationWrapper}
              />
            </React.Fragment>
          ) : (
            <Alert severity="info">No landing pages records found...</Alert>
          )}
        </Grid>
      </Grid>

      {confirmDeleteDialog.isOpen ? (
        <ConfirmDeleteDialog
          title={confirmDeleteDialog.title}
          pageId={confirmDeleteDialog.pageId}
          close={confirmDeleteDialogClose}
          isOpen={confirmDeleteDialog.isOpen}
          handleDelete={onDelete}
        />
      ) : (
        <React.Fragment />
      )}
    </AdminBody>
  );
}

function ConfirmDeleteDialog({
  title,
  pageId,
  close,
  isOpen,
  handleDelete,
}: {
  title: string;
  pageId: string;
  close: () => void;
  isOpen: boolean;
  handleDelete: (T: string) => void;
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>
          <IconButton size="small" className={classes.closeButton} onClick={close}>
            <CloseIcon fontSize="small" />
          </IconButton>
          Confirm Delete
        </DialogTitle>

        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this landing page?
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            <b>{title}</b>
          </Typography>
        </DialogContent>
        <DialogActions>
          <PrimaryButton variant="outlined" size="small" primaryColor onClick={close}>
            Cancel
          </PrimaryButton>
          <PrimaryButton size="small" primaryColor onClick={() => handleDelete(pageId)}>
            Delete
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
