import useMediaQuery from '@/hooks/useMediaQuery';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import classes from './PieChart.module.css';

type PropTypes = {
  data: Link[];
};

const CustomTooltip = (props) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className={classes.tooltip}>
        {payload.map((item) => (
          <>
            <p>{`${item.payload.key}:${item.payload.tally}`}</p>
            <p className="text-sm">View Links</p>
          </>
        ))}
      </div>
    );
  }
  return null;
};

export default function MyPieChart(props: PropTypes) {
  const router = useRouter();

  const isMd = useMediaQuery(`md`);

  const { data } = props;

  const cleanedData = useMemo(() => {
    const allCats: string[] = [];
    data.forEach((item) => item.categories.forEach((cat) => allCats.push(cat)));
    const deduped = [...new Set(allCats)];
    const tallied = deduped.map((item) => {
      const key = item;
      let tally = 0;
      allCats.forEach((cat) => {
        if (cat == key) {
          tally++;
        }
      });
      return { key, tally };
    });

    const uncategorised = { key: `uncategorised`, tally: 0 };
    data.forEach((item) => {
      if (!item.categories.length) {
        uncategorised.tally++;
      }
    });

    return [...tallied, uncategorised];
  }, [data]);

  const handleClick = ({ key }) => {
    router.push(`/?category=${`${key}`.toLowerCase()}`);
  };

  console.log(isMd);
  const size = !isMd ? 300 : 450;
  const outerRadius = !isMd ? 80 : 120;
  const innerRadius = !isMd ? 40 : 80;

  const colors = useMemo<string[]>(() => {
    const step = 255 / cleanedData.length;
    const cols = [];
    cleanedData.forEach((item, i) => {
      const a = (step * (i + 1)) / 255;
      cols.push(`rgba(0,0,0,${a})`);
    });
    return cols;
  }, [data]);

  return (
    <div className={classes.root}>
      <h2 className={`text-xl`}>Categories</h2>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={size} height={size}>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              label={({ key, tally }) => `${key}:${tally}`}
              paddingAngle={2}
              data={cleanedData}
              dataKey={`tally`}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill="rgb(20, 18, 34)"
              onClick={handleClick}
            >
              {cleanedData.map((entry, i) => (
                <Cell
                  key={`cell-${entry.key}`}
                  fill={colors[i % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
