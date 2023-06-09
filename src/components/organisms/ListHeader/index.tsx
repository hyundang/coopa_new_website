import { FilterIcon, PlusIcon22 } from "@assets/icons/common";
import { Icon } from "@components/atoms";
import {
  CookieAddModal,
  DirectoryModal,
  FilterModal,
} from "@components/organisms";
import { CreateDirProps } from "@interfaces/directory";
import styled, { css } from "styled-components";
import React, {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "src/hooks";

export interface ListHeaderProps extends HTMLAttributes<HTMLElement> {
  /** header type */
  type: "cookie" | "dir" | "dirDetail" | "dirShare";
  isSearched?: boolean;
  cookieNum?: number;
  dirNum?: number;
  /** profile img */
  imgUrl?: string;
  nickname: string;
  filterType: "latest" | "oldest" | "readMost" | "readLeast" | "abc";
  onClickFilterType: (
    e: "latest" | "oldest" | "readMost" | "readLeast" | "abc",
  ) => void;
  isCreateCookieModalOpen: boolean;
  setIsCreateCookieModalOpen: Dispatch<SetStateAction<boolean>>;
  createDir?: (e: CreateDirProps) => void;
  createCookie: (url: string) => Promise<boolean>;
}
const ListHeader = ({
  className,
  type,
  isSearched = false,
  cookieNum = 0,
  dirNum = 0,
  imgUrl,
  nickname,
  filterType,
  onClickFilterType,
  isCreateCookieModalOpen,
  setIsCreateCookieModalOpen,
  createDir,
  createCookie,
}: ListHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // cookie 추가 모달 x좌표
  const [locationX, setLocationX] = useState(0);
  const windowSize = useWindowSize();
  const plusIconLocation = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    plusIconLocation.current &&
      setLocationX(plusIconLocation.current.getBoundingClientRect().x);
  }, [windowSize.width]);

  return (
    <>
      <ListHeaderWrap
        className={className}
        type={type}
        nickname={nickname}
        isSearched={isSearched}
      >
        {(type === "dirDetail" || type === "dirShare") && (
          <User>
            <img alt="profile-img" src={imgUrl} />
            <p>{nickname}</p>
          </User>
        )}
        {!isSearched ? (
          <>
            {type === "cookie" && <div className="nickname--cookie" />}
            {type === "dir" && <div className="nickname--dir" />}
          </>
        ) : (
          <>
            {type === "cookie" && (
              <div className="num">
                <b className="num--bold">
                  {cookieNum && cookieNum > 999 ? "999+" : cookieNum}개
                </b>
                의 쿠키
              </div>
            )}
            {type === "dir" && (
              <div className="num">
                <b className="num--bold">
                  {dirNum && dirNum > 999 ? "999+" : dirNum}개
                </b>
                의 디렉토리
              </div>
            )}
          </>
        )}
        {!isSearched && (
          <div className="button-wrap">
            {type !== "dirShare" && (
              <StyledIcon
                className="create"
                onClick={() => setIsCreateCookieModalOpen(true)}
                isAtv={isCreateCookieModalOpen}
                ref={plusIconLocation}
              >
                <PlusIcon22 className="plus-icon" />
              </StyledIcon>
            )}
            <StyledIcon
              className="filter"
              onClick={() => setIsFilterOpen(true)}
              isAtv={isFilterOpen}
            >
              <FilterIcon className="filter-icon" />
            </StyledIcon>
            <FilterModal
              className="filter-modal"
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
              type={type === "dirDetail" ? "cookie" : type}
              filterType={filterType}
              onClickType={onClickFilterType}
            />
          </div>
        )}
      </ListHeaderWrap>
      {(type === "cookie" || type === "dirDetail") && (
        <CookieAddModal
          isOpen={isCreateCookieModalOpen}
          setIsOpen={setIsCreateCookieModalOpen}
          locationX={locationX - 430}
          type={type}
          createCookie={createCookie}
        />
      )}
      {type === "dir" && (
        <DirectoryModal
          isOpen={type === "dir" && isCreateCookieModalOpen}
          setIsOpen={setIsCreateCookieModalOpen}
          type="new"
          createDir={createDir}
        />
      )}
    </>
  );
};

export default ListHeader;

interface ListHeaderWrapProps {
  type: "cookie" | "dir" | "dirDetail" | "dirShare" | "abc";
  nickname: string;
  isSearched: boolean;
}
const ListHeaderWrap = styled.section<ListHeaderWrapProps>`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  width: 1596px;
  ${({ type, isSearched, theme }) =>
    isSearched
      ? css`
          margin-top: 38px;
          margin-bottom: 22px;
          ${theme.media.tablet`
            margin-top: 32px;
            margin-bottom: 24px;
          `}
          ${theme.media.mobile`
            margin-top: 28px;
            margin-bottom: 20px;
          `}
        `
      : type === "cookie" || type === "dir"
      ? css`
          margin-top: 26px;
          margin-bottom: 20px;
          ${type === "cookie" &&
          theme.media.mobile`
            margin-bottom: 0;
          `}
        `
      : css`
          margin-bottom: 20px;
        `}

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .nickname--cookie {
    font-weight: 700;
    font-size: 22px;
    line-height: 28px;
    color: var(--black_1);
    &:after {
      content: "${({ nickname }) => nickname}님의 파킹랏";
    }
  }
  .nickname--dir {
    font-weight: 700;
    font-size: 22px;
    line-height: 28px;
    color: var(--black_1);
    &:after {
      content: "${({ nickname }) => nickname}님의 디렉토리";
    }
  }

  .num {
    font-size: 18px;
    line-height: 26px;
    color: var(--gray_6);
  }
  .num--bold {
    font-size: 18px;
    line-height: 26px;
    color: var(--orange);
  }

  .button-wrap {
    width: fit-content;
    display: flex;
    flex-direction: row;

    position: relative;
    .filter-modal {
      position: absolute;
      top: 6rem;
      right: 0;
    }
  }

  ${({ theme }) => theme.media.desktop_2`
    width: 1272px;
  `}
  /* 1366- 1599*/
  ${({ theme }) => theme.media.desktop_3`
    width: 1152px;
  `}  
  /* 1024-1365 */
  ${({ theme }) => theme.media.desktop_4`
    width: 858px;
  `}
  /* 600-1023 */
  ${({ theme }) => theme.media.tablet`
    width: 564px;
  `}
  /* -599 */
  ${({ theme }) => theme.media.mobile`
    width: 100%;
    padding: 0 20px;
    .nickname--cookie {
      &:after {
        content: "모든 쿠키";
      }
    }
    .nickname--dir {
      &:after {
        content: "디렉토리";
      }
    }
    .num {
      font-size: 16px;
      line-height: 20px;
    }
    .num--bold {
      font-size: 16px;
      line-height: 20px;
    }
  `}
`;

const User = styled.div`
  display: flex;
  gap: 10px;
  & > img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  & > p {
    margin: 0;

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;

    color: var(--black_1);
  }
`;

interface StyledIconProps {
  isAtv?: boolean;
}
const StyledIcon = styled(Icon)<StyledIconProps>`
  width: 48px;
  height: 48px;
  border-radius: 24px;

  ${({ isAtv }) =>
    isAtv
      ? css`
          background-color: var(--gray_active);
          .plus-icon {
            rect {
              fill: var(--white);
            }
          }
          .filter-icon {
            rect {
              fill: var(--white);
            }
            circle {
              stroke: var(--white);
            }
          }
        `
      : css`
          @media (hover: hover) {
            &:hover {
              background-color: var(--gray_hover_1);
            }
          }
        `}
`;
