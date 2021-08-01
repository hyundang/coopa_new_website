import React, { RefObject, forwardRef } from "react";
import styled from "styled-components";

export interface InputProps {
  /** input id */
  id?: string;
  /** input 안의 내용 */
  children?: React.ReactNode;
  /** css (width, height, borderRadius, fontSize) */
  style?: React.CSSProperties;
  /** placeholder */
  placeholder?: string;
  /** input tag 타입 */
  type?: string;
  /** 타입이 text일 경우 최대 글자수 제한 */
  maxLength?: number;
  /** input tag value */
  value: string | number | readonly string[] | undefined;
  /** input tag onChange */
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  /** input key press */
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  /** input key down */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** input tag outside click*/
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
}
const Input = (
  {
    id,
    children,
    style,
    placeholder,
    type = "text",
    maxLength,
    value,
    onChange,
    onKeyPress,
    onKeyDown,
    onBlur,
  }: InputProps,
  ref?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined,
) => {
  return (
    <Container
      id={id}
      style={style}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
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

  border: 1px solid var(--gray_4);
  border-radius: 12px;
  padding: 10px 18px;
  width: 100%;

  font-family: Spoqa Han Sans Neo;
  font-weight: 500;
  color: var(--black_1);
  letter-spacing: -0.2px;

  &:hover {
    border: 1px solid var(--gray_5);
  }

  &:focus {
    border: 1px solid var(--orange);
  }

  &::placeholder {
    color: var(--gray_4);
  }
`;
