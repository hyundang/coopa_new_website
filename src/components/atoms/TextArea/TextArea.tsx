import styled from "styled-components";

export interface TextAreaProps {
  /** textarea의 id */
  id?: string;
  /** className */
  className?: string;
  /** textarea 안의 내용 */
  children?: React.ReactNode;
  /** css (width, height, borderRadius, fontSize) */
  style?: React.CSSProperties;
  /** placeholder */
  placeholder?: string;
  /** 최대 글자수 제한 */
  maxLength?: number;
  /** input tag value */
  value: string | number | readonly string[] | undefined;
  /** input tag onChange */
  onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  /** textarea key press */
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  /** textarea key down */
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}
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
}: TextAreaProps) => {
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

  &:hover {
    border: 1px solid var(--gray_5);
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
