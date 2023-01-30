import LinkList from '@/components/LinkList';

type PropTypes = {
  data: Link[];
  updateLocalData: (newData: Link[]) => void;

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
