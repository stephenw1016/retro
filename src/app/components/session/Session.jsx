// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

import { Session as SessionType } from '../../types';
import Vote from '../vote/Vote';
import { getSessionById } from '../../state/selectors';

type Props = {
  classes: {},
  name: string,
  session: SessionType,
};

const Session = (props: Props) => {
  const { classes, name, session } = props;

  if (!session) {
    return null;
  }

  return (
    session && (
      <Paper className={classes.root} square elevation={0}>
        <Typography variant="h3">{name}</Typography>
        {session.categories.map(category => <Vote key={category.id} category={category} />)}
      </Paper>
    )
  );
};

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});

const mapStateToProps = (state, ownProps) => ({
  session: getSessionById(state, ownProps.match.params.id),
});

export default connect(mapStateToProps)(withStyles(styles)(Session));
