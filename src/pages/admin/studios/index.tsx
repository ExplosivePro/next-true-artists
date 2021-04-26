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

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

import AdminBody from "src/components/Admin/AdminBody";
import Loading from "src/components/Loading";

import { getStudioList } from "./api";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

export default function Studios() {
  const classes = useStyles();
  const router = useRouter();

  // Fetch Studio list
  const {
    status: studioListStatus,
    data: { studios: studioListData = [], meta = { limit_value: 60, total_count: 0 } } = {},
    error: studioListError,
    refetch: studioListRefetch,
  } = useQuery("studioList", async () => await getStudioList(location.search));

  const [pageOptions, setPageOptions] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(meta.limit_value);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Force refetch after search update
  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: searchValue ? { query: searchValue, ...pageOptions } : pageOptions,
    });
    setTimeout(() => studioListRefetch(), 500);
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

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Studios</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">Studios</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Autocomplete
            freeSolo
            options={
              studioListStatus === "success" ? studioListData?.map((option: Admin.StudioProfile) => option.name) : []
            }
            inputValue={searchInputValue}
            onInputChange={(event, newInputValue) => {
              setSearchInputValue(newInputValue);
              debouncedSearchInput(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Studios"
                size="small"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          {studioListStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : studioListStatus === "error" ? (
            <Alert severity="error">{`Retrieving Studios - ${studioListError}`}</Alert>
          ) : studioListData.length > 0 ? (
            <React.Fragment>
              <TableContainer className={classes.tableContainer}>
                <Table size="small" stickyHeader>
                  <colgroup>
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
                      <StyledTableCell>City</StyledTableCell>
                      <StyledTableCell>Country</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {studioListData.map((studio: Admin.StudioProfile, index: number) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <Link href={`${router.pathname}/${studio.id}`}>{studio.name ?? "Null"}</Link>
                        </StyledTableCell>
                        <StyledTableCell>{studio.phone_number}</StyledTableCell>
                        <StyledTableCell>{studio.city}</StyledTableCell>
                        <StyledTableCell>{studio.country}</StyledTableCell>
                        <StyledTableCell>{studio.status}</StyledTableCell>
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
            <Alert severity="info">No studios records found...</Alert>
          )}
        </Grid>
      </Grid>
    </AdminBody>
  );
}
