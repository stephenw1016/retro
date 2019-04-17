// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, yellow, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';

import type { VoteValue } from './types';

type Props = {
  classes: any
};

const voteOptions: Array<VoteValue> = ['positive', 'neutral', 'negative'];

class Vote extends Component<Props> {
  render() {
    const { classes } = this.props;

    const options = voteOptions.map((option: VoteValue) => (
      <FormControlLabel
        key={option}
        control={<Radio classes={{ root: classes[option], checked: classes.checked }} />}
        label={option}
        value={option}
      />
    ));

    return (
      <Card>

        <CardContent>
          <FormControl component="fieldset" requinegative className={classes.formControl}>
            <FormLabel component="legend">Color</FormLabel>
            <RadioGroup
              aria-label="color"
              name="color"
              className={classes.group}
            >
              {options}
            </RadioGroup>
          </FormControl>
          <TextField
            id="voter-comment"
            className={classes.textField}
            label="Comment"
            margin="normal"
            multiline
            value=""
          />
        </CardContent>

        <CardActions>
          <Button variant="contained" color="primary">
            Submit Vote
          </Button>
        </CardActions>

      </Card>
    );
  }
}

const styles = () => ({
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
});

export default withStyles(styles)(Vote);
