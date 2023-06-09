// assets
import { SearchIcon } from "@assets/icons/common";
import { InfoIcon, NotiIcon, NotiIconAtv } from "@assets/icons/Header";
import { LogoImg } from "@assets/imgs/common";
// components
import { Icon } from "@components/atoms";
import { NotiModal, Onboarding } from "@components/organisms";
// libs
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "src/hooks";
import styled, { css } from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import CheckNotiUpdate from "@lib/CheckNotiUpdate";
import SaveDataInWebCookie from "@lib/SaveDataInWebCookie";
// modules
import { HomeboardState } from "@modules/states";

export interface HeaderProps {
  id?: string;
  className?: string;
  isOnboardOpen: boolean;
  setIsOnboardOpen: Dispatch<SetStateAction<boolean>>;
  /** profile img url */
  imgUrl?: string;
  isMypageIconExist?: boolean;
  isSearchIconExist?: boolean;
  isMypage?: boolean;
}
const Header = ({
  id,
  className,
  isOnboardOpen,
  setIsOnboardOpen,
  imgUrl,
  isMypageIconExist = true,
  isSearchIconExist = true,
  isMypage = false,
}: HeaderProps) => {
  const router = useRouter();
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isNotiUpdated, setIsNotiUpdated] = useState(false);

  // 검색창 관련
  const setPreventFadeout = useSetRecoilState(
    HomeboardState.PreventFadeoutState,
  );
  const [isSearchVisible, setIsSearchVisible] = useRecoilState(
    HomeboardState.IsSearchBarVisibleState,
  );
  const setIsSearched = useSetRecoilState(HomeboardState.IsSearchedState);
  const setSearchValue = useSetRecoilState(HomeboardState.SearchValueState);

  // noti modal x좌표
  const [locationX, setLocationX] = useState(0);
  const windowSize = useWindowSize();
  const notiIconLocation = useRef<HTMLButtonElement>(null);

  const handleClickLogo = () => {
    window.open(DOMAIN, "_self");
  };

  const handleClickSearchIcon = () => {
    isSearchVisible && setPreventFadeout(false);
    setIsSearchVisible(!isSearchVisible);
    setSearchValue("");
    setIsSearched(false);
  };

  const handleClickNotiIcon = () => {
    setIsNotiOpen(true);
    setIsNotiUpdated(false);
    SaveDataInWebCookie("isNotiUpdated", false);
  };

  useEffect(() => {
    notiIconLocation.current &&
      setLocationX(notiIconLocation.current.getBoundingClientRect().x);
  }, [windowSize.width]);

  useEffect(() => {
    setIsNotiUpdated(CheckNotiUpdate());
  }, []);

  return (
    <HeaderWrap
      id={id}
      className={className}
      isSearchIconAtv={isSearchVisible}
      isInfoIconAtv={isOnboardOpen}
      isNotiIconAtv={isNotiOpen}
      isMypageIconAtv={isMypage}
      imgUrl={imgUrl}
    >
      <div className="content">
        <Icon className="content__logo" role="link" onClick={handleClickLogo}>
          <LogoImg className="logo_img" />
        </Icon>
        <div style={{ flexGrow: 1 }} />
        {isSearchIconExist && (
          <Icon
            className="content__search"
            role="button"
            onClick={handleClickSearchIcon}
          >
            <SearchIcon className="search_icon" />
          </Icon>
        )}
        <Icon
          className="content__info"
          role="button"
          onClick={() => setIsOnboardOpen(true)}
        >
          <InfoIcon className="info_icon" />
        </Icon>
        <Icon
          className="content__noti"
          role="button"
          ref={notiIconLocation}
          onClick={handleClickNotiIcon}
        >
          {isNotiUpdated ? (
            <NotiIconAtv className="noti_icon" />
          ) : (
            <NotiIcon className="noti_icon" />
          )}
        </Icon>
        {isMypageIconExist && (
          <Icon
            className="content__mypage"
            role="link"
            onClick={isMypage ? undefined : () => router.push("/mypage")}
          >
            <div className="profile_img" />
          </Icon>
        )}
        <NotiModal
          isOpen={isNotiOpen}
          setIsOpen={setIsNotiOpen}
          locationX={locationX - 371}
        />
        <Onboarding isOpen={isOnboardOpen} setIsOpen={setIsOnboardOpen} />
      </div>
    </HeaderWrap>
  );
};

export default Header;

interface HeaderWrapProps {
  isSearchIconAtv?: boolean;
  isInfoIconAtv: boolean;
  isNotiIconAtv: boolean;
  isMypageIconAtv: boolean;
  imgUrl?: string;
}
const HeaderWrap = styled.header<HeaderWrapProps>`
  all: unset;

  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;

  width: 100%;
  height: 60px;
  background-color: var(--white);

  display: flex;
  flex-direction: row;
  justify-content: center;

  .content {
    width: 1596px;
    display: flex;
    flex-direction: row;
    align-items: center;

    /* responsive */
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
        &__logo {
            width: 156px;
        }
        &__info {
            display: none;
        }
        &__noti {
            display: none;
        }
    `}
    ${({ theme }) => theme.media.mobile`
        width: 100%;
        padding: 0 20px;
    `}

    &__logo {
      position: relative;
      left: -22px;
      width: 200px;
      height: 44px;
      border-radius: 22px;
      @media (hover: hover) {
        &:hover {
          background-color: var(--gray_hover_1);
        }
      }
      .logo_img {
        width: 156px;
      }
    }

    &__search {
      width: 40px;
      height: 40px;
      margin-right: 3px;
      border-radius: 20px;
      ${(props) =>
        props.isSearchIconAtv
          ? css`
              background-color: var(--gray_active);
              .search_icon {
                path {
                  fill: var(--white);
                }
              }
            `
          : css`
              @media (hover: hover) {
                &:hover {
                  background-color: var(--gray_hover_1);
                  .search_icon {
                    path {
                      fill: var(--black_1);
                    }
                  }
                }
              }
            `}
    }

    &__info {
      width: 40px;
      height: 40px;
      margin-right: 3px;
      border-radius: 20px;
      ${(props) =>
        props.isInfoIconAtv
          ? css`
              background-color: var(--gray_active);
              .info_icon {
                path {
                  fill: var(--white);
                }
              }
            `
          : css`
              @media (hover: hover) {
                &:hover {
                  background-color: var(--gray_hover_1);
                  .info_icon {
                    path {
                      fill: var(--black_1);
                    }
                  }
                }
              }
            `}
    }

    &__noti {
      width: 40px;
      height: 40px;
      margin-right: 3px;
      border-radius: 20px;
      ${(props) =>
        props.isNotiIconAtv
          ? css`
              background-color: var(--gray_active);
              .noti_icon {
                path {
                  fill: var(--white);
                }
              }
            `
          : css`
              @media (hover: hover) {
                &:hover {
                  background-color: var(--gray_hover_1);
                  .noti_icon {
                    path {
                      fill: var(--black_1);
                    }
                  }
                }
              }
            `}
    }

    &__mypage {
      width: 40px;
      height: 40px;
      border-radius: 20px;

      .profile_img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        border: 5px solid var(--white);
        background: url("${(props) => props.imgUrl}") center center / cover;

        ${(props) =>
          props.isMypageIconAtv
            ? css`
                border: 5px solid var(--gray_active);
              `
            : css`
                @media (hover: hover) {
                  &:hover {
                    border: 5px solid var(--gray_hover_1);
                  }
                }
              `};
      }
    }
  }
`;
