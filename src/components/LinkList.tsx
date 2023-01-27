import React, { useMemo } from 'react';
import LinkListItem from '@/components/LinkListItem';
import { useRouter } from 'next/router';
import styles from './LinkList.module.css';
type PropTypes = {
  links: Link[];
  updateLocalData: () => void;
  clearLocalData: () => void;
};

//Change to 20
const maxLinksPerPage = 3;

const LinkList = (props: PropTypes): JSX.Element => {
  const router = useRouter();

  const { links = [], updateLocalData, clearLocalData } = props;
  // Use Query Parameters from next router to control pagination
  // This allows a user to link directly to a specific page
  const {
    query: { page = `0` },
  } = router;

  const parsedPageValue = parseInt(page);

  const handleNext = () => {
    router.push(`?page=${parsedPageValue + 1}`);
  };
  const handlePrev = () => {
    router.push(`?page=${parsedPageValue - 1}`);
  };

  //Memoise the rendering of the links to prevent unnessecary heavy re-renders
  const renderLinks = useMemo(() => {
    const begin = parsedPageValue * maxLinksPerPage;
    const end = begin + maxLinksPerPage;
    return links.slice(begin, end);
  }, [parsedPageValue, links]);

  return (
    <div className={styles.root}>
      {/* Clear all button */}
      <button onClick={clearLocalData}>Clear All</button>

      {/* Links List*/}
      {renderLinks.map((link) => (
        <LinkListItem
          updateLocalData={updateLocalData}
          key={link.timestamp}
          link={link}
          links={links}
        />
      ))}

      {/* Pagination */}

      <div className={styles.pagination}>
        <div>
          {parsedPageValue > 0 && <button onClick={handlePrev}>Prev</button>}
        </div>
        <div>{parsedPageValue + 1}</div>
        <div>
          {parsedPageValue < links.length / maxLinksPerPage - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkList;
