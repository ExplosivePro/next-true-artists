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

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

import AdminBody from "src/components/Admin/AdminBody";
import PrimaryButton from "src/components/PrimaryButton";
import Loading from "src/components/Loading";
import CreateNew from "./create";

import { getArticleList } from "./api";
import { useStyles, StyledTableCell, StyledTableRow } from "./styles";

export default function Articles() {
  const classes = useStyles();
  const router = useRouter();

  // Fetch Article list
  const {
    status: articleListStatus,
    data: { articles: articleListData = [], meta = { limit_value: 60, total_count: 0 } } = {},
    error: articleListError,
    refetch: articleListRefetch,
  } = useQuery("articleList", async () => await getArticleList(location.search));

  const [pageOptions, setPageOptions] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(meta.limit_value);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [placeholder, setPlaceholder] = useState("");

  // Force refetch after search update
  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: searchValue ? { query: searchValue, ...pageOptions } : pageOptions,
    });
    setTimeout(() => articleListRefetch(), 500);
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
        <title>TrueArtists: Admin/Articles</title>
      </Head>

      <Grid container>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Breadcrumbs>
            <Typography variant="h6">
              <Link href="/admin">Dashboard</Link>
            </Typography>
            <Typography variant="h6">Articles</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={6} md={2} lg={2}>
          <PrimaryButton bluePastel onClick={() => setIsOpenCreate(true)}>
            Create Article
          </PrimaryButton>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Autocomplete
            freeSolo
            options={
              articleListStatus === "success"
                ? articleListData?.map((option: Admin.Articles) => option.title ?? "")
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
                label="Search Articles"
                size="small"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          {articleListStatus === "loading" ? (
            <React.Fragment>
              <Alert severity="info">Loading... </Alert>
              <Loading />
            </React.Fragment>
          ) : articleListStatus === "error" ? (
            <Alert severity="error">{`Retrieving Articles - ${articleListError}`}</Alert>
          ) : articleListData.length > 0 ? (
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
                      <StyledTableCell>Title</StyledTableCell>
                      <StyledTableCell>Page Title</StyledTableCell>
                      <StyledTableCell>Author</StyledTableCell>
                      <StyledTableCell>Category</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {articleListData.map((article: Admin.Articles, index: number) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <Link href={`${router.pathname}/${article.id}`}>{article.title}</Link>
                        </StyledTableCell>
                        <StyledTableCell>{article.page_title}</StyledTableCell>
                        <StyledTableCell>{article.user.full_name}</StyledTableCell>
                        <StyledTableCell>{article.category.name}</StyledTableCell>
                        <StyledTableCell>{article.status}</StyledTableCell>
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
            <Alert severity="info">No articles records found...{placeholder}</Alert>
          )}
        </Grid>
        {isOpenCreate ? (
          <CreateNew isOpen={setIsOpenCreate} setArticleId={setPlaceholder} refetch={articleListRefetch} />
        ) : null}
      </Grid>
    </AdminBody>
  );
}
