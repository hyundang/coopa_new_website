import { CookieDataProps } from "@interfaces/cookie";
import { DirectoryDataProps } from "../interfaces/directory";

const idCountDesc = (
  a: DirectoryDataProps | CookieDataProps,
  b: DirectoryDataProps | CookieDataProps,
) => {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
};

export default idCountDesc;
