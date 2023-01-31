import dynamic from 'next/dynamic';
import classes from './analytics.module.css';
// import PieChart from '@/components/PieChart';
// import TimeLine from '@/components/TimeLine';

type PropTypes = {
  data: Link[];
  updateLocalData: (newData: Link[]) => void;

  clearLocalData: () => void;
};

const TimeLine = dynamic(() => import(`@/components/TimeLine`), {
  ssr: false,
});
const PieChart = dynamic(() => import(`@/components/PieChart`), {
  ssr: false,
});

export default function Index({ data }: PropTypes) {
  if (data.length === 0) {
    return (
      <div className={classes.emptyMessage}>
        <p>Add some links above to view analytics</p>
      </div>
    );
  }

  return (
    <div>
      <PieChart data={data} />
      <TimeLine data={data} />
    </div>
  );
}
