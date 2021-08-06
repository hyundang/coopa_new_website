import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CloseIcon } from "src/assets/icons/searchbar";
import { SearchIcon } from "@assets/icons/common";
import { useInput } from "src/hooks";
import { searchbarAnimation } from "@components/animations";
import { Icon } from "@components/atoms";

export interface SearchBarProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 검색창 표시 여부 */
  visible: boolean;
  /** 검색창 표시 여부 setState */
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  /** 검색 여부 */
  isSearched: boolean;
  /** 검색 여부 setState */
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  /** onKeyPress event handler */
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 검색창 불필요한 fadeout 방지 */
  preventFadeout: boolean;
  setPreventFadeout: Dispatch<SetStateAction<boolean>>;
}

export default function SearchBar({
  id,
  className,
  visible,
  setVisible,
  isSearched,
  setIsSearched,
  onKeyPress,
  preventFadeout,
  setPreventFadeout,
}: SearchBarProps) {
  const { value: searchValue, onChange: onChangeValue } = useInput("");
  const [isFocus, setIsFocus] = useState(false);

  return (
    <SearchBarWrap
      id={id}
      className={className}
      visible={visible}
      preventFadeout={preventFadeout}
      isSearched={isSearched}
      isFocus={isFocus}
    >
      <span className="search-bar">
        <SearchIcon className="search-bar__icon" />
        <input
          className="search-bar__input"
          placeholder="무엇을 찾아드릴까요?"
          value={searchValue}
          onChange={onChangeValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyPress={onKeyPress}
        />
      </span>
      <Icon
        className="search-close"
        onClick={() => {
          setPreventFadeout(false);
          setVisible(false);
        }}
      >
        <CloseIcon className="search-close__icon" />
      </Icon>
    </SearchBarWrap>
  );
}

interface SearchBarWrapProps {
  visible: boolean;
  isSearched: boolean;
  isFocus: boolean;
  preventFadeout: boolean;
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

  .search-bar {
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
    ${({ isFocus }) =>
      isFocus &&
      css`
        background-color: var(--white);
        box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15);
      `}
    ${({ isSearched }) =>
      isSearched &&
      css`
        border-radius: 0;
        border-bottom: 1.5px solid var(--orange);
        padding: 7px 11px;
        &:hover {
          box-shadow: none;
        }
      `}

    &__icon {
      width: 23.7px;
      height: 23.7px;
      margin-right: 18px;
      ${({ isFocus }) =>
        isFocus &&
        css`
          transition: 0.2s;
          path {
            fill: var(--orange);
          }
        `};
    }

    &__input {
      all: unset;
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

    ${({ theme }) => theme.media.tablet`
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
      &__input {
        font-size: 16px;
      }
      &__icon {
        width: 18px;
        height: 18px;
        margin-right: 13px;
      }
    `}
    ${({ isFocus, theme }) =>
      isFocus &&
      theme.media.tablet`
        background-color: var(--white);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
      `}
    ${({ theme }) => theme.media.mobile`
      width: 100%;
    `}
  }

  .search-close {
    width: 56px;
    height: 56px;
    border-radius: 28px;
    box-shadow: 0 5px 13px rgba(0, 0, 0, 0.15);
    background-color: rgba(255, 255, 255, 0.2);
    &__icon {
      width: 24px;
      height: 24px;
    }
    transition: 0.2s;
    @media (hover: hover) {
      &:hover {
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
        .search-close__icon {
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
      &__icon {
        width: 12px;
        height: 12px;
        path {
          fill: var(--gray_6);
        }
      }
      &:hover {
        background-color: var(--gray_2);
        box-shadow: none;
        .search-close__icon {
          width: 12px;
          height: 12px;
          path {
            fill: var(--gray_6);
          }
        }
      }
    `}
  }
`;
