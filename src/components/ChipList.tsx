import React, { SyntheticEvent, useRef, useState } from 'react';
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
    handleSelect,
    viewOnly = false,
    disableAdd = false,
  } = props;
  const [showNewInput, setShowNewInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewCategory = (e: SyntheticEvent) => {
    e.preventDefault();
    const val = `${inputRef?.current?.value}`.toLowerCase().replaceAll(` `, ``);
    if (val && inputRef?.current) {
      handleSelect && handleSelect(val);
      setShowNewInput(false);
      inputRef.current.value = ``;
    }
  };

  const handleBlur = () => {
    const val = inputRef?.current?.value;
    if (!val) {
      setShowNewInput(false);
    }
  };

  const handleShowInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowNewInput(!showNewInput);
  };

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
      {categories.sort().map((cat) => (
        <Chip
          key={cat}
          label={cat}
          onClick={() => handleSelect && handleSelect(cat)}
          selected={selectedCategories.includes(cat)}
          viewOnly={viewOnly}
        />
      ))}
    </div>
  );
};

export default CreateLinkModal;
