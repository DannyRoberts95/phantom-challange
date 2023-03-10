// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

import {
  ValueType,
  NameType,
} from 'recharts/lib/component/DefaultTooltipContent';

import styles from './TimeLine.module.css';
import ChipList from './ChipList';

import classes from './TimeLine.module.css';
import useMediaQuery from '@/hooks/useMediaQuery';

type ChartPropTypes = {
  data: Link[];
};

import formatDate from '@/utils/formatDate';

export default function TimeLine(props: ChartPropTypes) {
  const { data } = props;
  const router = useRouter();
  const isXs = useMediaQuery(`xs`);

  const cleanedData = useMemo(
    () =>
      data
        .map((item) => ({
          ...item,
          time: new Date(item.timestamp).getHours(),
        }))
        .sort((a: Link, b: Link) => b.timestamp - a.timestamp),
    [data],
  );

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p className="label">{`${formatDate(label)} @ ${new Date(
            label,
          ).getHours()}:${new Date(label).getMinutes()}`}</p>
          {payload.map((item: any) => (
            <span key={item.payload.url}>
              <b>
                <p>{item.payload.url}</p>
              </b>
              {item.payload.categories && (
                <ChipList categories={item.payload.categories} viewOnly />
              )}
              <p className="text-sm">VIEW</p>
            </span>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleClick = ({ url }: { url: string }) => {
    router.push(url);
  };

  return (
    <div className={classes.root}>
      <h2 className={`text-xl`}>Posts Overtime</h2>

      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart height={400} data={cleanedData}>
            <Tooltip content={<CustomTooltip />} />

            <XAxis
              dataKey="timestamp"
              type="number"
              domain={[0, 24]}
              tickFormatter={formatDate}
              tickLine={false}
            />
            <YAxis
              allowDataOverflow={false}
              domain={[`dataMin`, `dataMax`]}
              type="number"
              tickLine={false}
              tickFormatter={(value: string) => `${value}:00`}
              width={isXs ? 1 : 60}
            />
            <Scatter
              onClick={handleClick}
              name="links"
              dataKey="time"
              fill="black"
              line={{ stroke: `rgba(20, 18, 34, 0.1)`, strokeWidth: 1 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
