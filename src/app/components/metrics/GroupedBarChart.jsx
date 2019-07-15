import React from 'react';
import { green, yellow, red } from '@material-ui/core/colors';
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

const GroupedBarChart = (props: Props) => {
  const { data } = props;

  const itemSorter = (a) => {
    if (a.title === 'positive') return -1;
  };

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{ top: 15, right: 25, left: 15, bottom: 10 }}
        barCategoryGap="20%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis width={35} domain={[0, 100]} />
        <Tooltip itemSorter={itemSorter} />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="positive" fill={green[600]} />
        <Bar dataKey="neutral" fill={yellow[600]} />
        <Bar dataKey="negative" fill={red[600]} />
        <XAxis dataKey="title" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GroupedBarChart;
