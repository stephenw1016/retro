// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import type { Category } from '../../types';

type Props = {
  categories: Array<Category>,
  classes: {},
  onChange: Function,
  selectedCategoryIds: Array<string>,
};

const useStyles = makeStyles(theme => ({
  root: {
    height: 300,
    overflow: 'auto',
    margin: `${theme.spacing(2)}px 0`,
  },
}));

const CategorySelect = (props: Props) => {
  const { categories, onChange, selectedCategoryIds } = props;
  const classes = useStyles();

  const handleCategoryToggle = id => () => {
    const currentIndex = selectedCategoryIds.indexOf(id);
    const newSelectedCategories = [...selectedCategoryIds];

    if (currentIndex === -1) {
      newSelectedCategories.push(id);
    } else {
      newSelectedCategories.splice(currentIndex, 1);
    }

    onChange(newSelectedCategories);
  };

  return (
    <List id="categorySelect" className={classes.root} disablePadding>
      {categories.map(({ id, title }) => {
        const labelId = `category-select-label-${id}`;

        return (
          <ListItem
            key={id}
            button
            dense
            divider
            onClick={handleCategoryToggle(id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedCategoryIds.includes(id)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={title} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CategorySelect;
