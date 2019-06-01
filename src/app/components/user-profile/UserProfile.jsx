// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: any,
};

const UserProfile = (props: Props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>User Profile</div>
  );
};

const styles = () => ({
  root: {},
});

export default withStyles(styles)(UserProfile);
