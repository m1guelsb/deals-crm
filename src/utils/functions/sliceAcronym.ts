export const sliceAcronym = (str: string | undefined) => {
  if (!str) return "";
  const acronym = str
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "");

  return acronym;
};
