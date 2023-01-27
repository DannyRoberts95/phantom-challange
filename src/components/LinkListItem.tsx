import React from 'react';
import ChipList from './ChipList';
import styles from './LinkListItem.module.css';

type PropTypes = {
  link: Link;
  updateLocalData: () => void;
  links: Link[];
};

const LinkListItem = ({
  link,
  links,
  updateLocalData,
  ...others
}: PropTypes) => {
  const deleteLink = () => {
    const newData = links.filter(
      (item: Link) => item.timestamp != link.timestamp,
    );
    updateLocalData(newData);
  };

  const { url, categories = [] } = link;

  return (
    <div className={styles.root} {...others}>
      <h3 className={`text-lg`}>{url}</h3>
      {/* <iframe src={url} height="200" width="300" title="Link Iframe"></iframe> */}

      <ChipList categories={categories} viewOnly />

      <button onClick={deleteLink}>Remove</button>
    </div>
  );
};
export default LinkListItem;
