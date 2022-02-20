import { TextArea } from "@components/atoms";
import styled from "styled-components";
import React, { TextareaHTMLAttributes } from "react";

export interface TextAreaFormProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  className?: string;
  labelText: string;
  /** textarea에 들어가는 value의 길이 */
  length: number;
}

const TextAreaForm = ({
  id,
  className,
  style,
  labelText,
  length,
  maxLength,
  placeholder,
  value,
  onChange,
  onKeyPress,
  onKeyDown,
}: TextAreaFormProps) => {
  return (
    <Container id={id} className={className}>
      <div className="textarea-form">
        <label className="textarea-form__label" htmlFor="textarea">
          {labelText}
        </label>
        <span className="textarea-form__length">{`${length}/${maxLength}`}</span>
      </div>
      <TextArea
        id="textarea"
        style={style}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
      />
    </Container>
  );
};

export default TextAreaForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  .textarea-form {
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
