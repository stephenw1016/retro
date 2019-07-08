// @flow
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, yellow, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import type { VoteValue } from './types';

type Props = {
  classes: any,
  category: any,
  onSubmit: any,
};

const Vote = (props: Props) => {
  const { classes, category, onSubmit } = props;
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

  return (
    <Card className={classes.root} elevation={2}>
      <CardHeader
        title={category.title}
        action={(
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={(
              <>
                <Typography className={classes.tooltipTitle} variant="caption">
                  Which sentiment to you most agree with?
                </Typography>
                <Typography variant="subtitle1">Positive</Typography>
                <Typography variant="body1">{category.description.positive}</Typography>
                <Divider className={classes.divider} light />
                <Typography variant="subtitle1">Negative</Typography>
                <Typography variant="body1">{category.description.negative}</Typography>
              </>
            )}
          >
            <IconButton disableRipple>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}
      />
      <CardContent>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            component="fieldset"
            required
            className={classes.formControl}
          >
            <FormLabel component="legend" error={!value}>Vote</FormLabel>
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
  );
};

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
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
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    padding: theme.spacing.unit * 2,
  },
  tooltipTitle: {
    marginBottom: theme.spacing.unit,
  },
});

export default withStyles(styles)(Vote);
