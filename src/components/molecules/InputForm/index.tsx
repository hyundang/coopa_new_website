import { RefObject, forwardRef } from "react";
import styled from "styled-components";
import { Input } from "@components/atoms";

export interface InputFormProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** input의 css (width, height...) */
  inputStyle?: React.CSSProperties;
  /** label 텍스트 */
  text: string;
  /** input에 들어가는 value의 최대 길이 */
  maxLength: number;
  /** input에 들어가는 value의 길이 */
  length: number;
  /** input에 들어가는 placeholder */
  placeholder?: string;
  /** input tag value */
  value: string | number | readonly string[] | undefined;
  /** input tag onChange */
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  /** input key press */
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  /** input key down */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const InputForm = (
  {
    id,
    className,
    inputStyle,
    text,
    length,
    maxLength,
    placeholder,
    value,
    onChange,
    onKeyPress,
    onKeyDown,
  }: InputFormProps,
  ref?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined,
) => {
  return (
    <Container id={id} className={className}>
      <div className="input-form">
        <label className="input-form__label" htmlFor="input">
          {text}
        </label>
        <span className="input-form__length">{`${length}/${maxLength}`}</span>
      </div>
      <Input
        id="input"
        style={inputStyle}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        ref={ref}
      />
    </Container>
  );
};

export default forwardRef(InputForm);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  .input-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 11px;
    padding: 0 10px 0 1px;
    width: 100%;

    &__label {
      font-size: 13px;
      font-weight: 400;
      color: var(--black_1);
    }

    &__length {
      font-size: 13px;
      font-weight: 500;
      color: var(--gray_5);
    }
  }
`;