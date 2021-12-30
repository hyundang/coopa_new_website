// assets
import { CookieIcon } from "@assets/icons/common";
import { EmptyImg } from "@assets/imgs/error";
// components
import { Btn } from "@components/atoms";
import { Cookie, CookieMobile, Empty } from "@components/organisms";
// hooks
import { useWindowSize } from "src/hooks";
// interfaces
import { CookieDataProps } from "@interfaces/cookie";
import { DirectoryDataProps, PostDirectoryProps } from "@interfaces/directory";
// libs
import styled from "styled-components";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// modules
import CookieModule from "@modules/CookieModule";
import DirDetailModule from "@modules/DirDetailModule";

export interface CookiesProps {
  /** cookie type */
  type?: "normal" | "searched" | "dirDetail" | "dirShare";
  /** cookie data */
  data: CookieDataProps[];
  /** cookie data loading */
  isLoading: boolean;
  /** 쿠키 모듈 */
  cookieModule: ReturnType<typeof CookieModule | typeof DirDetailModule>;
  // 나중에 모듈 안에 구현하기
  fixCookieHandler: () => void;
  /** 전체 디렉토리 data */
  allDir: DirectoryDataProps[];
  /** 고정 디렉토리 */
  fixedDir: DirectoryDataProps[];
  /** 온보딩 모달 오픈 */
  setIsOnboardOpen?: Dispatch<SetStateAction<boolean>>;
  /** add dir */
  postDir?: (body: PostDirectoryProps) => void;
}

const Cookies = ({
  type = "normal",
  data,
  isLoading,
  cookieModule,
  allDir,
  fixedDir,
  setIsOnboardOpen,
  postDir,
  fixCookieHandler,
}: CookiesProps) => {
  const size = useWindowSize();

  const [target, setTarget] = useState<HTMLElement>();

  useEffect(() => {
    // for infinite scroll
    const option = {
      threshold: 0.05,
    };
    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          // 쿠키 데이터 get하기
          cookieModule.setPageIndex &&
            cookieModule.pageIndex &&
            cookieModule.pageIndex !== null &&
            cookieModule.setPageIndex(cookieModule.pageIndex + 1);
        }
      });
    };
    const io = new IntersectionObserver(handleIntersection, option);
    if (target) io.observe(target);

    return () => io && io.disconnect();
  }, [target]);

  return (
    <CookiesCntnr>
      {data.length !== 0 ? (
        <>
          {size.width && size.width < 600 ? (
            <CookieMobileWrap>
              {data.map((cookie, idx) =>
                idx === data.length - 1 ? (
                  <CookieMobile
                    key={cookie.id}
                    cookie={cookie}
                    isLoading
                    isShared={type === "dirShare"}
                    cookieModule={cookieModule}
                    ref={(e: HTMLElement | null) => e !== null && setTarget(e)}
                  />
                ) : (
                  <CookieMobile
                    key={cookie.id}
                    cookie={cookie}
                    isLoading
                    cookieModule={cookieModule}
                    isShared={type === "dirShare"}
                  />
                ),
              )}
            </CookieMobileWrap>
          ) : (
            <CookieWrap>
              {data.map((cookie, idx) =>
                idx === data.length - 1 ? (
                  <Cookie
                    key={cookie.id}
                    isShared={type === "dirShare"}
                    cookie={cookie}
                    isLoading={isLoading}
                    cookieModule={cookieModule}
                    fixCookieHandler={fixCookieHandler}
                    allDir={allDir}
                    fixedDir={fixedDir}
                    postDir={postDir}
                    ref={(e: HTMLElement | null) => e !== null && setTarget(e)}
                  />
                ) : (
                  <Cookie
                    key={cookie.id}
                    isShared={type === "dirShare"}
                    cookie={cookie}
                    cookieModule={cookieModule}
                    fixCookieHandler={fixCookieHandler}
                    isLoading={isLoading}
                    allDir={allDir}
                    fixedDir={fixedDir}
                    postDir={postDir}
                  />
                ),
              )}
            </CookieWrap>
          )}
        </>
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

const CookieMobileWrap = styled.section`
  width: 100%;
  padding: 0 20px;
`;
