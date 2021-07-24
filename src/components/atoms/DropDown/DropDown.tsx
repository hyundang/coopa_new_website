import styled from "styled-components";
import downIcon from "@assets/icons/card/icon_dropdown.svg";

export interface IProps {
  /** 내부에 들어가는 컴포넌트 */
  children?: React.ReactNode;
  //현재 디렉토리
  selectedItem?: string | undefined;
  //style
  style?: React.CSSProperties;
}
const CardIcon = ({ children, selectedItem, style }: IProps) => {
  return (
    <DropDownWrap style={style}>
      <div className="current">
        <p>{selectedItem}</p>
        <img src={downIcon} alt="downIcon" />
      </div>
      <div>{children}</div>
    </DropDownWrap>
  );
};

export default CardIcon;

interface IIconWrap {
  src?: string;
}
const DropDownWrap = styled.section<IIconWrap>`
  background-color: black;
  .current {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.92);
    p {
      font-family: "Spoqa Han Sans Neo";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }
    img {
      position: absolute;
      right: 13px;
    }
  }
`;
