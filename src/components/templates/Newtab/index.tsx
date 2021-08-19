// components
import { SearchBar, Tab, ToastMsg } from "@components/atoms";
import { Header } from "@components/organisms";
import { Homeboard, Cookies, Directories } from "@components/templates";
// interfaces
import { BookmarkDataProps } from "@interfaces/homeboard";
import { NewBookmarkProps } from "@components/organisms/BookmarkAddModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { CookieDataProps } from "@interfaces/cookie";
import { DirectoryDataProps } from "@interfaces/directory";

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
  /** cookie data */
  cookieData: CookieDataProps[];
  /** directory data */
  dirData: DirectoryDataProps[];
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
  cookieData,
  dirData,
}: NewtablProps) => {
  // 검색창 불필요한 fadeout 방지
  const [preventFadeout, setPreventFadeout] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [tabValue, setTabValue] = useState("모든 쿠키");

  // toast msg visible state
  const [isVisible, setIsVisible] = useState({
    dirCreate: false,
    dirDel: false,
    dirEdit: false,
    cookieDel: false,
    cookieEdit: false,
    bookmarkDel: false,
    bookmarkCreate: false,
    homeboardEdit: false,
    imgSizeOver: false,
  });

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
    setIsVisible({
      ...isVisible,
      [key]: value,
    });

  useEffect(() => {
    setTimeout(() => !preventFadeout && setPreventFadeout(true), 1000);
  }, [preventFadeout]);

  return (
    <>
      <Header
        className="header"
        onClickSearch={() => {
          isSearchVisible && setPreventFadeout(false);
          setIsSearchVisible(!isSearchVisible);
        }}
        isSearchIconAtv={isSearchVisible}
        imgUrl={imgUrl}
      />
      <Container className="container">
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
        <main className="card-list">
          {tabValue === "모든 쿠키" ? (
            <Cookies data={cookieData} />
          ) : (
            <Directories data={dirData} />
          )}
        </main>
      </Container>
      <ToastMsg
        isVisible={isVisible.dirCreate}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirCreate", e)}
      >
        🤘 디렉토리를 만들었어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isVisible.dirEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirEdit", e)}
      >
        👀 디렉토리를 수정했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isVisible.dirDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirDel", e)}
      >
        ❌ 디렉토리를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isVisible.cookieDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("cookieDel", e)}
      >
        ❌ 쿠키를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isVisible.cookieEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("cookieEdit", e)}
      >
        🍪 쿠키를 수정했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isVisible.bookmarkDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("bookmarkDel", e)}
      >
        ❌ 즐겨찾기를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isVisible.bookmarkCreate}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("bookmarkCreate", e)
        }
      >
        🤘 즐겨찾기를 만들었어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isVisible.homeboardEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("homeboardEdit", e)}
      >
        🤘 홈보드 이미지를 변경했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isVisible.imgSizeOver}
        setIsVisible={(e: boolean) => handleToastMsgVisible("imgSizeOver", e)}
        imgSizeOver
      >
        😥 더 작은 이미지를 올려주세요!
      </ToastMsg>
    </>
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
