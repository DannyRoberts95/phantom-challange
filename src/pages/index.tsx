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
      {/* <div>
        <TimeLine data={data} />

        <div style={{ height: 400, flexBasis: 1 }}>
          <PieChart data={data} />
        </div>
      </div> */}

      <LinkList
        links={data}
        updateLocalData={updateLocalData}
        clearLocalData={clearLocalData}
      />
    </main>
  );
}
