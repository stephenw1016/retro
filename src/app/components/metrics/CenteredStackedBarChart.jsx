// @flow
import React from 'react';
import { green, red } from '@material-ui/core/colors';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  data: Array<any>
};

const CenteredStackedBarChart = (props: Props) => {
  const { data } = props;
  const dataWithNegativeValues = data.map(d => ({ ...d, negative: -d.negative }));

  const itemSorter = (a) => {
    if (a.title === 'positive') {
      return -1;
    }

    return 0;
  };

  return (
    <ResponsiveContainer>
      <BarChart
        layout="vertical"
        data={dataWithNegativeValues}
        margin={{ top: 15, right: 25, left: 15, bottom: 10 }}
        stackOffset="sign"
        barCategoryGap="20%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="category" dataKey="title" />
        <XAxis type="number" domain={[-100, 100]} />
        <Tooltip itemSorter={itemSorter} />
        <Legend />
        <Bar dataKey="positive" fill={green[600]} stackId="stack" />
        <Bar dataKey="negative" fill={red[600]} stackId="stack" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CenteredStackedBarChart;
