import { LogoImg } from "@assets/imgs/common";
import { CopyRight } from "@assets/icons/footer";
import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrap>
      <LogoImg className="logo" role="img" />
      <section className="desc">
        <a
          className="desc__h1"
          href="https://forms.gle/fo4oSB3U2DE5EMNK6"
          target="_blank"
          rel="noreferrer"
        >
          서비스 피드백
        </a>
        <a
          className="desc__h2"
          href="https://noisy-cesium-9a6.notion.site/421dda856c7a4898b57a4867c5390fda"
          target="_blank"
          rel="noreferrer"
        >
          개인정보 처리방침
        </a>
        <a
          className="desc__h3"
          href="https://www.notion.so/a5f04ad03fe14940801520d1d2bd20ae"
          target="_blank"
          rel="noreferrer"
        >
          Help & Support
        </a>
        <div className="desc__h4">제휴 및 광고 문의</div>
      </section>
      <address className="contact">
        <p className="contact__title">Contact</p>
        <p className="contact__desc">cookieparking@gmail.com</p>
      </address>
      <div className="copyright">
        <p className="copyright__title">Copyright</p>
        <img className="copyright__icon" src={CopyRight} alt="copyright" />
        <p className="copyright__desc">Cookieparking. All rights reserved</p>
      </div>
    </FooterWrap>
  );
};

const FooterWrap = styled.footer`
  width: 100%;
  height: 24rem;
  background: var(--gray_1);
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 0;
  }
  .logo {
    margin-top: 3.4rem;
    width: 15.886rem;
    height: 3rem;
  }
  .desc {
    margin-top: 1.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--gray_4);
    padding: 1.2rem;
    width: 54rem;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.68rem;
    color: var(--gray_6);
    &__h1 {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
    }
    &__h2 {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
    }
    &__h3 {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
    }
    &__h4 {
      color: var(--gray_4);
    }
  }
  .contact {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    font-style: normal;
    line-height: 1.56rem;
    color: var(--gray_6);
    margin-top: 2.5rem;
    &__title {
      font-weight: 400;
    }
    &__desc {
      margin-left: 1rem;
      font-weight: 300;
    }
  }
  .copyright {
    display: flex;
    align-items: center;
    color: var(--gray_6);
    margin-top: 0.6rem;
    font-size: 1.3rem;
    line-height: 1.56rem;
    &__icon {
      margin-left: 0.5rem;
      width: 1.3rem;
      height: 1.3rem;
    }
    &__desc {
      margin-left: 0.5rem;
    }
  }

  ${({ theme }) => theme.media.tablet`
    height: 242px;
    .desc {
      width: 31.5rem;
      justify-content: center;
      font-size: 1.4rem;
      &__h1 {
        display: none;
      }
      &__h3 {
        margin-left: 3.6rem;
      }
      &__h4 {
        display: none;
      }
    }
  `}
`;

export default Footer;
