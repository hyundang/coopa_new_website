import React, { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

const TextArea = ({
  id,
  className,
  children,
  style,
  placeholder,
  maxLength,
  value,
  onChange,
  onKeyPress,
  onKeyDown,
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <Container
      id={id}
      className={className}
      style={style}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
    >
      {children}
    </Container>
  );
};

export default TextArea;

const Container = styled.textarea`
  all: unset;
  box-sizing: border-box;

  border: 1px solid var(--gray_4);
  border-radius: 12px;
  padding: 12px 5px 12px 18px;
  width: 100%;

  font-family: Spoqa Han Sans Neo;
  font-weight: 500;
  color: var(--black_1);
  letter-spacing: -0.2px;

  @media (hover: hover) {
    &:hover {
      border: 1px solid var(--gray_5);
    }
  }

  &:focus {
    border: 1px solid var(--orange);
  }

  &::placeholder {
    color: var(--gray_4);
  }

  ::-webkit-scrollbar {
    width: 16px;
    border-radius: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--gray_2);
    background-clip: padding-box;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 6px solid transparent;
    border-radius: 5px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gray_3);
    background-clip: padding-box;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 6px solid transparent;
  }
`;
