import React from 'react';
import { green, red } from '@material-ui/core/colors';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  data: Array<any>
};

const PyramidChart = (props: Props) => {
  const { data } = props;

  return (
    <ResponsiveContainer>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 15, right: 25, left: 15, bottom: 10 }}
        stackOffset="sign"
        barCategoryGap="40%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="category" dataKey="title" />
        <XAxis type="number" domain={[-100, 100]} />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="positive" fill={green[600]} stackId="stack" />
        <Bar dataKey="negative" fill={red[600]} stackId="stack" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PyramidChart;
