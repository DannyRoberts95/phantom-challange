import React from 'react';
import CreateLinkForm from '@/components/CreateLinkForm';
type PropTypes = {
  links: Link[];
  updateLocalData: () => void;
  clearLocalData: () => void;
};

const CreateLinkModal = (props: PropTypes) => {
  const { links = [], updateLocalData, clearLocalData } = props;

  const handleAddLink = () => {
    const value: Link = {
      url: `https://www.google.com/${Math.random()}`,
      timestamp: new Date().getTime(),
    };
    updateLocalData([...links, value]);
  };

  return (
    <div>
      <CreateLinkForm handleAddLink={handleAddLink} />
    </div>
  );
};

export default CreateLinkModal;
