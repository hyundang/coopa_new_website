const returnCookieFilter = (filterType: string | undefined) => {
  if (filterType === "latest") return 1;
  if (filterType === "oldest") return 2;
  if (filterType === "readMost") return 3;
  if (filterType === "readLeast") return 4;
  return 0;
};

export default returnCookieFilter;
