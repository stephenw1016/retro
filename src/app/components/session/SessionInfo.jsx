import React, { useState } from 'react';
import { Popover, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import type { Session } from '../../types';

type Props = {
  session: Session,
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block',
    padding: theme.spacing(2),
  },
  field: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
  },
  popover: {
    pointerEvents: 'none',
  },
}));

const SessionInfo = (props: Props) => {
  const { session } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const popoverId = 'session-info-popover';
  const fieldLabelProps = { variant: 'subtitle2' };
  const fieldValueProps = { variant: 'h6' };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <span
        aria-haspopup="true"
        aria-owns={open ? popoverId : undefined}
        className={classes.root}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Typography color="secondary" variant="h5">{session.name}</Typography>
        <Typography variant="subtitle2">
          <span>Session ID: </span>
          <span>{session.id}</span>
        </Typography>
      </span>
      <Popover
        id={popoverId}
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className={classes.field}>
          <Typography {...fieldLabelProps}>Organization</Typography>
          <Typography {...fieldValueProps}>{session.organization || '--'}</Typography>
        </div>
        <div className={classes.field}>
          <Typography {...fieldLabelProps}>Date</Typography>
          <Typography {...fieldValueProps}>{session.date}</Typography>
        </div>
        <div className={classes.field}>
          <Typography {...fieldLabelProps}>Total Categories</Typography>
          <Typography {...fieldValueProps}>{session.categories.length}</Typography>
        </div>
      </Popover>
    </>
  );
};

export default SessionInfo;
