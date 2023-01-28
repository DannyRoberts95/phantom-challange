import React, { useMemo } from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import styles from './TimeLine.module.css';
type PropTypes = {
  data: Link[];
};

const formatDate = (value) =>
  `${new Date(value).getDate()}/${new Date(value).getUTCMonth()}/${new Date(
    value,
  ).getFullYear()}`;

export default function TimeLine(props: PropTypes) {
  const { data } = props;

  const cleanedData = useMemo(
    () =>
      data
        .map((item) => ({
          ...item,
          time: new Date(item.timestamp).getHours(),
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    [data],
  );

  const CustomTooltip = (props) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p className="label">{`${formatDate(label)} @ ${new Date(
            label,
          ).getHours()}:00`}</p>
          {payload.map((item) => (
            <p key={item.payload.url}>{item.payload.url}</p>
          ))}
          {console.log(payload)}
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={cleanedData}
        margin={{
          top: 20,
          right: 60,
          bottom: 20,
          left: 40,
        }}
      >
        <Tooltip content={<CustomTooltip />} />

        <XAxis
          dataKey="timestamp"
          type="number"
          domain={[`0`, `24`]}
          allowDataOverflow={false}
          tickFormatter={formatDate}
          tickLine={false}
        />
        <YAxis
          allowDataOverflow={false}
          domain={[`dataMin`, `dataMax`]}
          type="number"
          tickLine={false}
          // tickCount={8}
          tickFormatter={(value) => `${value}:00`}
        />
        <Scatter
          // animationEasing="ease-in-out"
          name="links"
          dataKey="time"
          fill="black"
          line={{ stroke: `#0001`, strokeWidth: 1 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
