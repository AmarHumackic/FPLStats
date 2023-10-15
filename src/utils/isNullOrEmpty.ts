export const isNullOrEmpty = (str: string) => {
  if (!str) {
    return true; // no input
  }
  if (typeof str !== 'string') {
    return false;
  }
  if (!str.trim()) {
    return true; // only spaces
  }
  return false;
};
