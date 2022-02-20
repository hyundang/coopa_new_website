// assets
import { SettingIcon } from "@assets/icons/homeboard";
import { DuribunLImg, DuribunRImg, SearchImg } from "@assets/imgs/homeboard";
// components
import { Icon, SearchBar } from "@components/atoms";
import { HomeboardEditModal, Bookmark } from "@components/organisms";
import { homeboardAnimation } from "@components/animations";
// interfaces
import { BookmarkDataProps } from "@interfaces/homeboard";
// libs
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useWindowSize } from "src/hooks";
import { useRecoilValue } from "recoil";
// modules
import { HomeboardState } from "@modules/states";
import HomebrdModule from "@modules/HomebrdModule";

export interface HomeboardProps {
  id?: string;
  className?: string;
  /** onKeyPress event handler */
  onSearchBarKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  homeboardModule?: ReturnType<typeof HomebrdModule>;
  setIsUpdatingHomboardImgSuccess?: (e: boolean) => void;
  setIsUpdatingHomboardImgError?: (e: boolean) => void;
  homeboardImgInLocalStorage?: string;
  bookmarkData?: BookmarkDataProps[];
}
const Homeboard = ({
  id,
  className,
  onSearchBarKeyPress,
  homeboardModule,
  setIsUpdatingHomboardImgSuccess,
  setIsUpdatingHomboardImgError,
  bookmarkData = [],
  homeboardImgInLocalStorage = "",
}: HomeboardProps) => {
  // 검색 여부
  const isSearched = useRecoilValue(HomeboardState.IsSearchedState);
  // 검색창 활성화 여부
  const isSearchBarVisible = useRecoilValue(
    HomeboardState.IsSearchBarVisibleState,
  );

  const homeboardImg = useRecoilValue(HomeboardState.HomeboardImgState);
  const homeboardModalImg = useRecoilValue(
    HomeboardState.HomeboardModalImgState,
  );

  // homeboard edit modal open 여부
  const [isOpen, setIsOpen] = useState(false);
  // homeboard edit modal x좌표
  const [locationX, setLocationX] = useState(0);
  const windowSize = useWindowSize();
  const settingIconLocation = useRef<HTMLButtonElement>(null);

  // 키 떼어냈을 때
  // shift + e = 홈보드 수정 모달 열기
  const handleKeyUp = (e: any) => {
    if (e.key === "E" && e.shiftKey) {
      setIsOpen(true);
    }
  };

  // 홈보드 수정 모달 x좌표 찾기
  useEffect(() => {
    settingIconLocation.current &&
      setLocationX(settingIconLocation.current.getBoundingClientRect().x);
  }, [windowSize.width]);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <HomeboardWrap
      id={id}
      className={className}
      homeboardImg={homeboardImg || homeboardImgInLocalStorage}
      isSettingIconAtv={isOpen}
      visible={isSearchBarVisible}
      isSearched={isSearched && isSearchBarVisible}
    >
      <div className="inner-wrap">
        {!isSearchBarVisible && (
          <DuribunLImg role="img" className="duribun-left" />
        )}
        {!isSearchBarVisible && (
          <DuribunRImg role="img" className="duribun-right" />
        )}
        {isSearchBarVisible && (
          <SearchImg role="img" className="duribun-search" />
        )}
        {!isSearchBarVisible && homeboardModule && (
          <Icon
            className="setting"
            ref={settingIconLocation}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <SettingIcon className="setting__icon" />
          </Icon>
        )}
        {homeboardModule && (
          <SearchBar className="search" onKeyPress={onSearchBarKeyPress} />
        )}
        {!isSearchBarVisible && (
          <Bookmark
            className="bookmark"
            bookmarkData={homeboardModule?.bookmarkData || bookmarkData}
            onClickCreateBtn={homeboardModule?.createBookmark}
            onClickDelBtn={homeboardModule?.deleteBookmark}
          />
        )}
      </div>
      {homeboardModalImg !== undefined &&
        homeboardModule &&
        setIsUpdatingHomboardImgError &&
        setIsUpdatingHomboardImgSuccess && (
          <HomeboardEditModal
            locationX={locationX - 518 + 36}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsUpdatingSuccess={setIsUpdatingHomboardImgSuccess}
            setIsUpdatingError={setIsUpdatingHomboardImgError}
            updateHomeboardImg={homeboardModule.updateHomeboardImg}
          />
        )}
    </HomeboardWrap>
  );
};

export default Homeboard;

interface HomeboardWrapProps {
  /** homeboard img state */
  homeboardImg: string;
  isSettingIconAtv: boolean;
  visible?: boolean;
  isSearched?: boolean;
}
const HomeboardWrap = styled.section<HomeboardWrapProps>`
  width: 100%;
  height: 210px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url("${({ homeboardImg }) => homeboardImg}") center center/ cover,
    url("/theme_img/img_6.jpg") center center/ cover;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.tablet`
    display: none;
  `}

  ${({ visible }) =>
    visible
      ? css`
          .duribun-search {
            animation: ${homeboardAnimation.fadeInRule};
          }
        `
      : css`
          .duribun-left {
            animation: ${homeboardAnimation.fadeInRule};
          }
          .duribun-right {
            animation: ${homeboardAnimation.fadeInRule};
          }
          .setting {
            animation: ${homeboardAnimation.fadeInRule};
          }
          .bookmark {
            animation: ${homeboardAnimation.fadeInRule};
          }
        `};
  ${({ isSearched }) =>
    isSearched &&
    css`
      height: 87px;
      background: none;
    `}

  .inner-wrap {
    position: relative;
    width: 1596px;
    height: 100%;

    .duribun-left {
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: 284px;
      height: 168px;
    }
    .duribun-right {
      position: absolute;
      z-index: 1;
      right: 0;
      bottom: -2px;
      width: 320px;
      height: 143px;
    }
    .duribun-search {
      position: absolute;
      z-index: 3;
      bottom: 0;
      left: 198px;
      width: 200px;
      height: 168px;
      ${({ isSearched }) =>
        isSearched &&
        css`
          display: none;
        `};
    }

    .setting {
      position: absolute;
      z-index: 2;
      top: 18px;
      right: 0;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background: rgba(243, 243, 243, 0.5);
      transition: unset;

      ${({ isSettingIconAtv }) =>
        isSettingIconAtv
          ? css`
              top: 17px;
              right: -1px;
              width: 42px;
              height: 42px;
              border-radius: 21px;
              background: rgba(85, 83, 82, 0.55);
              border: 1px solid rgba(255, 255, 255, 0.3);
            `
          : css`
              @media (hover: hover) {
                &:hover {
                  top: 17px;
                  right: -1px;
                  width: 42px;
                  height: 42px;
                  border-radius: 21px;
                  background: rgba(85, 83, 82, 0.35);
                  border: 1px solid rgba(255, 255, 255, 0.3);
                }
              }
            `}
    }

    .search {
      position: absolute;
      z-index: 2;
      top: 67px;
      left: 50%;
      margin-left: 35px;
      transform: translateX(-50%);
      ${({ isSearched }) =>
        isSearched &&
        css`
          top: 18px;
          margin-left: 0;
        `};
    }

    .bookmark {
      position: absolute;
      z-index: 3;
      left: 50%;
      top: 63px;
      transform: translateX(-50%);
    }

    ${({ theme }) => theme.media.desktop_2`
      width: 1272px;
      .duribun-search {
        width: 180px;
        height: 152px;
        left: 55px;
      }
    `};
    ${({ theme }) => theme.media.desktop_3`
      width: 1152px;
      .duribun-left {
        width: 300px;
        height: 178px;
      }
      .duribun-right {
        width: 295px;
        height: 131px;
      }
      .duribun-search {
        width: 168px;
        height: 142px;
        left: 3px;
      }
    `};
    ${({ theme }) => theme.media.desktop_4`
        width: 858px;
        .duribun-search {
            display: none;
        }
    `};
  }
`;
