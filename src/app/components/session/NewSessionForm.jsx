// @flow
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Grid,
  Paper,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

type Props = {
  classes: any,
};

const NewSessionForm = (props: Props) => {
  const { classes } = props;

  const [team, setTeam] = useState({});
  const [teams, setTeams] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchTeams() {
      setIsError(false);
      setIsLoading(true);

      try {
        // TODO: get teams available to signed in user.
        const { data } = await axios('../../../../data/teams.json');
        if (!ignore) {
          setTeams(data);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }

    fetchTeams();
    return () => { ignore = true; };
  }, []);

  const handleTeamChange = (e) => {
    setTeam(e.target.value);
  };

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? <CircularProgress /> : (
        <Grid container alignContent="center" justify="center">
          <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  New Session
                </Typography>
              </Grid>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="teamSelect" shrink>Team</InputLabel>
                <Select
                  value={team}
                  onChange={handleTeamChange}
                  input={<Input name="team" id="teamSelect" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {teams.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
                </Select>
                <FormHelperText>Choose a team for your retrospective.</FormHelperText>
              </FormControl>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker value={selectedDate} onChange={handleDateChange} />
              </MuiPickersUtilsProvider>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const styles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing.unit * 2,
  },
  formControl: {
  },
  title: {
    padding: theme.spacing.unit,
  },
});

export default withStyles(styles)(NewSessionForm);
