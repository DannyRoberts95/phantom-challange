import React, { useState } from 'react';
import { isEmpty, isNotValidUrl } from '@/utils/validations';

import ChipList from './ChipList';

import styles from './CreateLinkForm.module.css';
import Button from './Button';

type PropTypes = {
  links: Link[];
  updateLocalData: (newData: Link[]) => void;
  clearLocalData: () => void;
};

const CreateLinkModal = (props: PropTypes) => {
  const { links = [], updateLocalData, clearLocalData } = props;

  const [linkInputValue, setLinkInputValue] = useState(``);
  const [categories, setCategories] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState(``);
  const [checking, setChecking] = useState(false);

  const displayErrorMessage = (msg: string) => {
    setErrorMessage(msg);
    setChecking(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setErrorMessage(``);
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

  const handleFakeSubmit = (): void => {
    //Comment to add filler list items
    setErrorMessage(``);
    setLinkInputValue(``);
    setCategories([]);

    const randomCategory = () => {
      const cats = computeAvailableCategories();
      const i = Math.floor(Math.random() * cats.length);
      return cats[i] || `hireDan`;
    };

    const fakeDate = Math.floor(Math.random() * new Date().getTime());
    const fakeLink: Link = {
      url: `https://fakelink.com/${Math.random()}`,
      timestamp: new Date(fakeDate).getTime(),
      categories: [...new Set([randomCategory(), randomCategory()])],
    };
    updateLocalData([fakeLink, ...links]);
    return;
  };

  const handleSubmit = async () => {
    //Validate the form...
    setChecking(true);

    // Is it empty?
    if (isEmpty(linkInputValue)) {
      displayErrorMessage(`Dude, where's my link?`);
      return false;
    }

    // Is it a valid url format?

    // Ping next serverless function and see if the url reachable
    // IsReachable package seems to give inconsistant results. Validation has been removed.

    // const isReachable = await fetch(`api/checkUrl`, {
    //   method: `POST`,
    //   body: JSON.stringify({ url: linkInputValue }),
    // }).then(async (res) => {
    //   const { valid } = await res.json();
    //   return valid;
    // });
    // if (!isReachable) {
    //   displayErrorMessage(`That URL dosn't exist bro...`);
    //   return false;
    // }

    // Seems to be valid if we made it this far.
    setErrorMessage(``);
    setLinkInputValue(``);
    setCategories([]);
    setChecking(false);

    const newLink: Link = {
      url: linkInputValue,
      timestamp: new Date().getTime(),
      categories,
    };
    const newData = [newLink, ...links];
    updateLocalData(newData);
  };

  return (
    <div className={styles.root}>
      <input
        className={styles.linkInput}
        name="link"
        type={`url`}
        placeholder="Enter a link"
        value={linkInputValue}
        onChange={handleInputChange}
        autoFocus
      />

      <p className={styles.errorMessage}>{errorMessage}</p>

      <ChipList
        selectedCategories={categories}
        categories={computeAvailableCategories()}
        handleSelect={handleCategorySelect}
      />

      {/* Clear all button */}
      <div className={styles.actions}>
        <div className={styles.buttons}>
          <Button
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={checking ? () => {} : handleSubmit}
            variant="primary"
            disabled={checking}
          >
            {checking ? `CHECKING...` : `ADD NEW LINK`}
          </Button>
          <Button onClick={handleFakeSubmit}>FAKE LINK</Button>
        </div>
        <Button onClick={clearLocalData}>Delete All</Button>
      </div>
    </div>
  );
};

export default CreateLinkModal;
