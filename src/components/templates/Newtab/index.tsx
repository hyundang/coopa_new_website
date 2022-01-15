// components
import { SearchBar, Tab, ToastMsg } from "@components/atoms";
import { Footer, Header, ListHeader } from "@components/organisms";
import { Homeboard, Cookies, Directories } from "@components/templates";
// libs
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { HomeboardState, ToastMsgState } from "@modules/states";
import HomebrdModule from "@modules/HomebrdModule";
import CookieModule from "@modules/CookieModule";
import DirModule from "@modules/DirModule";
import { CookieDataProps } from "@interfaces/cookie";

export interface NewtablProps {
  /** 프로필 이미지 url */
  imgUrl?: string;
  /** 프로필 닉네임 */
  nickname: string;
  /** 검색창 enter key 클릭 */
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  /** homeboard module */
  homeboardModule: ReturnType<typeof HomebrdModule>;
  /** 쿠키 모듈 */
  cookieModule: ReturnType<typeof CookieModule>;
  unpinnedCookieList: CookieDataProps[];
  /** 디렉토리 모듈 */
  dirModule: ReturnType<typeof DirModule>;
}
const Newtab = ({
  imgUrl,
  nickname,
  onKeyPress,
  homeboardModule,
  cookieModule,
  unpinnedCookieList,
  dirModule,
}: NewtablProps) => {
  // 검색 여부
  const isSearched = useRecoilValue(HomeboardState.IsSearchedState);
  // 검색창 활성화 여부
  const isSearchVisible = useRecoilValue(HomeboardState.IsSearchVisibleState);

  // tab
  const [tabOptions, setTabOptions] = useState(["모든 쿠키", "디렉토리"]);
  const [tabValue, setTabValue] = useState("모든 쿠키");

  // 쿠키or디렉토리 생성 모달 오픈
  const [isAddOpen, setIsAddOpen] = useState(false);

  // 온보딩 모달 오픈
  const [isOnboardOpen, setIsOnboardOpen] = useState(false);

  // tost msg
  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);

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
      | "imgSizeOver"
      | "copyLink"
      | "copyShareLink",
    value: boolean,
  ) =>
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      [key]: value,
    });

  // 키 떼어냈을 때
  const handleKeyUp = (e: any) => {
    // shift + c = 모든 쿠키 탭
    if (e.key === "C" && e.shiftKey) {
      isSearched && isSearchVisible
        ? setTabValue("쿠키")
        : setTabValue("모든 쿠키");
    }
    // shift + d = 디렉토리 탭
    if (e.key === "D" && e.shiftKey) {
      setTabValue("디렉토리");
    }
  };

  // 검색 여부에 따른 tab option 변경
  useEffect(() => {
    isSearched && isSearchVisible
      ? (() => {
          setTabOptions(["쿠키", "디렉토리"]);
          tabValue === "모든 쿠키" && setTabValue("쿠키");
        })()
      : (() => {
          setTabOptions(["모든 쿠키", "디렉토리"]);
          tabValue === "쿠키" && setTabValue("모든 쿠키");
        })();
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isSearched, isSearchVisible]);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <Header
        className="header"
        imgUrl={imgUrl}
        isOnboardOpen={isOnboardOpen}
        setIsOnboardOpen={setIsOnboardOpen}
      />
      <Container className="container" isSearched={isSearched}>
        <Homeboard
          className="homeboard"
          onSearchBarKeyPress={onKeyPress}
          homeboardModule={homeboardModule}
          setIsSuccess={(e) => handleToastMsgVisible("homeboardEdit", e)}
          setIsError={(e) => handleToastMsgVisible("imgSizeOver", e)}
        />
        {isSearchVisible && (
          <div className="search-wrap">
            <SearchBar className="search--tablet" onKeyPress={onKeyPress} />
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
            options={tabOptions}
            value={tabValue}
            setValue={setTabValue}
          />
        </nav>
        <main className="card-list">
          {((isSearched &&
            isSearchVisible &&
            (tabValue === "쿠키" || tabValue === "디렉토리")) ||
            (tabValue === "모든 쿠키" &&
              cookieModule.pinnedCookieData?.length !== 0 &&
              unpinnedCookieList.length !== 0) ||
            (tabValue === "디렉토리" &&
              dirModule.allDirData?.common?.length !== 0 &&
              dirModule.allDirData?.pinned?.length !== 0)) && (
            <ListHeader
              isSearched={isSearched && isSearchVisible}
              cookieNum={cookieModule.searchedCookieData?.length || 0}
              dirNum={dirModule.searchedDirData?.length || 0}
              type={
                tabValue === "모든 쿠키" || tabValue === "쿠키"
                  ? "cookie"
                  : "dir"
              }
              imgUrl={imgUrl}
              nickname={nickname}
              filterType={
                tabValue === "모든 쿠키"
                  ? cookieModule.cookieFilter
                  : dirModule.dirFilter
              }
              onClickType={
                tabValue === "모든 쿠키"
                  ? cookieModule.changeAndSaveCookieFilter
                  : dirModule.handleDirFilter
              }
              isAddOpen={isAddOpen}
              setIsAddOpen={setIsAddOpen}
              postDir={dirModule.handlePostDir}
            />
          )}
          {isSearched && isSearchVisible ? (
            // 검색된 쿠키 & 디렉토리
            <>
              {tabValue === "쿠키" ? (
                <Cookies
                  type="searched"
                  pinnedCookieList={[]}
                  unpinnedCookieList={cookieModule.searchedCookieData || []}
                  isLoading={false}
                  cookieModule={cookieModule}
                  allDir={dirModule.allDirData?.common || []}
                  fixedDir={dirModule.allDirData?.pinned || []}
                  postDir={dirModule.handlePostDir}
                />
              ) : (
                <Directories
                  data={dirModule.searchedDirData || []}
                  isSearched
                  handleDelDirectory={dirModule.handleDelDir}
                  handleUpdateDirectory={dirModule.handleEditDir}
                  fixDirHandler={dirModule.handleFixDir}
                />
              )}
            </>
          ) : (
            // 뉴탭 쿠키 & 디렉토리
            <>
              {tabValue === "모든 쿠키" ? (
                <Cookies
                  isLoading={cookieModule.isLoading}
                  pinnedCookieList={cookieModule.pinnedCookieData || []}
                  unpinnedCookieList={unpinnedCookieList}
                  cookieModule={cookieModule}
                  allDir={dirModule.allDirData?.common || []}
                  fixedDir={dirModule.allDirData?.pinned || []}
                  setIsOnboardOpen={setIsOnboardOpen}
                  postDir={dirModule.handlePostDir}
                />
              ) : (
                <Directories
                  pinnedData={dirModule.allDirData?.pinned}
                  data={dirModule.allDirData?.common || []}
                  setIsDirAddOpen={setIsAddOpen}
                  handleDelDirectory={dirModule.handleDelDir}
                  handleUpdateDirectory={dirModule.handleEditDir}
                  fixDirHandler={dirModule.handleFixDir}
                />
              )}
            </>
          )}
        </main>
      </Container>
      <Footer />
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
        isVisible={isToastMsgVisible.copyLink}
        setIsVisible={(e: boolean) => handleToastMsgVisible("copyLink", e)}
      >
        👏🏻 링크를 복사했어요!
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
  padding-bottom: 130px;

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
