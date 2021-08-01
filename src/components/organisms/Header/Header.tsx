import { SearchIcon } from "@assets/icons/common";
import { InfoIcon, NotiIcon } from "@assets/icons/Header";
import { LogoImg } from "@assets/imgs/common";
import Icon from "@components/atoms/Icon/Icon";
import { useRouter } from "next/dist/client/router";
import styled, { css } from "styled-components";

export interface HeaderProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** click search icon event handler */
  onClickSearch: React.MouseEventHandler<HTMLButtonElement>;
  /** click info icon event handler */
  onClickInfo: React.MouseEventHandler<HTMLButtonElement>;
  /** click noti icon event handler */
  onClickNoti: React.MouseEventHandler<HTMLButtonElement>;
  /** search icon active 여부 */
  isSearchIconAtv: boolean;
  /** info icon active 여부 */
  isInfoIconAtv: boolean;
  /** noti icon active 여부 */
  isNotiIconAtv: boolean;
  /** profile img url */
  imgUrl?: string;
}
const Header = ({
  id,
  className,
  onClickSearch,
  onClickInfo,
  onClickNoti,
  isSearchIconAtv,
  isInfoIconAtv,
  isNotiIconAtv,
  imgUrl,
}: HeaderProps) => {
  const router = useRouter();

  return (
    <HeaderWrap
      id={id}
      className={className}
      isSearchIconAtv={isSearchIconAtv}
      isInfoIconAtv={isInfoIconAtv}
      isNotiIconAtv={isNotiIconAtv}
      isMypageIconAtv={router?.pathname === "mypage"}
    >
      <div className="inner_wrap">
        <Icon
          className="inner_wrap__logo"
          role="link"
          onClick={() => router.push("/")}
        >
          <LogoImg className="logo_img" />
        </Icon>
        <div style={{ flexGrow: 1 }} />
        <Icon
          className="inner_wrap__search"
          role="button"
          onClick={onClickSearch}
        >
          <SearchIcon className="search_icon" />
        </Icon>
        <Icon className="inner_wrap__info" role="button" onClick={onClickInfo}>
          <InfoIcon className="info_icon" />
        </Icon>
        <Icon className="inner_wrap__noti" role="button" onClick={onClickNoti}>
          <NotiIcon className="noti_icon" />
        </Icon>
        <Icon
          className="inner_wrap__mypage"
          role="link"
          onClick={() => router.push("/mypage")}
        >
          <img src={imgUrl} alt="profile_img" className="profile_img" />
        </Icon>
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

  .inner_wrap {
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
