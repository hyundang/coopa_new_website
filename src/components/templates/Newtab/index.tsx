// components
import { Floating, SearchBar, Tab, ToastMsg } from "@components/atoms";
import { Footer, Header, ListHeader } from "@components/organisms";
import { Homeboard, Cookies, Directories } from "@components/templates";
// interfaces
import { CookieDataProps } from "@interfaces/cookie";
// libs
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
// modules
import { HomeboardState, ToastMsgState } from "@modules/states";
import HomebrdModule from "@modules/HomebrdModule";
import CookieModule from "@modules/CookieModule";
import DirModule from "@modules/DirModule";
import ToastMsgs from "../ToastMsgs";

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
  const isSearchVisible = useRecoilValue(
    HomeboardState.IsSearchBarVisibleState,
  );

  // tab
  const [tabOptions, setTabOptions] = useState(["모든 쿠키", "디렉토리"]);
  const [tabValue, setTabValue] = useState("모든 쿠키");

  // 쿠키or디렉토리 생성 모달 오픈
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 온보딩 모달 오픈
  const [isOnboardOpen, setIsOnboardOpen] = useState(false);

  // tost msg
  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);

  // toast msg visible handling
  const handleToastMsgVisible = (
    key: "homeboardEdit" | "imgSizeOver",
    value: boolean,
  ) =>
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      [key]: value,
    });

  // 키 떼어냈을 때
  const handleKeyUp = (e: any) => {
    // ctrl + shift + z = 모든 쿠키 탭
    if (e.key === "Z" && e.shiftKey && e.ctrlKey) {
      isSearched && isSearchVisible
        ? setTabValue("쿠키")
        : setTabValue("모든 쿠키");
    }
    // ctrl + shift + x = 디렉토리 탭
    if (e.key === "X" && e.shiftKey && e.ctrlKey) {
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
          setIsUpdatingHomboardImgSuccess={(e) =>
            handleToastMsgVisible("homeboardEdit", e)
          }
          setIsUpdatingHomboardImgError={(e) =>
            handleToastMsgVisible("imgSizeOver", e)
          }
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
              (cookieModule.pinnedCookieData?.length !== 0 ||
                unpinnedCookieList.length !== 0)) ||
            (tabValue === "디렉토리" &&
              (dirModule.unpinnedDirData.length !== 0 ||
                dirModule.pinnedDirData.length !== 0))) && (
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
              onClickFilterType={
                tabValue === "모든 쿠키"
                  ? cookieModule.updateAndSaveCookieFilter
                  : dirModule.updateAndSaveDirFilter
              }
              isCreateCookieModalOpen={isCreateModalOpen}
              setIsCreateCookieModalOpen={setIsCreateModalOpen}
              createDir={dirModule.createDir}
              createCookie={(url) =>
                cookieModule.createCookie(url, false, undefined)
              }
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
                  unpinnedDir={dirModule.unpinnedDirData}
                  pinnedDir={dirModule.pinnedDirData}
                  createDir={dirModule.createDir}
                  refreshDir={dirModule.refreshDir}
                />
              ) : (
                <Directories
                  isLoading={false}
                  pinnedData={[]}
                  unpinnedData={dirModule.searchedDirData || []}
                  isSearched
                  dirModule={dirModule}
                  refreshCookie={cookieModule.refreshCookie}
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
                  unpinnedDir={dirModule.unpinnedDirData}
                  pinnedDir={dirModule.pinnedDirData}
                  setIsOnboardOpen={setIsOnboardOpen}
                  createDir={dirModule.createDir}
                  refreshDir={dirModule.refreshDir}
                />
              ) : (
                <Directories
                  isLoading={dirModule.isLoading}
                  pinnedData={dirModule.pinnedDirData}
                  unpinnedData={dirModule.unpinnedDirData}
                  isDirAddOpen={isCreateModalOpen}
                  setIsDirAddOpen={setIsCreateModalOpen}
                  dirModule={dirModule}
                  refreshCookie={cookieModule.refreshCookie}
                />
              )}
            </>
          )}
        </main>
      </Container>
      <Footer />
      <ToastMsgs />
      <Floating />
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
