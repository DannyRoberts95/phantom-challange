import PieChart from '@/components/PieChart';
import TimeLine from '@/components/TimeLine';

type PropTypes = {
  data: Link[];
  updateLocalData: (newData: Link[]) => void;

  clearLocalData: () => void;
};

export default function Index({ data }: PropTypes) {
  return (
    <div>
      <TimeLine data={data} />
      <PieChart data={data} />
    </div>
  );
}
