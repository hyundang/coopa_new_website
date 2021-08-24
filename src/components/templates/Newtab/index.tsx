// components
import { SearchBar, Tab, ToastMsg } from "@components/atoms";
import { Header } from "@components/organisms";
import { Homeboard, Cookies, Directories } from "@components/templates";
// interfaces
import {
  BookmarkDataProps,
  PostBookmarkDataProps,
} from "@interfaces/homeboard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CookieDataProps } from "@interfaces/cookie";
import { DirectoryDataProps } from "@interfaces/directory";

interface ToastMsgVisibleStateProps {
  dirCreate: boolean;
  dirDel: boolean;
  dirEdit: boolean;
  cookieDel: boolean;
  cookieEdit: boolean;
  bookmarkDel: boolean;
  bookmarkCreate: boolean;
  homeboardEdit: boolean;
  imgSizeOver: boolean;
}

export interface NewtablProps {
  /** 검색 여부 */
  isSearched: boolean;
  setIsSearched: Dispatch<SetStateAction<boolean>>;
  /** 검색어 */
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  /** 프로필 이미지 url */
  imgUrl?: string;
  /** 모달 안의 홈보드 배경 이미지 */
  homeboardModalImg: string;
  setHomeboardModalImg: Dispatch<SetStateAction<string>>;
  /** 홈보드 배경 이미지 */
  homeboardImg: string;
  setHomeboardImg: Dispatch<SetStateAction<string>>;
  /** input img post */
  postHomeboardImg: (e: File) => Promise<string>;
  /** bookmark data list */
  bookmarkDatas: BookmarkDataProps[];
  /** bookmark 추가 함수 */
  onClickBookmarkSave: (newBookmark: PostBookmarkDataProps) => Promise<void>;
  /** bookmark 삭제 함수 */
  onClickBookmarkDel: (bookmarkID: number) => Promise<void>;
  /** all cookie data */
  cookieData: CookieDataProps[];
  /** all directory data */
  dirData: DirectoryDataProps[];
  /** toast msg state */
  isToastMsgVisible: ToastMsgVisibleStateProps;
  setIsToastMsgVisible: Dispatch<SetStateAction<ToastMsgVisibleStateProps>>;
}
const Newtab = ({
  isSearched,
  setIsSearched,
  searchValue,
  setSearchValue,
  imgUrl,
  homeboardModalImg,
  setHomeboardModalImg,
  homeboardImg,
  setHomeboardImg,
  postHomeboardImg,
  bookmarkDatas,
  onClickBookmarkSave,
  onClickBookmarkDel,
  cookieData,
  dirData,
  isToastMsgVisible,
  setIsToastMsgVisible,
}: NewtablProps) => {
  // 검색창 불필요한 fadeout 방지
  const [preventFadeout, setPreventFadeout] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [tabValue, setTabValue] = useState("모든 쿠키");

  // toast msg visible handling
  const handleToastMsgVisible = (
    key:
      | "dirCreate"
      | "dirDel"
      | "dirEdit"
      | "cookieDel"
      | "cookieEdit"
      | "bookmarkDel"
      | "bookmarkCreate"
      | "homeboardEdit"
      | "imgSizeOver",
    value: boolean,
  ) =>
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      [key]: value,
    });

  // 검색 아이콘 클릭 시
  const handleClickSearchIcon = () => {
    isSearchVisible && setPreventFadeout(false);
    setIsSearchVisible(!isSearchVisible);
    setSearchValue("");
    setIsSearched(false);
  };

  // enter 키 클릭 시
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && setIsSearched(true);
  };
  // esc 키 클릭 시
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setPreventFadeout(false);
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    setTimeout(() => !preventFadeout && setPreventFadeout(true), 1000);
  }, [preventFadeout]);

  return (
    <>
      <Header
        className="header"
        onClickSearch={handleClickSearchIcon}
        isSearchIconAtv={isSearchVisible}
        imgUrl={imgUrl}
      />
      <Container className="container" isSearched={isSearched}>
        <Homeboard
          className="homeboard"
          visible={isSearchVisible}
          setVisible={setIsSearchVisible}
          isSearched={isSearched}
          setIsSearched={setIsSearched}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearchBarKeyDown={handleKeyDown}
          onSearchBarKeyPress={handleKeyPress}
          homeboardModalImg={homeboardModalImg}
          setHomeboardModalImg={setHomeboardModalImg}
          homeboardImg={homeboardImg}
          setHomeboardImg={setHomeboardImg}
          postHomeboardImg={postHomeboardImg}
          setIsSuccess={(e) => handleToastMsgVisible("homeboardEdit", e)}
          setIsError={(e) => handleToastMsgVisible("imgSizeOver", e)}
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
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              preventFadeout={preventFadeout}
              setPreventFadeout={setPreventFadeout}
              onKeyDown={handleKeyDown}
              onKeyPress={handleKeyPress}
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
        <main className="card-list">
          {tabValue === "모든 쿠키" ? (
            <Cookies data={cookieData} />
          ) : (
            <Directories data={dirData} />
          )}
        </main>
      </Container>
      <ToastMsg
        isVisible={isToastMsgVisible.dirCreate}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirCreate", e)}
      >
        🤘 디렉토리를 만들었어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.dirEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirEdit", e)}
      >
        👀 디렉토리를 수정했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.dirDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirDel", e)}
      >
        ❌ 디렉토리를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("cookieDel", e)}
      >
        ❌ 쿠키를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("cookieEdit", e)}
      >
        🍪 쿠키를 수정했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.bookmarkDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("bookmarkDel", e)}
      >
        ❌ 즐겨찾기를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.bookmarkCreate}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("bookmarkCreate", e)
        }
      >
        🤘 즐겨찾기를 만들었어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.homeboardEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("homeboardEdit", e)}
      >
        🤘 홈보드 이미지를 변경했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.imgSizeOver}
        setIsVisible={(e: boolean) => handleToastMsgVisible("imgSizeOver", e)}
        imgSizeOver
      >
        😥 더 작은 이미지를 올려주세요!
      </ToastMsg>
    </>
  );
};

export default Newtab;

interface ContainerProps {
  isSearched: boolean;
}
const Container = styled.div<ContainerProps>`
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
    ${({ theme, isSearched }) => theme.media.tablet`
      display: block;
      ${
        isSearched &&
        css`
          ${theme.media.mobile`
            margin-top: 12px;
          `}
          padding: 8px 16px;
          margin-top: 24px;
          margin-bottom: 8px;
        `
      }
    `}
  }
`;
