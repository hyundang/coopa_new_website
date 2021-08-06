import { SearchBar, Tab } from "@components/atoms";
import { Header, Homeboard } from "@components/organisms";
import { NewBookmarkProps } from "@components/organisms/BookmarkAddModal";
import { BookmarkDataProps } from "@interfaces/homeboard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

export interface NewtablProps {
  /** 검색 여부 */
  isSearched: boolean;
  /** 검색 여부 setState */
  setIsSearched: Dispatch<SetStateAction<boolean>>;
  /** 프로필 이미지 url */
  imgUrl?: string;
  /** img input 시 img size 에러 여부 setState */
  setIsError?: Dispatch<SetStateAction<boolean>>;
  /** 모달 안의 홈보드 배경 이미지 */
  homeboardModalImg: string;
  /** 모달 안의 홈보드 배경 이미지 setState */
  setHomeboardModalImg: Dispatch<SetStateAction<string>>;
  /** homeboard img setState */
  setHomeboardImg: Dispatch<SetStateAction<string>>;
  /** input img post */
  postHomeboardImg: (e: File) => string;
  /** bookmark data list */
  bookmarkDatas: BookmarkDataProps[];
  /** bookmark 추가 함수 */
  onClickBookmarkSave: (newBookmark: NewBookmarkProps) => void;
  /** bookmark 삭제 함수 */
  onClickBookmarkDel: (bookmarkID: number) => void;
}
const Newtab = ({
  isSearched,
  setIsSearched,
  imgUrl,
  homeboardModalImg,
  setHomeboardModalImg,
  setHomeboardImg,
  setIsError,
  postHomeboardImg,
  bookmarkDatas,
  onClickBookmarkSave,
  onClickBookmarkDel,
}: NewtablProps) => {
  // 검색창 불필요한 fadeout 방지
  const [preventFadeout, setPreventFadeout] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [tabValue, setTabValue] = useState("모든 쿠키");

  useEffect(() => {
    setTimeout(() => !preventFadeout && setPreventFadeout(true), 1000);
  }, [preventFadeout]);

  return (
    <Container className="container">
      <Header
        className="header"
        onClickSearch={() => {
          isSearchVisible && setPreventFadeout(false);
          setIsSearchVisible(!isSearchVisible);
        }}
        isSearchIconAtv={isSearchVisible}
        imgUrl={imgUrl}
      />
      <Homeboard
        className="homeboard"
        visible={isSearchVisible}
        setVisible={setIsSearchVisible}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
        homeboardModalImg={homeboardModalImg}
        setHomeboardModalImg={setHomeboardModalImg}
        setHomeboardImg={setHomeboardImg}
        postHomeboardImg={postHomeboardImg}
        bookmarkDatas={bookmarkDatas}
        onClickBookmarkDel={onClickBookmarkDel}
        onClickBookmarkSave={onClickBookmarkSave}
        preventFadeout={preventFadeout}
        setPreventFadeout={setPreventFadeout}
      />
      {isSearchVisible && (
        <div className="search-wrap">
          <SearchBar
            className="search--tablet"
            visible={isSearchVisible}
            setVisible={setIsSearchVisible}
            isSearched={isSearched}
            setIsSearched={setIsSearched}
            preventFadeout={preventFadeout}
            setPreventFadeout={setPreventFadeout}
          />
        </div>
      )}
      <nav className="tab-wrap">
        <Tab
          className="tab"
          tabStyle={{
            width: "106px",
            height: "56px",
            fontSize: "16px",
          }}
          options={["모든 쿠키", "디렉토리"]}
          value={tabValue}
          setValue={setTabValue}
        />
      </nav>
      <main className="cookie-list">cookie card list</main>
    </Container>
  );
};

export default Newtab;

const Container = styled.div`
  width: 100%;
  padding-top: 60px;

  .tab-wrap {
    width: 100%;
    border-bottom: 1px solid var(--gray_3);
    display: flex;
    justify-content: center;

    .tab {
      width: 1596px;
      ${({ theme }) => theme.media.desktop_2`
        width: 1272px; 
      `}

      ${({ theme }) => theme.media.desktop_3`
        width: 1152px;
      `}

      ${({ theme }) => theme.media.desktop_4`
        width: 858px;
      `}  

      ${({ theme }) => theme.media.tablet`
        width: 564px;
      `}

      ${({ theme }) => theme.media.mobile`
        width: 100%;
        padding: 0 16px;
      `}
    }
  }

  .search-wrap {
    width: 100%;
    padding: 8px 16px;
    display: none;
    ${({ theme }) => theme.media.tablet`
      display: block;
    `}
  }
`;
