// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, yellow, red } from '@material-ui/core/colors';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Grow,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';

import type { VoteValue } from './types';

type Props = {
  category: any,
  onSubmit: any,
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    width: '100%',
  },
  checked: {},
  positive: {
    color: green[600],
    '&$checked': { color: green[500] },
  },
  neutral: {
    color: yellow[600],
    '&$checked': { color: yellow[500] },
  },
  negative: {
    color: red[600],
    '&$checked': { color: red[500] },
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    color: 'rgba(0, 0, 0, 0.87)',
    padding: theme.spacing(2),
  },
  tooltipTitle: {
    marginBottom: theme.spacing(1),
  },
}));

const Vote = (props: Props) => {
  const { category, onSubmit } = props;
  const classes = useStyles();
  const voteOptions: Array<VoteValue> = ['positive', 'neutral', 'negative'];
  const [value, setValue] = useState(null);
  const [comment, setComment] = useState('');

  const options = voteOptions.map((option: VoteValue) => (
    <FormControlLabel
      key={option}
      control={<Radio classes={{ root: classes[option], checked: classes.checked }} />}
      label={option}
      value={option}
    />
  ));

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ value, comment });
  };

  const categoryTooltip = (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={(
        <>
          <Typography className={classes.tooltipTitle} variant="caption">
            Which sentiment to you most agree with?
          </Typography>
          <Typography variant="subtitle1">Positive</Typography>
          <Typography variant="body1">{category.description.positive}</Typography>
          <Divider className={classes.divider} component="hr" light />
          <Typography variant="subtitle1">Negative</Typography>
          <Typography variant="body1">{category.description.negative}</Typography>
        </>
      )}
    >
      <IconButton disableRipple aria-label="info">
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Grow in mountOnEnter unmountOnExit timeout={300}>
      <Card className={classes.root} elevation={2}>
        <CardHeader title={category.title} action={categoryTooltip} />
        <CardContent>
          <Grid item xs={12}>
            <FormControl fullWidth component="fieldset" required>
              <FormLabel component="legend" error={!value}>
                Vote
              </FormLabel>
              <RadioGroup
                aria-label="vote"
                name="vote"
                className={classes.group}
                value={value}
                onChange={handleValueChange}
              >
                {options}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="voter-comment"
              label="Comment (optional)"
              margin="normal"
              multiline
              value={comment}
              onChange={handleCommentChange}
            />
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            disabled={!value}
            fullWidth
            variant="contained"
            onClick={handleSubmit}
          >
            Submit Vote
          </Button>
        </CardActions>
      </Card>
    </Grow>
  );
};

export default Vote;
