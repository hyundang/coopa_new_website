import React, { Dispatch, HTMLAttributes, SetStateAction } from "react";
import styled, { css } from "styled-components";

export interface TabProps extends HTMLAttributes<HTMLDivElement> {
  /** 탭 버튼 css */
  tabStyle?: React.CSSProperties;
  /** 탭 버튼 텍스트 */
  options: string[];
  /** 탭 버튼 선택값 */
  value: string;
  /** 탭 버튼 선택값 setState */
  setValue: Dispatch<SetStateAction<string>>;
}

const Tab = ({
  id,
  className,
  tabStyle,
  options,
  value,
  setValue,
}: TabProps) => {
  return (
    <TabWrap
      id={id}
      className={className}
      tabStyle={tabStyle}
      value={value}
      options={options}
      role="tab"
    >
      <div className="tab-list">
        {options.map((opt: string) => {
          return (
            <TabBtn
              className="tab-list__item"
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
      <span className="tab-under_bar" />
    </TabWrap>
  );
};

export default Tab;

interface TabWrapProps {
  tabStyle?: React.CSSProperties;
  value?: string;
  options?: string[];
}
const TabWrap = styled.div<TabWrapProps>`
  width: 100%;

  .tab-list {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .tab-under_bar {
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
  cursor: pointer;
  text-align: center;
  transition: 0.2s;

  @media (hover: hover) {
    &:hover {
      color: var(--black_1);
    }
  }

  ${(props) =>
    props.isClicked
      ? css`
          color: var(--black_2);
          font-weight: 500;
        `
      : css`
          color: var(--gray_4);
          font-weight: 400;
        `}
`;
