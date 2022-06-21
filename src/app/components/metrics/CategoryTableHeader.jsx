// @flow
import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headRows = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'positive', numeric: true, disablePadding: false, label: 'Positive' },
  { id: 'neutral', numeric: true, disablePadding: false, label: 'Neutral' },
  { id: 'negative', numeric: true, disablePadding: false, label: 'Negative' },
];

type Props = {
  onRequestSort: any,
  order: string,
  orderBy: string,
};

const CategoryTableHeader = (props: Props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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
