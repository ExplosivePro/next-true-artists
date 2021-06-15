import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import debounce from "lodash.debounce";
import moment from "moment";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PageviewIcon from "@material-ui/icons/Pageview";
import AdjustIcon from "@material-ui/icons/Adjust";

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

import { getConventionList, deleteConvention } from "./api";
import { conventionStatus } from "./constants";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

import getConfig from "next/config";

export default function Conventions() {
  const classes = useStyles();
  const router = useRouter();
  const PUBLIC_BASE = getConfig().publicRuntimeConfig.PUBLIC_PAGE_BASE_URL;

  // Fetch Convention list
  const {
    status: conventionListStatus,
    data: { conventions: conventionListData = [], meta = { limit_value: 60, total_count: 0 } } = {},
    error: conventionListError,
    refetch: conventionListRefetch,
    isFetching: conventionIsFetching,
  } = useQuery("conventionList", async () => await getConventionList(location.search));

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

  const [pageOptions, setPageOptions] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(meta.limit_value);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchValue, setSearchValue] = useState({});
  const [statusFilter, setStatusFilter] = useState({});

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState({ isOpen: false, title: "", conventionId: "" });

  // Force refetch after search update
  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: { ...statusFilter, ...searchValue, ...pageOptions },
    });
    setTimeout(() => conventionListRefetch(), 500);
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

  const onDelete = async (conventionId: string) => {
    confirmDeleteDialogClose();
    try {
      const response = await deleteConvention(conventionId);
      if (response)
        setInfoAlert({ severity: "error", message: `Error deleting convention! - ${handleApiErrors(response)}` });
      else {
        setInfoAlert({ severity: "success", message: "Convention deleted successfully" });
        setTimeout(() => conventionListRefetch(), 500);
      }
    } catch (error) {
      setInfoAlert({ severity: "error", message: `Error deleting convention! - ${handleApiErrors(error)}` });
    }
    setTimeout(() => {
      setInfoAlert({ severity: "info", message: "" });
    }, 4500);
  };

  const confirmDeleteDialogOpen = (title: string, conventionId: string) => {
    setConfirmDeleteDialog({ isOpen: true, title: title, conventionId: conventionId });
  };

  const confirmDeleteDialogClose = () => {
    setConfirmDeleteDialog({ isOpen: false, title: "", conventionId: "" });
  };

  const handleStatusFilterChange = (value: string) => {
    value ? setStatusFilter({ status: value }) : setStatusFilter({});
  };

  const showBoolean = (value: boolean) =>
    value ? (
      <CheckCircleIcon fontSize="small" className={classes.greenIcon} />
    ) : (
      <CancelIcon fontSize="small" className={classes.redIcon} />
    );

  const showStatus = (value: string) =>
    value === conventionStatus.Approved ? (
      <Chip
        icon={<CheckCircleIcon fontSize="small" className={classes.greenIcon} />}
        label="Approved"
        variant="outlined"
        size="small"
        className={classes.tableChip}
      />
    ) : value === conventionStatus.Rejected ? (
      <Chip
        icon={<CancelIcon fontSize="small" className={classes.redIcon} />}
        label="Rejected"
        variant="outlined"
        size="small"
        className={classes.tableChip}
      />
    ) : value === conventionStatus["Pending Review"] ? (
      <Chip
        icon={<PageviewIcon fontSize="small" className={classes.blueIcon} />}
        label="Review"
        variant="outlined"
        size="small"
        className={classes.tableChip}
      />
    ) : value === conventionStatus.Pending ? (
      <Chip
        icon={<AdjustIcon fontSize="small" />}
        label="Pending"
        variant="outlined"
        size="small"
        className={classes.tableChip}
      />
    ) : (
      value
    );

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Conventions</title>
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
                  <Typography variant="h6">Conventions</Typography>
                </Breadcrumbs>
              )}
            </Grid>

            <Grid item xs={12} sm={1}>
              {conventionIsFetching ? <Loading /> : null}
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
                {Object.entries(conventionStatus).map(([status, value], index) => (
                  <MenuItem value={value} key={index}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Autocomplete
                freeSolo
                options={
                  conventionListStatus === "success"
                    ? conventionListData?.map((option: Admin.Conventions) => option.name ?? "")
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
                    label="Search Conventions"
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
                  Add New Convention
                </PrimaryButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {conventionListStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : conventionListStatus === "error" ? (
            <Alert severity="error">{`Retrieving Conventions - ${handleApiErrors(conventionListError)}`}</Alert>
          ) : conventionListData.length > 0 ? (
            <React.Fragment>
              <TableContainer className={classes.tableContainer}>
                <Table size="small" stickyHeader>
                  <colgroup>
                    <col width="auto" />
                    <col width="auto" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="3%" />
                    <col width="2%" />
                    <col width="10%" />
                    <col width="5%" />
                    <col width="5%" />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Start date</StyledTableCell>
                      <StyledTableCell>End date</StyledTableCell>
                      <StyledTableCell className={classes.statusCell} colSpan={2}>
                        Active/On
                      </StyledTableCell>
                      <StyledTableCell className={classes.statusCell}>Status</StyledTableCell>
                      <StyledTableCell className={classes.statusCell} colSpan={2}>
                        Actions
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {conventionListData.map((convention: Admin.Conventions, index: number) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <Link href={`${PUBLIC_BASE}/conventions/${convention?.id}`}>
                            <a target="_blank" className={classes.listLink}>
                              {convention?.name ?? "Null"}
                            </a>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell>{convention?.description ?? "--"}</StyledTableCell>
                        <StyledTableCell>
                          {convention?.start_date ? moment(convention?.start_date).format("DD-MM-YYYY") : "--"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {convention?.end_date ? moment(convention?.end_date).format("DD-MM-YYYY") : "--"}
                        </StyledTableCell>
                        <StyledTableCell className={classes.statusCell}>
                          {showBoolean(moment(convention?.end_date).isSameOrAfter(Date()))}
                        </StyledTableCell>
                        <StyledTableCell className={classes.statusCell}>
                          {moment(convention?.start_date).isSameOrBefore(Date()) &&
                          moment(convention?.end_date).isSameOrAfter(Date()) ? (
                            <VolumeUpIcon fontSize="small" />
                          ) : null}
                        </StyledTableCell>
                        <StyledTableCell className={classes.statusCell}>
                          {showStatus(convention?.status)}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Link href={`${router.pathname}/${convention?.id}`}>
                            <a className={classes.listLink}>View</a>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.deleteCell}
                          onClick={() => confirmDeleteDialogOpen(convention?.name, convention?.id.toString())}
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
            <Alert severity="info">No conventions records found...</Alert>
          )}
        </Grid>
      </Grid>

      {confirmDeleteDialog.isOpen ? (
        <ConfirmDeleteDialog
          title={confirmDeleteDialog.title}
          conventionId={confirmDeleteDialog.conventionId}
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
  conventionId,
  close,
  isOpen,
  handleDelete,
}: {
  title: string;
  conventionId: string;
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
            Are you sure you want to delete this convention?
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            <b>{title}</b>
          </Typography>
        </DialogContent>
        <DialogActions>
          <PrimaryButton variant="outlined" size="small" primaryColor onClick={close}>
            Cancel
          </PrimaryButton>
          <PrimaryButton size="small" primaryColor onClick={() => handleDelete(conventionId)}>
            Delete
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
