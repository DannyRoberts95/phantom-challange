import { timeStamp } from 'console';
import React from 'react';
import Button from './Button';
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

  const { url, categories = [], timestamp } = link;
  console.log(link);

  return (
    <div className={styles.root} {...others}>
      <p className={`text-sm`}>{timestamp}</p>
      <a href={url} target={`_blank`} rel="noopener">
        <p className={`text-lg`}>{url}</p>
      </a>
      <ChipList categories={categories} viewOnly />
      <div className={styles.actions}>
        <Button onClick={deleteLink}>Delete</Button>
      </div>
    </div>
  );
};
export default LinkListItem;
