const isEmpty = (value: string): boolean => !value || value.length <= 0;

const isNotValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return false;
  } catch (err) {
    return true;
  }
};

export { isEmpty, isNotValidUrl };
