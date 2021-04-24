import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import debounce from "lodash.debounce";
import Head from "next/head";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

import AdminBody from "src/components/Admin/AdminBody";
import Loading from "src/components/Loading";

import { getUserList } from "./api";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

export default function Users() {
  const classes = useStyles();
  const router = useRouter();

  // Fetch User list
  const { status: userListStatus, data: userListData, error: userListError, refetch: userListRefetch } = useQuery(
    "userList",
    async () => await getUserList(location.search),
  );

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Force refetch after paginate and/or search update
  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: searchValue
        ? { query: searchValue, per_page: rowsPerPage, page: page + 1 }
        : { per_page: rowsPerPage, page: page + 1 },
    });
    setTimeout(() => userListRefetch(), 500);
  }, [page, rowsPerPage, searchValue]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const debouncedSearchInput = useCallback(
    debounce((value: string) => setSearchValue(value), 2000),
    [],
  );

  return (
    <AdminBody>
      <Head>
        <title>TrueArtists: Admin/Users</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">Users</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Autocomplete
            freeSolo
            options={
              userListStatus === "success" ? userListData?.map((option: Admin.User) => option.full_name ?? "") : []
            }
            inputValue={searchInputValue}
            onInputChange={(event, newInputValue) => {
              setSearchInputValue(newInputValue);
              debouncedSearchInput(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Users"
                size="small"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {userListStatus === "loading" ? (
          <React.Fragment>
            <Alert severity="info">Loading... </Alert>
            <Loading />
          </React.Fragment>
        ) : userListStatus === "error" ? (
          <Alert severity="error">{`Retrieving Users - ${userListError}`}</Alert>
        ) : userListData.length > 0 ? (
          <React.Fragment>
            <TableContainer className={classes.tableContainer}>
              <Table size="small" stickyHeader>
                <colgroup>
                  <col width="auto" />
                  <col width="auto" />
                  <col width="auto" />
                  <col width="auto" />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>E-mail</StyledTableCell>
                    <StyledTableCell>Role</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {userListData.map((user: Admin.User, index: number) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Link href={`${router.pathname}/${user.id}`}>{user.full_name}</Link>
                      </StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>{user.role}</StyledTableCell>
                      <StyledTableCell>{user.status ?? "Pending"}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25, 50]}
              rowsPerPage={rowsPerPage}
              count={-1}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              className={classes.paginationWrapper}
            />
          </React.Fragment>
        ) : (
          <Alert severity="info">No users records found...</Alert>
        )}
      </Grid>
    </AdminBody>
  );
}
