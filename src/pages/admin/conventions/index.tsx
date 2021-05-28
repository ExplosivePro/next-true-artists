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

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

import AdminBody from "src/components/Admin/AdminBody";
import handleApiErrors from "src/components/Admin/handleApiErrors";
import PrimaryButton from "src/components/PrimaryButton";
import Loading from "src/components/Loading";
import { InfoAlert } from "src/components/Admin/FormInputs";

import { getConventionList } from "./api";
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
  } = useQuery("conventionList", async () => await getConventionList(location.search));

  // Create an Alert for info feedback
  const [infoAlert, setInfoAlert] = useState({ severity: "info", message: "" });

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
    setTimeout(() => conventionListRefetch(), 500);
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
        <title>TrueArtists: Admin/Conventions</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={4} md={4} lg={4}>
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

        <Grid item xs={12} sm={4} md={4} lg={4}>
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

        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Grid container item justify="center">
            <PrimaryButton
              primaryColor
              onClick={() => console.log(conventionListData) /* router.push(`${router.pathname}/create`) */}
            >
              Add New Convention
            </PrimaryButton>
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
                    <col width="auto" />
                    <col width="auto" />
                    <col width="10%" />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Start Date</StyledTableCell>
                      <StyledTableCell>End Date</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
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
                          {convention?.end_date ? moment(convention?.start_date).format("DD-MM-YYYY") : "--"}
                        </StyledTableCell>
                        <StyledTableCell>{convention?.status ?? "--"}</StyledTableCell>
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
    </AdminBody>
  );
}
