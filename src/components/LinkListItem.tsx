import React from 'react';
import Button from './Button';
import ChipList from './ChipList';
import styles from './LinkListItem.module.css';

type PropTypes = {
  link: Link;
  updateLocalData: () => void;
  links: Link[];
  number: number | string;
};

const LinkListItem = ({
  link,
  links,
  updateLocalData,
  number,
  ...others
}: PropTypes) => {
  const deleteLink = () => {
    const newData = links.filter(
      (item: Link) => item.timestamp != link.timestamp,
    );
    updateLocalData(newData);
  };

  const { url, categories = [], timestamp } = link;

  return (
    <div className={styles.root} {...others}>
      <p className={`text-sm`}>{timestamp}</p>
      <a href={url} target={`_blank`} rel="noopener">
        <p className={styles.link}>{url}</p>
      </a>
      <ChipList categories={categories} viewOnly />
      <div className={styles.actions}>
        <Button onClick={deleteLink}>X</Button>
      </div>
      <p className={`text-base`}>{`NUM://${number}`}</p>
    </div>
  );
};
export default LinkListItem;
