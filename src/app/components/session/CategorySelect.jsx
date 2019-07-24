// @flow
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import type { Category } from '../../types';

type Props = {
  categories: Array<Category>,
  classes: any,
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

  const handleSelectAll = () => {
    onChange(categories.map(category => category.id));
  };

  const handleDeselectAll = () => {
    onChange([]);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button
          className={classes.button}
          color="secondary"
          onClick={handleSelectAll}
          size="small"
          variant="outlined"
        >
          Select All
        </Button>
        <Button
          className={classes.button}
          color="secondary"
          onClick={handleDeselectAll}
          size="small"
          variant="outlined"
        >
          Deselect All
        </Button>
      </Box>
      <List component="ul" id="categorySelect" className={classes.root} disablePadding>
        {categories.map(({ id, title }) => {
          const labelId = `category-select-label-${id}`;

          return (
            <ListItem
              component="li"
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
    </>
  );
};

const styles = theme => ({
  root: {
    height: 300,
    overflow: 'auto',
    margin: `${theme.spacing(2)}px 0`,
  },
  button: {
    margin: theme.spacing(0, 0.5),
  },
});

export default withStyles(styles)(CategorySelect);
