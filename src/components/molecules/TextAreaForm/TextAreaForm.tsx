import styled from "styled-components";
import TextArea from "@components/atoms/TextArea/TextArea";

export interface TextAreaFormProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** textarea의 css (width, height...) */
  textareaStyle?: React.CSSProperties;
  /** label 텍스트 */
  text: string;
  /** textarea에 들어가는 value의 최대 길이 */
  maxLength: number;
  /** textarea에 들어가는 value의 길이 */
  length: number;
  /** textarea에 들어가는 placeholder */
  placeholder?: string;
  /** textarea tag value */
  value: string | number | readonly string[] | undefined;
  /** textarea tag onChange */
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  /** textarea key press */
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  /** textarea key down */
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

const TextAreaForm = ({
  id,
  className,
  textareaStyle,
  text,
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
      <div className="textarea_form_wrap">
        <label className="textarea_form_wrap__label" htmlFor="textarea">
          {text}
        </label>
        <span className="textarea_form_wrap__length">{`${length}/${maxLength}`}</span>
      </div>
      <TextArea
        id="textarea"
        style={textareaStyle}
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

  .textarea_form_wrap {
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
