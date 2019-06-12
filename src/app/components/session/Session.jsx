// @flow
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Paper, Typography } from '@material-ui/core';

import Vote from '../vote/Vote';

type Props = {
  classes: Object,
  name: string,
};

const Session = (props: Props) => {
  const { classes, name } = props;
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchCategories = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch('../../../../data/categories.json');
        const data = await response.json();

        if (!ignore) {
          setCategories(data);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchCategories();
    return () => { ignore = true; };
  }, []);

  return (
    <Paper className={classes.root} square elevation={0}>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? <CircularProgress /> : (
        <>
          <Typography variant="h3">{name}</Typography>
          {categories.map(category => <Vote key={category.title} category={category} />)}
        </>
      )}
    </Paper>
  );
};

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Session);
