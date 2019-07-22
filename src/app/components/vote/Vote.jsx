// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, yellow, red } from '@material-ui/core/colors';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Grow,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';

import type { Vote as VoteType, VoteValue } from './types';

type Props = {
  category: any,
  onSubmit: any,
  vote: VoteType,
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
}));

const Vote = (props: Props) => {
  const { category, onSubmit, vote } = props;
  const classes = useStyles();
  const voteOptions: Array<VoteValue> = ['positive', 'neutral', 'negative'];
  const [value, setValue] = useState(vote ? vote.value : '');
  const [comment, setComment] = useState(vote ? vote.comment : '');

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

  return (
    <Grow in mountOnEnter unmountOnExit timeout={300}>
      <Card className={classes.root} elevation={2}>
        <CardHeader title={category.title} />
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
