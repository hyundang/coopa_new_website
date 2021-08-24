import styled from "styled-components";
import { CookieDataProps } from "src/lib/interfaces/cookie";
import { Btn } from "@components/atoms";
import { Cookie, ListHeader } from "@components/organisms";
import { EmptyCookieIcon, EditIcon, LinkIcon } from "@assets/icons/common";
import React from "react";
import { DirectoryDataProps } from "@interfaces/directory";

export interface CookiesProps {
  /** cookie data */
  data: CookieDataProps[];
  /** 공유 쿠키 여부 */
  isShared?: boolean;
  allDir: DirectoryDataProps[];
}

const Cookies = ({ data, allDir, isShared }: CookiesProps) => {
  return (
    <CookiesCntnr>
      <CookieWrap>
        {data.map((cookie) => (
          <Cookie
            cookie={cookie}
            key={cookie.id}
            allDir={allDir}
            isShared={isShared}
          />
        ))}
      </CookieWrap>
    </CookiesCntnr>
  );
};

export default Cookies;

const CookiesCntnr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CookieWrap = styled.section`
  display: grid;
  justify-content: center;
  grid-gap: 5px 24px;
  /* 1920- */
  grid-template-columns: repeat(5, 30rem);
  grid-auto-rows: 368px;
  /* 1600- 1919*/
  ${({ theme }) => theme.media.desktop_2`
    grid-template-columns: repeat(4, 30rem);
  `}
  /* 1366- 1599*/
  ${({ theme }) => theme.media.desktop_3`
    grid-template-columns: repeat(4, 27rem);
    grid-auto-rows: 334px;
  `}  
  /* 1024-1365 */
  ${({ theme }) => theme.media.desktop_4`
    grid-template-columns: repeat(3, 27rem);
  `}
  /* 600-1023 */
  ${({ theme }) => theme.media.tablet`
    grid-template-columns: repeat(2, 27rem);
  `}
  /* -599 */
   ${({ theme }) => theme.media.mobile`
    grid-template-columns: repeat(1, auto);
  `}
`;
