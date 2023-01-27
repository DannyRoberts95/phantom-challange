import React, { useMemo } from 'react';
import LinkListItem from '@/components/LinkListItem';
import { useRouter } from 'next/router';
import styles from './LinkList.module.css';
import Button from './Button';
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
      <div className={styles.listActions}>
        <Button onClick={clearLocalData}>Clear All</Button>
      </div>

      {/* Links List*/}
      <div className={styles.list}>
        {renderLinks.map((link) => (
          <LinkListItem
            updateLocalData={updateLocalData}
            key={link.timestamp}
            link={link}
            links={links}
          />
        ))}
      </div>

      {/* Pagination */}

      <div className={styles.pagination}>
        <div>
          {parsedPageValue > 0 && <Button onClick={handlePrev}>Prev</Button>}
        </div>
        <h3>{parsedPageValue + 1}</h3>
        <div>
          {parsedPageValue < links.length / maxLinksPerPage - 1 && (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkList;
