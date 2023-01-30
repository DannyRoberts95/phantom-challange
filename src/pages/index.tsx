import PieChart from '@/components/PieChart';
import CreateLinkSection from '@/components/CreateLinkSection';
import LinkList from '@/components/LinkList';
import TimeLine from '@/components/TimeLine';

type PropTypes = {
  data: Link[];
  updateLocalData: () => void;
  clearLocalData: () => void;
};

export default function Index({
  data,
  updateLocalData,
  clearLocalData,
}: PropTypes) {
  return (
    <div>
      <LinkList
        links={data}
        updateLocalData={updateLocalData}
        clearLocalData={clearLocalData}
      />
    </div>
  );
}
