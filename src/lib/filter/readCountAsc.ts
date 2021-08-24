import { CookieDataProps } from "../interfaces/cookie";

const readCountAsc = (a: CookieDataProps, b: CookieDataProps) => {
  if (a.readCnt > b.readCnt) {
    return 1;
  }
  if (a.readCnt < b.readCnt) {
    return -1;
  }
  return 0;
};

export default readCountAsc;
