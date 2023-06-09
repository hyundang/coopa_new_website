import React from "react";
import styled from "styled-components";
// assets
import { GoogleIcon } from "@assets/icons/btn";

export interface LoginBtnProps {
  /** 로그인 버튼을 클릭했을 때 실행되는 함수 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const LoginBtn = ({ onClick }: LoginBtnProps) => {
  return (
    <BtnWrap onClick={onClick}>
      <GoogleIcon className="google_icon" />
      <span className="button_text">Google로 3초만에 로그인하기</span>
    </BtnWrap>
  );
};

export default LoginBtn;

const BtnWrap = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  position: relative;
  left: 50%;
  transform: translate(-50%, 0);

  width: 26.9rem;
  height: 5rem;
  margin-top: 2rem;
  padding: 1.6rem 2.4rem;
  background: white;
  border: 0.1rem solid var(--gray_6);
  border-radius: 3rem;
  outline: none;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  transition-property: box-shadow;
  transition: 0.3s;
  @media (hover: hover) {
    &:hover {
      transform: translate(-50%, -0.4rem);
      border: 0.1rem solid var(--white);
      box-shadow: 0px 0.3rem 1.3rem rgba(0, 0, 0, 0.15);
    }
  }

  @media screen and (min-width: 769px) {
    width: 307px;
    height: 54px;
    padding: 18px 30px;
  }

  .google_icon {
    width: 20px;
    height: 20px;

    @media screen and (min-width: 769px) {
      width: 24px;
      height: 24px;
    }
  }

  .button_text {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--black_2);

    @media screen and (min-width: 769px) {
      font-size: 1.7rem;
    }
  }
`;
