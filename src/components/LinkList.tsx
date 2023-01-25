import React from 'react';
import LinkListItem from '@/components/LinkListItem';

type PropTypes = {
  links: Link[];
  updateLocalData: () => void;
  clearLocalData: () => void;
};

const LinkList = (props: PropTypes): JSX.Element => {
  const { links = [], updateLocalData, clearLocalData } = props;

  return (
    <div>
      <button onClick={clearLocalData}>Clear</button>
      {/* Links */}
      {links.map((link) => (
        <LinkListItem
          updateLocalData={updateLocalData}
          key={link.timestamp}
          link={link}
        />
      ))}

      {/* Pagination */}
    </div>
  );
};

export default LinkList;
