import { SearchIcon } from "@assets/icons/common";
import { InfoIcon, NotiIcon } from "@assets/icons/Header";
import { LogoImg } from "@assets/imgs/common";
import { Bubble, Icon } from "@components/atoms";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "src/hooks";
import styled, { css } from "styled-components";
import NotiModal from "../NotiModal";

export interface HeaderProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** click search icon event handler */
  onClickSearch: React.MouseEventHandler<HTMLButtonElement>;
  /** click info icon event handler */
  onClickInfo: React.MouseEventHandler<HTMLButtonElement>;
  /** search icon active 여부 */
  isSearchIconAtv: boolean;
  /** info icon active 여부 */
  isInfoIconAtv: boolean;
  /** profile img url */
  imgUrl?: string;
}
const Header = ({
  id,
  className,
  onClickSearch,
  onClickInfo,
  isSearchIconAtv,
  isInfoIconAtv,
  imgUrl,
}: HeaderProps) => {
  const router = useRouter();
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  // noti modal x좌표
  const [locationX, setLocationX] = useState(0);
  const windowSize = useWindowSize();
  const notiIconLocation = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    notiIconLocation.current &&
      setLocationX(notiIconLocation.current.getBoundingClientRect().x);
  }, [windowSize.width]);

  return (
    <HeaderWrap
      id={id}
      className={className}
      isSearchIconAtv={isSearchIconAtv}
      isInfoIconAtv={isInfoIconAtv}
      isNotiIconAtv={isNotiOpen}
      isMypageIconAtv={router?.pathname === "mypage"}
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
        <Icon className="content__search" role="button" onClick={onClickSearch}>
          <SearchIcon className="search_icon" />
        </Icon>
        {/* <Bubble className="search-bubble">검색</Bubble>
        </div> */}
        <Icon className="content__info" role="button" onClick={onClickInfo}>
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
        <Icon
          className="content__mypage"
          role="link"
          onClick={() => router.push("/mypage")}
        >
          <img src={imgUrl} alt="profile_img" className="profile_img" />
        </Icon>
        <NotiModal
          isOpen={isNotiOpen}
          setIsOpen={setIsNotiOpen}
          locationX={locationX - 335}
        />
      </div>
    </HeaderWrap>
  );
};

export default Header;

interface HeaderWrapProps {
  /** search icon active 여부 */
  isSearchIconAtv: boolean;
  /** info icon active 여부 */
  isInfoIconAtv: boolean;
  /** noti icon active 여부 */
  isNotiIconAtv: boolean;
  /** mypage icon active 여부 */
  isMypageIconAtv: boolean;
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
      border: 5px solid var(--white);

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

      .profile_img {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        object-fit: cover;
      }
    }
  }
`;