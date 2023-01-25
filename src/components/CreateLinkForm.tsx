import React, { useState } from 'react';
import { isEmpty, isNotValidUrl, linkNonexsistant } from '@/utils/validations';

type PropTypes = {
  links: Link[];
  updateLocalData: () => void;
  clearLocalData: () => void;
};

const CreateLinkModal = (props: PropTypes) => {
  const { links = [], updateLocalData } = props;

  const [inputValue, setInputValue] = useState(``);
  const [errorMessage, setErrorMessage] = useState(``);

  const handleAddLink = () => {
    const value: Link = {
      url: `https://www.google.com/${Math.random()}`,
      timestamp: new Date().getTime(),
    };
    updateLocalData([...links, value]);
  };

  const displayErrorMessage = (msg: string) => {
    setErrorMessage(msg);
  };

  const handleInputChange = (e: Event) => {
    const { value } = e.target;
    setInputValue(value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(isNotValidUrl(inputValue));
    // console.log(!validateLink(inputValue, isNotValidUrl, `Not a valid URL`));

    if (isEmpty(inputValue)) {
      displayErrorMessage(`Required Field`);
      return false;
    }
    if (isNotValidUrl(inputValue)) {
      displayErrorMessage(`Not a Valid URL`);
      return false;
    }
    if (linkNonexsistant(inputValue)) {
      displayErrorMessage(`Link does not exist!`);
      return false;
    }

    // VALID
    setErrorMessage(``);
    setInputValue(``);
    const newLink: Link = { url: inputValue, timestamp: new Date().getTime() };
    const newData = [...links, newLink];
    console.log(newData);
    updateLocalData(newData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type={`url`} value={inputValue} onChange={handleInputChange} />
      {/* <button onClick={handleAddLink}>NEW</button> */}
      <button type="submit">ADD</button>
      <p>{errorMessage}</p>
    </form>
  );
};

export default CreateLinkModal;
