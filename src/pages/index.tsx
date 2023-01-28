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
    <main>
      <CreateLinkSection
        links={data}
        updateLocalData={updateLocalData}
        clearLocalData={clearLocalData}
      />

      <div style={{ height: 400 }}>
        <TimeLine data={data} />
      </div>

      <div style={{ height: 400 }}>
        <PieChart />
      </div>

      <LinkList
        links={data}
        updateLocalData={updateLocalData}
        clearLocalData={clearLocalData}
      />
    </main>
  );
}
