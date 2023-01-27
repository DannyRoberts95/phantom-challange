import React from 'react';
import CreateLinkForm from '@/components/CreateLinkForm';
type PropTypes = {
  links: Link[];
  updateLocalData: () => void;
  clearLocalData: () => void;
};

const CreateLinkModal = (props: PropTypes) => {
  const { links = [], updateLocalData, clearLocalData } = props;

  return (
    <div style={{ border: `1px solid red` }}>
      <CreateLinkForm
        links={links}
        updateLocalData={updateLocalData}
        clearLocalData={clearLocalData}
      />
    </div>
  );
};

export default CreateLinkModal;
