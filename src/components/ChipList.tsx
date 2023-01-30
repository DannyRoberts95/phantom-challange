import React, { useRef, useState } from 'react';
import Chip from './Chip';
import styles from './ChipList.module.css';

type PropTypes = {
  categories: string[];
  selectedCategories?: string[];
  handleSelect?: (val: string) => void;
  viewOnly?: boolean;
  disableAdd?: boolean;
};

const CreateLinkModal = (props: PropTypes) => {
  const {
    categories = [],
    selectedCategories = [],
    handleSelect = null,
    viewOnly,
    disableAdd = false,
  } = props;
  const [showNewInput, setShowNewInput] = useState(false);
  const inputRef = useRef();

  const handleNewCategory = (e) => {
    e.preventDefault();
    const val = `${inputRef.current.value}`.toLowerCase().replaceAll(` `, ``);
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
      <div>
        {/* New Category input */}
        {!disableAdd && !viewOnly && !showNewInput && (
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
              placeholder={`NEW CATEGORY`}
              type={`string`}
              onBlur={handleBlur}
              autoFocus
            />
            <button className={styles.newInput} onClick={handleNewCategory}>
              ADD
            </button>
          </div>
        )}
      </div>

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
    </div>
  );
};

export default CreateLinkModal;
