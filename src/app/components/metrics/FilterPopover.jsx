import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Popover, Typography } from '@material-ui/core';
import { green, yellow, red } from '@material-ui/core/colors';
import FilterIcon from '@material-ui/icons/FilterList';

import CategorySelect from '../session/CategorySelect';
import type { Category } from '../../types';
import RangeSlider from './RangeSlider';

type Props = {
  categories: Array<Category>,
  filter: any,
  onChange: any,
};

const useStyles = makeStyles(theme => ({
  categorySelect: {
    height: 'auto',
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(4),
  },
  positive: {
    color: green[600],
  },
  neutral: {
    color: yellow[700],
  },
  negative: {
    color: red[500],
  },
}));

const FilterPopover = (props: Props) => {
  const { categories, filter, onChange } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [localFilter, setLocalFilter] = useState(filter);
  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;
  const typographyProps = {
    className: classes.header,
    color: 'textSecondary',
    variant: 'subtitle1',
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (categoryIds) => {
    setLocalFilter({ ...localFilter, selectedCategoryIds: categoryIds });
  };

  const handleRangeChange = rangeKey => (value) => {
    setLocalFilter({ ...localFilter, [rangeKey]: value });
  };

  const handleApply = () => {
    onChange(localFilter);
  };

  return (
    <div>
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
        <Typography {...typographyProps}>Filter by Vote %</Typography>
        <RangeSlider
          classes={{ root: classes.positive }}
          label="Positive"
          onChange={handleRangeChange('positive')}
          value={localFilter.positive}
        />
        <RangeSlider
          classes={{ root: classes.neutral }}
          label="Neutral"
          onChange={handleRangeChange('neutral')}
          value={localFilter.neutral}
        />
        <RangeSlider
          classes={{ root: classes.negative }}
          label="Negative"
          onChange={handleRangeChange('negative')}
          value={localFilter.negative}
        />
        <Divider className={classes.divider} component="hr" light />
        <Typography {...typographyProps}>Filter by Category</Typography>
        <CategorySelect
          classes={{ root: classes.categorySelect }}
          categories={categories}
          selectedCategoryIds={localFilter.selectedCategoryIds}
          onChange={handleCategorySelect}
        />
        <Button
          color="primary"
          fullWidth
          onClick={handleApply}
          variant="contained"
        >
          Apply Filter
        </Button>
      </Popover>
    </div>
  );
};

export default FilterPopover;
