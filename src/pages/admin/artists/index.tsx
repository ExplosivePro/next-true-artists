import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import Link from "next/link";
import Head from "next/head";

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

import AdminBody from "src/components/Admin/AdminBody";
import Loading from "src/components/Loading";

import { getArtistList } from "./api";
import { artist_status } from "./constants";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

export default function Artists() {
  const classes = useStyles();
  const router = useRouter();

  // Fetch Artist list
  const {
    status: artistListStatus,
    data: { artists: artistListData = [], meta = { limit_value: 60, total_count: 0 } } = {},
    error: artistListError,
    refetch: artistListRefetch,
    isFetching: artistListIsFetching,
  } = useQuery("artistList", async () => await getArtistList(location.search));

  const [pageOptions, setPageOptions] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(meta.limit_value);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchValue, setSearchValue] = useState({});
  const [statusFilter, setStatusFilter] = useState({});

  // Force refetch after search update
  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: { ...statusFilter, ...searchValue, ...pageOptions },
    });
    setTimeout(() => artistListRefetch(), 500);
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

  const handleStatusFilterChange = (value: string) => {
    value ? setStatusFilter({ status: value }) : setStatusFilter({});
  };

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Artists</title>
      </Head>

      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Breadcrumbs>
                <Typography variant="h6">
                  <Link href="/admin">Dashboard</Link>
                </Typography>
                <Typography variant="h6">Artists</Typography>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={12} sm={2}>
              {artistListIsFetching ? <Loading /> : null}
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
                {artist_status.map((status, index) => (
                  <MenuItem value={status} key={index}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                freeSolo
                options={
                  artistListStatus === "success"
                    ? artistListData?.map((option: Admin.ArtistProfile) => option.name ?? "")
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
                    label="Search Artists"
                    size="small"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {artistListStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : artistListStatus === "error" ? (
            <Alert severity="error">{`Retrieving Artists - ${artistListError}`}</Alert>
          ) : artistListData.length > 0 ? (
            <React.Fragment>
              <TableContainer className={classes.tableContainer}>
                <Table size="small" stickyHeader>
                  <colgroup>
                    <col width="auto" />
                    <col width="auto" />
                    <col width="auto" />
                    <col width="auto" />
                    <col width="auto" />
                    <col width="auto" />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Phone</StyledTableCell>
                      <StyledTableCell>Country</StyledTableCell>
                      <StyledTableCell>State</StyledTableCell>
                      <StyledTableCell>City</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {artistListData.map((artist: Admin.ArtistProfile, index: number) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <Link href={`${router.pathname}/${artist.id}`}>
                            <a className={classes.listLink}>{artist.name ?? "Null"}</a>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell>{artist.phone_number}</StyledTableCell>
                        <StyledTableCell>{artist.country}</StyledTableCell>
                        <StyledTableCell>{artist.state}</StyledTableCell>
                        <StyledTableCell>{artist.city}</StyledTableCell>
                        <StyledTableCell>{artist.status}</StyledTableCell>
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
            <Alert severity="info">No artists records found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}
