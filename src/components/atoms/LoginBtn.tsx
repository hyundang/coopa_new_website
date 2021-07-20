import React from "react";
import styled from "styled-components";
// assets
import google_icon from "@assets/icons/login/google_logo.svg";

export interface IProps {
  /** 로그인 버튼을 클릭했을 때 실행되는 함수 */
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}
const LoginBtn = ({ onClick }: IProps) => {
  return (
    <BtnWrap onClick={onClick}>
      <BtnLogo src={google_icon} />
      <BtnText>Google로 3초만에 로그인하기</BtnText>
    </BtnWrap>
  );
};

export default LoginBtn;

const BtnWrap = styled.div`
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
  &:hover {
    transform: translate(-50%, -0.4rem);
    border: 0.1rem solid var(--white);
    box-shadow: 0px 0.3rem 1.3rem rgba(0, 0, 0, 0.15);
  }

  @media screen and (min-width: 769px) {
    width: 30.7rem;
    height: 5.4rem;
    padding: 1.8rem 3rem;
  }
`;

const BtnLogo = styled.img`
  width: 2rem;
  height: 1.8rem;

  @media screen and (min-width: 769px) {
    width: 2.3rem;
    height: 2.1rem;
  }
`;

const BtnText = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--black_2);

  @media screen and (min-width: 769px) {
    font-size: 1.7rem;
  }
`;
