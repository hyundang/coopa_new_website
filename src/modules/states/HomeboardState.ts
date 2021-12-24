import { atom } from "recoil";

// 검색 여부
const IsSearchedState = atom<boolean>({
  key: "SEARCH/isSearched",
  default: false,
});

// 검색어
const SearchValueState = atom<string>({
  key: "SEARCH/value",
  default: "",
});

// 검색창 활성화 여부
const IsSearchVisibleState = atom<boolean>({
  key: "SEARCH/isVisible",
  default: false,
});

// 불필요한 검색창 렌더링 방지
const PreventFadeoutState = atom<boolean>({
  key: "SEARCH/fadeout",
  default: true,
});

const HomeboardState = {
  IsSearchedState,
  SearchValueState,
  IsSearchVisibleState,
  PreventFadeoutState,
};

export default HomeboardState;
