import dynamic from 'next/dynamic';

type PropTypes = {
  data: Link[];
  updateLocalData: (newData: Link[]) => void;

  clearLocalData: () => void;
};

export default function Index({ data }: PropTypes) {
  const TimeLine = dynamic(() => import(`@/components/TimeLine`), {
    ssr: false,
  });
  const PieChart = dynamic(() => import(`@/components/PieChart`), {
    ssr: false,
  });

  return (
    <div>
      <TimeLine data={data} />
      <PieChart data={data} />
    </div>
  );
}
