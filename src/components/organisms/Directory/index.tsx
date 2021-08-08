import React, { useState } from "react";
import styled, { css } from "styled-components";
import { CookieIcon } from "@assets/icons/common";
import { DirectoryData } from "src/lib/interfaces/user";

export interface DirectoryProps {
  dir: DirectoryData;
}

const DirCard = ({ dir }: DirectoryProps) => {
  return (
    <Container thumbnail={dir.thumbnail}>
      <div className="content">
        <div className="content__title">
          <p className="content__title--emoji">{dir.emoji}</p>
          {dir.name}
        </div>
        <div className="content__num">
          <CookieIcon />
          <div className="content__num--text">{dir.cookieCnt}개</div>
        </div>
      </div>
    </Container>
  );
};

export default DirCard;

export interface ContainerProps {
  thumbnail: string;
}

const Container = styled.div<ContainerProps>`
  cursor: pointer;

  position: relative;
  z-index: 1;

  width: 100%;
  height: 0;
  padding-top: 13.4rem;
  ${({ theme }) => theme.media.desktop_2`
    padding-top: 12rem;
  `}
  ${({ theme }) => theme.media.tablet`
    padding-top: 7.2rem;
  `}
  background-color: var(--gray_1);
  border-radius: 1.2rem;
  color: var(--black_2);

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    color: var(--white);
  }
  ${(props) =>
    props.thumbnail !== null &&
    css`
      ::after {
        content: "";
        display: block;
        position: absolute;
        border-radius: 1.2rem;
        top: 0;
        left: 0;
        background: url(${props.thumbnail}) center center / cover no-repeat;
        width: 100%;
        height: 100%;
        opacity: 0.15;
        z-index: -1;
      }
    `}
  ${({ theme }) => theme.media.desktop_4`
      background-color:var(--gray_1);
      color: var(black_2);
  `}
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 3.6rem;
    letter-spacing: -0.02em;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${({ theme }) => theme.media.tablet`
        width: 100%;
    `}

    &__title {
      max-width: 22.7rem;
      line-height: 1.7rem;
      white-space: nowrap;
      font-size: 1.7rem;
      display: flex;
      align-items: center;
      text-overflow: ellipsis;
      overflow: hidden;

      /* ${({ theme }) => theme.media.desktop_2`
        font-size: 1.6rem;
        max-width: 20rem;
      `}
      ${({ theme }) => theme.media.tablet`
        font-size: 1.3rem;
        height: 1.6rem;
        width: 80%;
        line-height: 1.6rem;
      `} */

      &--emoji {
        margin-right: 0.6rem;
        font-size: 1.6rem;

        /* ${({ theme }) => theme.media.tablet`
        font-size: 1.2rem;
        margin-right: 0.4rem;
      `} */
      }
    }
    &__num {
      height: 1.7rem;
      display: flex;
      align-items: center;
      font-size: 1.4rem;

      ${({ theme }) => theme.media.tablet`
        font-size: 1.1rem;
        height: 1.3rem;
      `}
      &--text {
        height: 1.8rem;
        line-height: 1.8rem;
        ${({ theme }) => theme.media.tablet`
          max-width: 3.6rem;
          height: 1.3rem;
          line-height: 1.3rem;
      `}
      }
    }
  }
`;
