// @flow
import React, { Component } from 'react';
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
};

const voteOptions: Array<VoteValue> = ['positive', 'neutral', 'negative'];

class Vote extends Component<Props> {
  render() {
    const { classes, category } = this.props;

    const options = voteOptions.map((option: VoteValue) => (
      <FormControlLabel
        key={option}
        control={<Radio classes={{ root: classes[option], checked: classes.checked }} />}
        label={option}
        value={option}
      />
    ));

    return (
      <Card className={classes.root}>
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
              <FormLabel component="legend">Color</FormLabel>
              <RadioGroup
                aria-label="color"
                name="color"
                className={classes.group}
              >
                {options}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="voter-comment"
              className={classes.textField}
              label="Comment (optional)"
              margin="normal"
              multiline
              value=""
            />
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button variant="contained" color="primary">
            Submit Vote
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    maxWidth: 300,
    padding: theme.spacing.unit,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  checked: {

  },
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
    color: 'rgba(0, 0, 0, 0.87)',
    padding: theme.spacing.unit * 2,
  },
  tooltipTitle: {
    marginBottom: theme.spacing.unit,
  },
});

export default withStyles(styles)(Vote);
