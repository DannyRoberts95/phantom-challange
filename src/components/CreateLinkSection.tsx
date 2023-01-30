import React from 'react';
import CreateLinkForm from '@/components/CreateLinkForm';
import styles from './CreateLinkSection.module.css';

type PropTypes = {
  links: Link[];
  updateLocalData: (newData: Link[]) => void;
  updateLocalData: () => void;
  clearLocalData: () => void;
};

const CreateLinkModal = (props: PropTypes) => {
  const { links = [], updateLocalData, clearLocalData } = props;

  return (
    <div className={styles.root}>
      <CreateLinkForm
        links={links}
        updateLocalData={updateLocalData}
        clearLocalData={clearLocalData}
      />
    </div>
  );
};

export default CreateLinkModal;
