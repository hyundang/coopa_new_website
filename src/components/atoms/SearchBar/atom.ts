import { atom } from "recoil";

const SEARCH = "search";
const SEARCH_VISIBLE = "search/visible";
const SEARCH_INIT = "search/init";

export const SearchState = atom({
  key: SEARCH,
  default: "",
});

export const SearchBarVisibleState = atom({
  key: SEARCH_VISIBLE,
  default: false,
});

export const SearchInitState = atom({
  key: SEARCH_INIT,
  default: false,
});
