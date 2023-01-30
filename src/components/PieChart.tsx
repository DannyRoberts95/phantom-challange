// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import useMediaQuery from '@/hooks/useMediaQuery';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  TooltipProps,
} from 'recharts';
import classes from './PieChart.module.css';

import {
  ValueType,
  NameType,
} from 'recharts/lib/component/DefaultTooltipContent';

type PiePropTypes = {
  data: Link[];
};

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className={classes.tooltip}>
        {payload.map((item: any) => {
          const { payload } = item;
          return (
            <>
              <p>{`${payload.key}:${payload.tally}`}</p>
              <p className="text-sm">View Links</p>
            </>
          );
        })}
      </div>
    );
  }
  return null;
};

export default function MyPieChart(props: PiePropTypes) {
  const router = useRouter();

  const isMd = useMediaQuery(`md`);
  console.log(isMd);

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

  const handleClick = ({ key }: { key: string }) => {
    router.push(`/?category=${`${key}`.toLowerCase()}`);
  };

  const size = !isMd ? 300 : 450;
  const outerRadius = !isMd ? 80 : 120;
  const innerRadius = !isMd ? 40 : 80;

  const colors = useMemo<string[]>(() => {
    const step = 255 / cleanedData.length;
    const cols: string[] = [];
    cleanedData.forEach((item, i) => {
      const a = (step * (i + 1)) / 255;
      cols.push(`rgba(0,0,0,${a})`);
    });
    return cols;
  }, [cleanedData]);

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
