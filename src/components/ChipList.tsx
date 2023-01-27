import React, { useRef, useState } from 'react';
import Chip from './Chip';

type PropTypes = {
  categories: string[];
  selectedCategories: string[];
  handleSelect: (val: string) => void;
};

const CreateLinkModal = (props: PropTypes) => {
  const { categories = [], selectedCategories = [], handleSelect } = props;
  const [showNewInput, setShowNewInput] = useState(false);
  const inputRef = useRef();

  const handleNewCategory = (e) => {
    e.preventDefault();
    const val = inputRef.current.value;
    if (val) {
      handleSelect(val);
      inputRef.current.value = ``;
    }
  };

  const handleShowInput = (e) => {
    e.preventDefault();
    setShowNewInput(!showNewInput);
  };

  // const handleCategorySelect = (val: string) => {

  // };

  return (
    <div>
      {/* Select a category */}
      <div>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => handleSelect(cat)}
            selected={selectedCategories.includes(cat)}
          />
        ))}
        {/* New Category input */}
        <button onClick={handleShowInput}>Show</button>

        {showNewInput && (
          <div>
            <input
              ref={inputRef}
              name="newCategory"
              type={`string`}
              // value={linkInputValue}
              // onChange={}
              autoFocus
            />
            <button onClick={handleNewCategory}>New Cat</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLinkModal;
