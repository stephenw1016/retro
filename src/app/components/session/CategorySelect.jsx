// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

const CategorySelect = (props: Props) => {
  const { categories, classes, onChange, selectedCategoryIds } = props;

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
    <List id="categorySelect" className={classes.root}>
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

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

export default withStyles(styles)(CategorySelect);
