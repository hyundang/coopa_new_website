import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { CloseIcon } from "src/assets/icons/searchbar";
import { SearchIcon } from "@assets/icons/common";
import { searchbarAnimation } from "@components/animations";
import { Icon } from "@components/atoms";
import { HomeboardState } from "@modules/states";
import { useRecoilState } from "recoil";

export interface SearchBarProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** onKeyPress event handler */
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
}

export default function SearchBar({
  id,
  className,
  onKeyPress,
}: SearchBarProps) {
  // input focus
  const [isFocus, setIsFocus] = useState(false);

  // for input refs
  const search_input = useRef<HTMLInputElement>(null);

  // 검색 여부
  const [isSearched, setIsSearched] = useRecoilState(
    HomeboardState.IsSearchedState,
  );
  // 검색어
  const [searchValue, setSearchValue] = useRecoilState(
    HomeboardState.SearchValueState,
  );
  // 불필요한 검색창 렌더링 방지
  const [preventFadeout, setPreventFadeout] = useRecoilState(
    HomeboardState.PreventFadeoutState,
  );
  // 검색창 활성화 여부
  const [isSearchBarVisible, setIsSearchBarVisible] = useRecoilState(
    HomeboardState.IsSearchBarVisibleState,
  );

  // close button click
  const handleClickCloseBtn = () => {
    setPreventFadeout(false);
    setIsSearched(false);
    setIsSearchBarVisible(false);
  };

  // 키 클릭 시
  // esc = 검색창 닫기
  const handleKeyDown = async (e: any) => {
    if (e.key === "Escape" && isSearchBarVisible) {
      setPreventFadeout(false);
      setIsSearchBarVisible(false);
    }
  };

  // 키 떼어냈을 때
  // shift + s = 검색창 열기
  const handleKeyUp = (e: any) => {
    if (e.key === "S" && e.shiftKey && !isSearchBarVisible) {
      setIsSearchBarVisible(true);
      setSearchValue("");
      setIsSearched(false);
    }
  };

  // 제일 처음에 search bar focus 상태로 설정
  useEffect(() => {
    isSearchBarVisible && search_input.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isSearchBarVisible]);

  // 불필요한 검색창 렌더링 방지
  useEffect(() => {
    setTimeout(() => !preventFadeout && setPreventFadeout(true), 1000);
  }, [preventFadeout]);

  return (
    <SearchBarWrap
      id={id}
      className={className}
      visible={isSearchBarVisible}
      preventFadeout={preventFadeout}
      isSearched={isSearched}
      isFocus={isFocus}
    >
      <SearchInputWrap
        visible={isSearchBarVisible}
        isSearched={isSearched}
        isFocus={isFocus}
      >
        <SearchIcon className="icon" />
        <input
          className="input"
          placeholder="무엇을 찾아드릴까요?"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyPress={onKeyPress}
          onKeyDown={handleKeyDown}
          ref={search_input}
        />
      </SearchInputWrap>
      <CloseIconWrap
        onClick={isSearchBarVisible ? handleClickCloseBtn : undefined}
        visible={isSearchBarVisible}
        isSearched={isSearched}
        isFocus={isFocus}
      >
        <CloseIcon className="icon_close" />
      </CloseIconWrap>
    </SearchBarWrap>
  );
}

interface SearchBarWrapProps {
  visible?: boolean;
  isSearched?: boolean;
  isFocus: boolean;
  preventFadeout?: boolean;
}
const SearchBarWrap = styled.div<SearchBarWrapProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ visible, preventFadeout }) =>
    visible
      ? css`
          animation: ${searchbarAnimation.fadeInRule};
          opacity: 1;
        `
      : css`
          animation: ${!preventFadeout
            ? searchbarAnimation.fadeOutRule
            : undefined};
          opacity: 0;
        `}
  ${({ visible, preventFadeout, theme }) =>
    visible
      ? theme.media.tablet`
          animation: ${searchbarAnimation.tabletFadeInRule};
          opacity: 1;
        `
      : preventFadeout
      ? theme.media.tablet`
          opacity: 0;
        `
      : theme.media.tablet`
          animation: ${searchbarAnimation.fadeOutRule};
          opacity: 0;
        `}
`;

const SearchInputWrap = styled.div<SearchBarWrapProps>`
  width: 840px;
  height: 76px;
  padding: 24px 48px;
  margin-right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.88);
  border-radius: 54px;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }
  ${({ isSearched, isFocus }) =>
    isSearched
      ? css`
          height: 50px;
          background-color: unset;
          border-radius: 0;
          border-bottom: 1.5px solid var(--orange);
          padding: 7px 11px;
          box-shadow: none;
          &:hover {
            box-shadow: none;
          }
        `
      : isFocus &&
        css`
          background-color: var(--white);
          box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15);
        `}

  .icon {
    width: 23.7px;
    height: 23.7px;
    margin-right: 18px;
    ${({ isFocus, isSearched }) =>
      (isFocus || isSearched) &&
      css`
        transition: 0.2s;
        path {
          fill: var(--orange);
        }
      `};
  }

  .input {
    all: unset;
    ${({ visible }) =>
      !visible &&
      css`
        cursor: default;
      `}
    font-family: Spoqa Han Sans Neo;
    letter-spacing: -0.2px;
    font-style: normal;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 2.9rem;
    color: var(--black_2);
    background-color: none;
    width: 100%;
    &::placeholder {
      color: var(--gray_4);
    }
  }

  ${({ theme, isSearched, isFocus }) => theme.media.tablet`
      width: 522px;
      height: 48px;
      padding: 15px 21px;
      margin-right: 10px;
      background-color: var(--gray_2);
      border-radius: 24px;
      @media (hover:hover){
        &:hover{
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
        }
      }
      .input {
        font-size: 16px;
      }
      .icon {
        width: 18px;
        height: 18px;
        margin-right: 13px;
      }
      ${
        isSearched
          ? css`
              height: 40px;
              width: 564px;
              margin-right: 0;
              padding: 9px 6px;
              border-bottom: 2px solid var(--orange);
              background-color: unset;
              border-radius: 0;
              box-shadow: none;
              &:hover {
                box-shadow: none;
              }
              .input {
                font-size: 20px;
              }
              .icon {
                width: 20.8px;
                height: 20.8px;
              }
            `
          : isFocus &&
            css`
              background-color: var(--white);
              box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
            `
      }
    `}

  ${({ theme, isSearched }) => theme.media.mobile`
      width: 100%;
      ${
        isSearched &&
        css`
          height: 38px;
          padding: 9px 7.5px;
          border-bottom: 1px solid var(--orange);
          .input {
            height: 22px;
            font-size: 18px;
          }
          .icon {
            margin-right: 9px;
          }
        `
      }
    `}
`;

const CloseIconWrap = styled(Icon)<SearchBarWrapProps>`
  ${({ visible }) =>
    !visible &&
    css`
      cursor: auto;
    `}
  ${({ isSearched }) =>
    isSearched &&
    css`
      display: none;
    `}
    width: 56px;
  height: 56px;
  border-radius: 28px;
  box-shadow: 0 5px 13px rgba(0, 0, 0, 0.15);
  background-color: rgba(255, 255, 255, 0.2);
  .icon_close {
    width: 24px;
    height: 24px;
  }
  transition: 0.2s;
  @media (hover: hover) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
      .icon_close {
        width: 24px;
        height: 24px;
        path {
          fill: var(--gray_4);
        }
      }
    }
  }
  ${({ theme }) => theme.media.tablet`
      width: 32px;
      height: 32px;
      border-radius: 16px;
      background-color: var(--gray_2);
      box-shadow: none;
      .icon_close {
        width: 12px;
        height: 12px;
        path {
          fill: var(--gray_6);
        }
      }
      &:hover {
        background-color: var(--gray_2);
        box-shadow: none;
        .icon_close {
          width: 12px;
          height: 12px;
          path {
            fill: var(--gray_6);
          }
        }
      }
    `}
`;
