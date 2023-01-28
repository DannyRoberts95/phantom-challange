import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

const data02 = [
  { name: `A1`, value: 100 },
  { name: `A2`, value: 300 },
  { name: `B1`, value: 100 },
  { name: `B2`, value: 80 },
  { name: `B3`, value: 40 },
  { name: `B4`, value: 30 },
  { name: `B5`, value: 50 },
  { name: `C1`, value: 100 },
  { name: `C2`, value: 200 },
  { name: `D1`, value: 150 },
  { name: `D2`, value: 50 },
];

export default function MyPieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={450} height={450}>
        <Pie
          data={data02}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#000"
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
