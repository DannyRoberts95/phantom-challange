import CreateLinkSection from '@/components/CreateLinkSection';
import LinkList from '@/components/LinkList';

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

      <LinkList
        links={data}
        updateLocalData={updateLocalData}
        clearLocalData={clearLocalData}
      />
    </main>
  );
}
