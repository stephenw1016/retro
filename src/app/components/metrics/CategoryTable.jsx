import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import CategoryTableHeader from './CategoryTableHeader';
import type { Category } from '../../types';

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
};

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

type Props = {
  categories: Array<Category>,
  onSelect: any,
};

const useStyles = makeStyles(() => ({
  root: {},
  tableWrapper: {
    overflowX: 'auto',
  },
}));

const CategoryTable = (props: Props) => {
  const { categories } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const data = categories.map((category) => {
    const categoryVotes = Object.values(category.votes || {});
    const { id, title } = category;
    const defaultCategoryMetric = { id, title, positive: 0, neutral: 0, negative: 0 };

    return categoryVotes.reduce((prev, vote) => {
      const newValue = prev[vote.value] + 1;
      return { ...prev, [vote.value]: newValue };
    }, defaultCategoryMetric);
  });

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle" size="small">
          <CategoryTableHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(data, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => {
                const { id, title, positive, neutral, negative } = category;
                const labelId = `category-table-checkbox-${id}`;

                return (
                  <TableRow key={id}>
                    <TableCell component="th" id={labelId} scope="row" padding="none">{title}</TableCell>
                    <TableCell align="right">{positive}</TableCell>
                    <TableCell align="right">{neutral}</TableCell>
                    <TableCell align="right">{negative}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CategoryTable;
