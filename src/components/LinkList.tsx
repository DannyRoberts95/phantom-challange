import React, { useMemo, useState } from 'react';
import LinkListItem from '@/components/LinkListItem';
import ChipList from '@/components/ChipList';
import { useRouter } from 'next/router';
import styles from './LinkList.module.css';
import Button from './Button';
import Link from 'next/link';
import { useEffect } from 'react';
type PropTypes = {
  links: Link[];
  updateLocalData: (newData: Link[]) => void;
  clearLocalData: () => void;
};

const maxLinksPerPage = 20;

const LinkList = (props: PropTypes): JSX.Element => {
  const router = useRouter();

  const { links = [], updateLocalData } = props;
  // Use Query Parameters from next router to control pagination
  // This allows a user to link directly to a specific page
  const {
    query: { page = `0`, category },
  }: { query: { page?: string; category?: string } } = router;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [linkCount, setLinkCount] = useState(0);

  useEffect(() => {
    category && setSelectedCategories([category]);
  }, [category]);

  const parsedPageValue = parseInt(page);

  const handleNext = () => {
    router.push(`?page=${parsedPageValue + 1}`);
  };
  const handlePrev = () => {
    router.push(`?page=${parsedPageValue - 1}`);
  };

  const handleCategorySelect = (val: string) => {
    router.push(`/`, { query: { page: `0` } });
    if (selectedCategories.includes(val)) {
      const filtered = selectedCategories.filter((cat) => cat != val);
      setSelectedCategories(filtered);
    } else {
      setSelectedCategories([...selectedCategories, val]);
    }
  };

  //compute all tag options from a combo of existing tags in localstorage & any just added by the user
  const computeAvailableCategories = () => {
    const cats: string[] = [];
    links.forEach((link) => {
      if (link.categories) {
        link.categories.forEach((cat) => cats.push(cat));
      } else return;
    });
    return [...new Set([...cats, `uncategorised`])];
  };

  //Memoise the rendering of the links to prevent unnessecary heavy re-renders
  const renderLinks = useMemo(() => {
    let arr = links;
    //Filter the links by category
    // for each link
    arr = arr.filter((link) => {
      //grab its categories
      const { categories } = link;
      //short circut filter if there are no category selections
      if (selectedCategories.length === 0) return true;
      // check if at least one of the categories exists in the selectedCategories
      const containsCategory = categories.some((cat) =>
        selectedCategories.includes(cat),
      );
      //check if the link is uncategorised
      const uncategorised = !categories || categories.length == 0;

      if (selectedCategories.includes(`uncategorised`))
        return containsCategory || uncategorised;

      return containsCategory;
    });

    setLinkCount(arr.length);

    //Pull links for this page
    const begin = parsedPageValue * maxLinksPerPage;
    const end = begin + maxLinksPerPage;
    arr = arr.slice(begin, end);
    return arr;
  }, [parsedPageValue, links, selectedCategories]);

  const pageCount = Math.ceil(linkCount / maxLinksPerPage);
  const arr = new Array(pageCount);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = null;
  }

  return (
    <div className={styles.root}>
      <p className="text-base">
        {linkCount} Link(s){` `}
        {selectedCategories.length > 0 ? `${selectedCategories.join(`/`)}` : ``}
      </p>
      {/* Categories */}
      <ChipList
        categories={computeAvailableCategories()}
        selectedCategories={selectedCategories}
        disableAdd
        handleSelect={handleCategorySelect}
      />
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

        <div className={styles.pages}>
          {arr.map((item, i) => (
            <Link key={i} className={styles.pageLink} href={`/?page=${i}`}>
              {parsedPageValue === i ? <b>{i + 1}</b> : i + 1}
            </Link>
          ))}
        </div>

        <div>
          {!(parsedPageValue + 1 >= pageCount) && (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkList;
