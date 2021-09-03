import styled from "styled-components";
import { CookieDataProps } from "src/lib/interfaces/cookie";
import { Btn } from "@components/atoms";
import { Cookie, Empty, ListHeader } from "@components/organisms";
import {
  EmptyCookieIcon,
  EditIcon,
  LinkIcon,
  CookieIcon,
} from "@assets/icons/common";
import React, { Dispatch, SetStateAction } from "react";
import { DirectoryDataProps } from "@interfaces/directory";
import { EmptyImg } from "@assets/imgs/common";

export interface CookiesProps {
  /** cookie data */
  data: CookieDataProps[];
  /** cookie type */
  type?: "normal" | "searched" | "dirDetail" | "dirShare";
  /** 전체 디렉토리 data */
  allDir: DirectoryDataProps[];
  /** 온보딩 모달 오픈 */
  setIsOnboardOpen?: Dispatch<SetStateAction<boolean>>;
}

const Cookies = ({
  data,
  allDir,
  type = "normal",
  setIsOnboardOpen,
}: CookiesProps) => {
  return (
    <CookiesCntnr>
      {data.length !== 0 ? (
        <CookieWrap>
          {data.map((cookie) => (
            <Cookie
              cookie={cookie}
              key={cookie.id}
              allDir={allDir}
              isShared={type === "dirShare"}
            />
          ))}
        </CookieWrap>
      ) : (
        <>
          {type === "dirDetail" ? (
            <Empty
              img={EmptyImg}
              imgWidth={170}
              text="새로운 쿠키를 저장해보세요!"
            />
          ) : type === "searched" ? (
            <Empty
              img={EmptyImg}
              imgWidth={170}
              text="검색된 디렉토리가 없어요!"
            />
          ) : (
            <Empty
              className="empty"
              img={EmptyImg}
              imgWidth={170}
              text="쿠키를 모으러 가볼까요?"
              Btn={
                <Btn
                  className="empty__button--cookie"
                  isOrange
                  isAtvBtn
                  onClick={() => setIsOnboardOpen && setIsOnboardOpen(true)}
                >
                  <CookieIcon className="cookie-icon" />
                  쿠키 저장하는 법 알아보기
                </Btn>
              }
            />
          )}
        </>
      )}
    </CookiesCntnr>
  );
};

export default Cookies;

const CookiesCntnr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty {
    &__button--cookie {
      width: 312px;
      height: 58px;
      border-radius: 29px;
      font-size: 18px;
      .cookie-icon {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }
    }
  }
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
