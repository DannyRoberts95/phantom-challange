import CreateLinkModal from '@/components/CreateLinkForm';
import LinkList from '@/components/LinkList';
import styles from '@/styles/Home.module.css';

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
    <main className={styles.main}>
      <CreateLinkModal
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
