import { ChromeStoreImg } from "@assets/imgs/landing";
import styled from "styled-components";

interface Props {
  className?: string;
}
const WebStoreBtn = ({ className }: Props) => {
  return (
    <BtnWrap
      className={className}
      href="https://chrome.google.com/webstore/detail/cookie-parking/gbpliecdabaekbhmncopnbkfpdippdnl?utm_source=chrome-ntp-icon"
      target="_blank"
    >
      <img alt="chrome_store" className="chrome_store" src={ChromeStoreImg} />
      <span className="button_text">Chrome 웹스토어 바로가기</span>
    </BtnWrap>
  );
};

export default WebStoreBtn;

const BtnWrap = styled.a`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  width: 328px;
  height: 58px;
  padding: 18px 39px;
  background-color: var(--gray_8);
  border-radius: 29px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  transition-property: box-shadow;
  transition: 0.3s;
  @media (hover: hover) {
    &:hover {
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.12);
    }
  }
  &:active {
    background-color: var(--gray_hover_1);
  }

  .google_icon {
    width: 28px;
    height: 28px;
  }

  .button_text {
    font-size: 18px;
    font-weight: 500;
    color: var(--black_2);
  }

  ${({ theme }) => theme.media.tablet`
    width: 292px;
    height: 56px;
    border-radius: 28px;
    padding: 18px 27px;
    .button_text {
      font-size: 17px;
    }
  `}
`;
