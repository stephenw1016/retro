import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Popover } from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';

import CategorySelect from '../session/CategorySelect';
import type { Category } from '../../types';

type Props = {
  categories: Array<Category>,
  onCategorySelect: any,
  selectedCategoryIds: Array<string>,
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const FilterPopover = (props: Props) => {
  const { categories, onCategorySelect, selectedCategoryIds } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        color="primary"
        variant="contained"
        onClick={handleClick}
      >
        <FilterIcon />
      </Button>
      <Popover
        classes={{ paper: classes.paper }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <CategorySelect
          className={classes.categorySelect}
          categories={categories}
          selectedCategoryIds={selectedCategoryIds}
          onChange={onCategorySelect}
        />
      </Popover>
    </>
  );
};

export default FilterPopover;
