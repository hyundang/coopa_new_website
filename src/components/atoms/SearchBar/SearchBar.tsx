import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import {
  HomeBoardSearch,
  HomeBoardSearchActive,
  HomeBoardSearchClose,
  HomeBoardSearchCloseHover,
} from "src/assets/icons/searchbar";
import useInput from "src/hooks/useInput";

interface ContainerProps {
  visible: boolean;
}
const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.3s linear;
`;

interface SearchBarWrapperProps {
  isSearched: boolean;
}
const SearchBarWrapper = styled.div<SearchBarWrapperProps>`
  width: 84rem;
  height: 7.6rem;
  padding: 2.4rem 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 5.4rem;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15);
  }
  ${({ isSearched }) =>
    isSearched &&
    css`
      border-radius: 0rem;
      border-bottom: 0.15rem solid var(--orange);
      padding: 0.7rem 1.1rem;
      &:hover {
        box-shadow: none;
      }
    `}
`;

const SearchIcon = styled.img``;

const Input = styled.input`
  outline: none;
  border: none;
  margin-left: 1.4rem;
  font-style: normal;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.9rem;
  width: 100%;
  &::placeholder {
    color: var(--gray_4);
  }
  &:focus {
    color: var(--black_2);
  }
`;

const SearchCloseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1.4rem;
  cursor: pointer;
  object-fit: cover;
  object-position: center;
  width: 5.6rem;
  height: 5.6rem;
`;
const SearchClose = styled.img``;

const fadeIn = keyframes`
  from {
      transform: translate(0,-25px);
      opacity: 0;
    }
    to {
        transform: translate(0,0);
        opacity: 1;
    }
    `;

const fadeOut = keyframes`
  from {
      transform: translate(0,0);
      opacity: 1;
    }
    to {
        transform: translate(0,-25px);
        opacity: 0;
    }
    `;

export interface SearchBarProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({
  visible,
  setVisible,
  isSearched,
  setIsSearched,
}: SearchBarProps) {
  const { value: searchValue, onChange: onChangeValue } = useInput<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const onFocus = () => {
    setIsFocus(true);
  };
  const onBlur = () => {
    setIsFocus(false);
  };
  const onMouseOver = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };
  const onClickClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 200);
    } else {
      setTimeout(() => {
        setVisible(false);
      }, 200);
    }
  }, [visible]);

  return (
    <>
      {!visible && <div> 없지롱 </div>}
      {visible && (
        <Container visible={visible}>
          <SearchBarWrapper isSearched={isSearched}>
            {isFocus ? (
              <SearchIcon src={HomeBoardSearchActive} alt="search_icon_hover" />
            ) : (
              <SearchIcon src={HomeBoardSearch} alt="search_icon" />
            )}
            <Input
              placeholder="무엇을 찾아드릴까요?"
              value={searchValue}
              onChange={onChangeValue}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </SearchBarWrapper>
          <SearchCloseWrapper
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            onClick={onClickClose}
          >
            {isHover ? (
              <SearchClose
                src={HomeBoardSearchCloseHover}
                alt="search_close_hover"
              />
            ) : (
              <SearchClose src={HomeBoardSearchClose} alt="search_close" />
            )}
          </SearchCloseWrapper>
        </Container>
      )}
    </>
  );
}
