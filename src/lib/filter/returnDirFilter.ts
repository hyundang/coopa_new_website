const returnDirFilter = (filterType: string | undefined) => {
  if (filterType === "oldest") return 1;
  if (filterType === "latest") return 2;
  return 0;
};

export default returnDirFilter;
