import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headRows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'positive', numeric: true, disablePadding: false, label: 'Positive' },
  { id: 'neutral', numeric: true, disablePadding: false, label: 'Neutral' },
  { id: 'negative', numeric: true, disablePadding: false, label: 'Negative' },
];

type Props = {
  numSelected: number,
  onRequestSort: any,
  onSelectAllClick: any,
  order: string,
  orderBy: string,
  rowCount: number,
};

const CategoryTableHeader = (props: Props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Select all desserts' }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CategoryTableHeader;
