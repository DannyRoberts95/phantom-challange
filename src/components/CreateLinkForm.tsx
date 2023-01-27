import React, { useState } from 'react';
import { isEmpty, isNotValidUrl } from '@/utils/validations';

import ChipList from './ChipList';

type PropTypes = {
  links: Link[];
  updateLocalData: () => void;
  clearLocalData: () => void;
};

const CreateLinkModal = (props: PropTypes) => {
  const { links = [], updateLocalData } = props;

  const [linkInputValue, setLinkInputValue] = useState(``);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState(``);

  const displayErrorMessage = (msg: string) => {
    setErrorMessage(msg);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setLinkInputValue(value.trim());
  };

  //compute all tag options from a combo of existing tags in localstorage & any just added by the user
  const computeAvailableCategories = () => {
    const cats: string[] = [];
    links.forEach((link) => {
      if (link.categories) {
        link.categories.forEach((cat) => cats.push(cat));
      } else return;
    });
    return [...new Set([...cats, ...categories])];
  };

  const handleCategorySelect = (val: string) => {
    if (categories.includes(val)) {
      const filtered = categories.filter((cat) => cat != val);
      setCategories(filtered);
    } else {
      setCategories([...categories, val]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Comment to add filler list items
    setErrorMessage(``);
    setLinkInputValue(``);
    setCategories([]);
    const fakeLink: Link = {
      url: `https://derp.com/${Math.random()}`,
      timestamp: new Date().getTime(),
      categories,
    };
    updateLocalData([...links, fakeLink]);
    return;

    //Validate the form...

    // Is it empty?
    if (isEmpty(linkInputValue)) {
      displayErrorMessage(`Required Field`);
      return false;
    }

    // Is it a valid url format?
    if (isNotValidUrl(linkInputValue)) {
      displayErrorMessage(`Not a Valid URL`);
      return false;
    }

    // Is the url reachable?
    await fetch(`api/checkUrl`, {
      method: `POST`,
      body: JSON.stringify({ url: linkInputValue }),
    }).then(async (res) => {
      const { valid } = await res.json();
      if (!valid) {
        displayErrorMessage(`URL dosn't seem to exist...`);
        return false;
      }
    });

    // Seems to be valid if we made it this far.
    setErrorMessage(``);
    setLinkInputValue(``);
    setCategories([]);
    const newLink: Link = {
      url: linkInputValue,
      timestamp: new Date().getTime(),
      categories,
    };
    const newData = [...links, newLink];
    updateLocalData(newData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        name="link"
        type={`url`}
        value={linkInputValue}
        onChange={handleInputChange}
        autoFocus
      />
      <p>{errorMessage}</p>

      <hr />

      <ChipList
        selectedCategories={categories}
        categories={computeAvailableCategories()}
        handleSelect={handleCategorySelect}
      />
      <hr />

      <button type="submit">ADD NEW LINK</button>
      <hr />
    </form>
  );
};

export default CreateLinkModal;
