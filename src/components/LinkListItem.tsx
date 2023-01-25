import React from 'react';

type PropTypes = {
  link: Link;
  updateLocalData: () => void;
};

const LinkListItem = ({ link, updateLocalData, ...others }: PropTypes) => {
  const deleteLink = () => {
    console.log(`first`);
  };

  return <div {...others}>{link.url}</div>;
};
export default LinkListItem;
