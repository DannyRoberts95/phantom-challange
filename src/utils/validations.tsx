const isEmpty = (value: string): boolean => !value || value.length <= 0;

const isNotValidUrl = (value: string): boolean => {
  try {
    return Boolean(new URL(value)) ? false : true;
  } catch (e) {
    return true;
  }
};

const linkNonexsistant = async (url: string): boolean => {
  return false;
};

export { isEmpty, isNotValidUrl, linkNonexsistant };
