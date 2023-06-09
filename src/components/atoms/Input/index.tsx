import React, { RefObject, forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";

const Input = (
  {
    id,
    className,
    children,
    style,
    placeholder,
    type = "text",
    maxLength,
    value,
    onChange,
    onKeyPress,
    onKeyDown,
    onFocus,
    onBlur,
  }: InputHTMLAttributes<HTMLInputElement>,
  ref?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined,
) => {
  return (
    <Container
      id={id}
      className={className}
      style={style}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={ref}
    >
      {children}
    </Container>
  );
};

export default forwardRef(Input);

const Container = styled.input`
  all: unset;
  box-sizing: border-box;
  letter-spacing: -0.2px;

  border: 1px solid var(--gray_4);
  border-radius: 12px;
  padding: 10px 18px;
  width: 100%;
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
`;
