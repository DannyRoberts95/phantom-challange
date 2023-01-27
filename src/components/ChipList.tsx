import React, { useRef, useState } from 'react';
import Chip from './Chip';
import styles from './ChipList.module.css';

type PropTypes = {
  categories: string[];
  selectedCategories?: string[];
  handleSelect?: (val: string) => void;
  viewOnly?: boolean;
};

const CreateLinkModal = (props: PropTypes) => {
  const {
    categories = [],
    selectedCategories = [],
    handleSelect = null,
    viewOnly,
  } = props;
  const [showNewInput, setShowNewInput] = useState(false);
  const inputRef = useRef();

  const handleNewCategory = (e) => {
    e.preventDefault();
    const val = inputRef.current.value;
    if (val) {
      handleSelect(val);
      setShowNewInput(false);
      inputRef.current.value = ``;
    }
  };

  const handleBlur = () => {
    const val = inputRef.current.value;
    if (!val) {
      setShowNewInput(false);
    }
  };

  const handleShowInput = (e) => {
    e.preventDefault();
    setShowNewInput(!showNewInput);
  };

  // const handleCategorySelect = (val: string) => {

  // };

  return (
    <div className={styles.root}>
      {/* Select a category */}

      {categories.map((cat) => (
        <Chip
          key={cat}
          label={cat}
          onClick={handleSelect ? () => handleSelect(cat) : null}
          selected={selectedCategories.includes(cat)}
          viewOnly={viewOnly}
        />
      ))}

      <div>
        {/* New Category input */}
        {!viewOnly && !showNewInput && (
          <button className={styles.newInput} onClick={handleShowInput}>
            +
          </button>
        )}

        {showNewInput && (
          <div>
            <input
              className={styles.newInput}
              ref={inputRef}
              name="newCategory"
              type={`string`}
              // value={linkInputValue}
              // onChange={}
              onBlur={handleBlur}
              autoFocus
            />
            <button className={styles.newInput} onClick={handleNewCategory}>
              New Cat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLinkModal;
