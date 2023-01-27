import React from 'react';
import Chip from './Chip';

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
    <div {...others}>
      {url}
      {/* <iframe src={url} height="200" width="300" title="Link Iframe"></iframe> */}
      {categories && (
        <div>
          {categories.map((cat) => (
            <Chip key={cat} label={cat} />
          ))}
        </div>
      )}
      <button onClick={deleteLink}>Remove</button>
      <hr />
    </div>
  );
};
export default LinkListItem;
