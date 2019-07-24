import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider, Typography } from '@material-ui/core';

type Props = {
  classes: any,
  label: string,
  onChange: any,
  value: Array<number>,
};

const RangeSlider = (props: Props) => {
  const { classes, label, onChange, value } = props;
  const labelId = `${label}-range-slider`;

  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <>
      <Typography id={labelId} gutterBottom>
        {label}
      </Typography>
      <Slider
        classes={classes}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby={labelId}
      />
    </>
  );
};

const styles = theme => ({
  root: {
    color: theme.palette.secondary,
    height: 8,
  },
  thumb: {
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    boxShadow: '#ebebeb 0px 2px 2px',
    '&:focus,&:hover,&$active': {
      boxShadow: '#ccc 0px 2px 3px 1px',
    },
  },
  valueLabel: {
    left: 'calc(-50% - 8px)',
  },
});

export default withStyles(styles)(RangeSlider);
