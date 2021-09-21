import { SearchIcon } from "@assets/icons/common";
import { InfoIcon, NotiIcon } from "@assets/icons/Header";
import { LogoImg } from "@assets/imgs/common";
import { Bubble, Icon } from "@components/atoms";
import { useRouter } from "next/dist/client/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useWindowSize } from "src/hooks";
import styled, { css } from "styled-components";
import NotiModal from "../NotiModal";
import Onboarding from "../Onboarding";

export interface HeaderProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** click search icon event handler */
  onClickSearch?: React.MouseEventHandler<HTMLButtonElement>;
  /** search icon active 여부 */
  isSearchIconAtv?: boolean;
  /** profile img url */
  imgUrl?: string;
  /** mypage 여부 */
  isMypage?: boolean;
  /** error page 여부 */
  isErrorpage?: boolean;
  /** onboarding open 여부 */
  isOnboardOpen: boolean;
  setIsOnboardOpen: Dispatch<SetStateAction<boolean>>;
}
const Header = ({
  id,
  className,
  onClickSearch,
  isSearchIconAtv,
  imgUrl,
  isMypage = false,
  isErrorpage = false,
  isOnboardOpen,
  setIsOnboardOpen,
}: HeaderProps) => {
  const router = useRouter();
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  // noti modal x좌표
  const [locationX, setLocationX] = useState(0);
  const windowSize = useWindowSize();
  const notiIconLocation = useRef<HTMLButtonElement>(null);

  // 키 떼어냈을 때
  const handleKeyUp = (e: any) => {
    // shift + i = 온보딩 모달
    if (e.key === "I" && e.shiftKey) {
      setIsOnboardOpen(true);
    }
    // shift + n = 공지 모달
    if (e.key === "N" && e.shiftKey) {
      setIsNotiOpen(true);
    }
  };

  useEffect(() => {
    notiIconLocation.current &&
      setLocationX(notiIconLocation.current.getBoundingClientRect().x);
  }, [windowSize.width]);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <HeaderWrap
      id={id}
      className={className}
      isSearchIconAtv={isSearchIconAtv}
      isInfoIconAtv={isOnboardOpen}
      isNotiIconAtv={isNotiOpen}
      isMypageIconAtv={isMypage}
      imgUrl={imgUrl}
    >
      <div className="content">
        <Icon
          className="content__logo"
          role="link"
          onClick={() => router.push("/")}
        >
          <LogoImg className="logo_img" />
        </Icon>
        <div style={{ flexGrow: 1 }} />
        {/* <div> */}
        {!isMypage && !isErrorpage && (
          <Icon
            className="content__search"
            role="button"
            onClick={onClickSearch}
          >
            <SearchIcon className="search_icon" />
          </Icon>
        )}
        {/* <Bubble className="search-bubble">검색</Bubble>
        </div> */}
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
          onClick={() => setIsNotiOpen(true)}
        >
          <NotiIcon className="noti_icon" />
        </Icon>
        {!isErrorpage && (
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
          locationX={locationX - 335}
        />
        <Onboarding isOpen={isOnboardOpen} setIsOpen={setIsOnboardOpen} />
      </div>
    </HeaderWrap>
  );
};

export default Header;

interface HeaderWrapProps {
  /** search icon active 여부 */
  isSearchIconAtv?: boolean;
  /** info icon active 여부 */
  isInfoIconAtv: boolean;
  /** noti icon active 여부 */
  isNotiIconAtv: boolean;
  /** mypage icon active 여부 */
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
    width: 159.6rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    /* responsive */
    ${({ theme }) => theme.media.desktop_2`
        width: 127.2rem; 
    `}
    ${({ theme }) => theme.media.desktop_3`
        width: 115.2rem;
    `}
    ${({ theme }) => theme.media.desktop_4`
        width: 85.8rem;
    `}  
    ${({ theme }) => theme.media.tablet`
        width: 56.4rem;
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
    /* .search-bubble {
      position: absolute;
      top: 50px;
      &::after {
        top: 0;
        border: 6px solid transparent;
        border-top: 0;
        border-bottom-color: var(--white);
        border-width: 6px;
        margin-top: -6px;
        margin-left: -6px;
      }
    } */

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
