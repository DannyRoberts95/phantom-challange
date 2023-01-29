import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import classes from './PieChart.module.css';

type PropTypes = {
  data: Link[];
};

export default function MyPieChart(props: PropTypes) {
  const router = useRouter();

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
    return tallied;
  }, [data]);

  const handleClick = ({ key }) => {
    router.push(`/`, { query: { category: key } });
  };

  return (
    <div className={classes.root}>
      <h2 className={classes.chartTitle}>Categories</h2>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={450} height={450}>
            <Pie
              label={({ key, tally }) => `${key}:${tally}`}
              paddingAngle={5}
              data={cleanedData}
              dataKey={`tally`}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              fill="rgb(20, 18, 34)"
              onClick={handleClick}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
