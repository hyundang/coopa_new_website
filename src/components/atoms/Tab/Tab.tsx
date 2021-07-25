import { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";

export interface TabProps {
  /** 탭 버튼 css */
  tabStyle?: React.CSSProperties;
  /** 탭 버튼 텍스트 */
  options: string[];
  /** 탭 버튼 선택값 */
  value: string;
  /** 탭 버튼 선택값 setState */
  setValue: Dispatch<SetStateAction<string>>;
}

const Tab = ({ tabStyle, options, value, setValue }: TabProps) => {
  return (
    <Container
      className="tab_container"
      tabStyle={tabStyle}
      value={value}
      options={options}
    >
      <div className="tab_btn_wrap">
        {options.map((opt: string) => {
          return (
            <TabBtn
              className="tab_btn"
              style={tabStyle}
              key={opt}
              isClicked={opt === value}
              onClick={() => setValue(opt)}
            >
              {opt}
            </TabBtn>
          );
        })}
      </div>
      <span className="tab_btn_under_bar" />
    </Container>
  );
};

export default Tab;

interface ContainerProps {
  tabStyle?: React.CSSProperties;
  value?: string;
  options?: string[];
}
const Container = styled.div<ContainerProps>`
  width: 100%;

  .tab_btn_wrap {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    /* position: relative;
    z-index: 1; */
  }

  .tab_btn_under_bar {
    position: absolute;
    z-index: 2;
    width: ${(props) => props.tabStyle?.width};
    height: 2px;
    background-color: var(--orange);
    transition: 0.2s;
    ${(props) =>
      props.value && props.options?.indexOf(props.value) === 0
        ? css``
        : css`
            margin-left: ${props.tabStyle?.width};
          `}
  }
`;

interface TabBtnProps {
  isClicked: boolean;
}
const TabBtn = styled.button<TabBtnProps>`
  all: unset;
  height: 100%;
  text-align: center;
  transition: 0.2s;

  &:hover {
    color: var(--black_1);
  }

  ${(props) =>
    props.isClicked
      ? css`
          color: var(--black_2);
          font-weight: 500;
          /* border-bottom: 2px solid var(--orange); */
        `
      : css`
          color: var(--gray_4);
          font-weight: 400;
        `}
`;
