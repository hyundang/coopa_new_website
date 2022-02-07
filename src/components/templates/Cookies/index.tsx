// assets
import { CookieIcon } from "@assets/icons/common";
import { EmptyImg } from "@assets/imgs/error";
// components
import { Btn } from "@components/atoms";
import {
  Cookie,
  CookieMobile,
  CookieTablet,
  Empty,
} from "@components/organisms";
// hooks
import { useWindowSize } from "src/hooks";
// interfaces
import { CookieDataProps, SimpleDirDataProps } from "@interfaces/cookie";
import { DirDataProps, CreateDirProps } from "@interfaces/directory";
// libs
import styled from "styled-components";
import React, {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
// modules
import CookieModule from "@modules/CookieModule";
import { SkeletonCookie } from "@components/molecules";

export interface CookiesProps extends HTMLAttributes<HTMLDivElement> {
  /** cookie type */
  type?: "normal" | "searched" | "dirDetail" | "dirShare";
  /** pinned cookie data */
  pinnedCookieList: CookieDataProps[];
  /** unpinned cookie data */
  unpinnedCookieList: CookieDataProps[];
  dirInfo?: SimpleDirDataProps;
  /** cookie data loading */
  isLoading: boolean;
  /** 쿠키 모듈 */
  cookieModule: ReturnType<typeof CookieModule>;
  /** 일반 디렉토리 */
  unpinnedDir: DirDataProps[];
  /** 고정 디렉토리 */
  pinnedDir: DirDataProps[];
  /** 온보딩 모달 오픈 */
  setIsOnboardOpen?: Dispatch<SetStateAction<boolean>>;
  /** add dir */
  createDir?: (body: CreateDirProps) => Promise<number>;
}

const Cookies = ({
  className,
  type = "normal",
  pinnedCookieList,
  unpinnedCookieList,
  dirInfo,
  isLoading,
  cookieModule,
  unpinnedDir,
  pinnedDir,
  setIsOnboardOpen,
  createDir,
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
          !cookieModule.isUpdateLoading &&
            cookieModule.unpinnedPageIndex &&
            cookieModule.unpinnedPageIndex !== null &&
            cookieModule.setUnpinnedPageIndex(
              cookieModule.unpinnedPageIndex + 1,
            );
        }
      });
    };
    const io = new IntersectionObserver(handleIntersection, option);
    if (target) io.observe(target);

    return () => io && io.disconnect();
  }, [target]);

  return (
    <Container className={className}>
      {pinnedCookieList.length !== 0 || unpinnedCookieList.length !== 0 ? (
        <>
          {size.width ? (
            <CookieWrap className="cookie-mobile-wrap">
              {size.width && size.width < 600 ? (
                <>
                  {pinnedCookieList.map((cookie) => (
                    <CookieMobile
                      key={cookie.id}
                      type={type}
                      cookieData={cookie}
                      cookieModule={cookieModule}
                    />
                  ))}
                  {unpinnedCookieList.map((cookie, idx) => (
                    <CookieMobile
                      key={cookie.id}
                      type={type}
                      cookieData={
                        dirInfo
                          ? {
                              ...cookie,
                              directoryInfo: dirInfo,
                            }
                          : cookie
                      }
                      cookieModule={cookieModule}
                      ref={
                        idx === unpinnedCookieList.length - 1
                          ? (e: HTMLElement | null) =>
                              e !== null && setTarget(e)
                          : undefined
                      }
                    />
                  ))}
                </>
              ) : size.width && size.width < 1024 ? (
                <>
                  {pinnedCookieList.map((cookie) => (
                    <CookieTablet
                      key={cookie.id}
                      type={type}
                      cookieData={cookie}
                      cookieModule={cookieModule}
                    />
                  ))}
                  {unpinnedCookieList.map((cookie, idx) => (
                    <CookieTablet
                      key={cookie.id}
                      type={type}
                      cookieData={
                        dirInfo
                          ? {
                              ...cookie,
                              directoryInfo: dirInfo,
                            }
                          : cookie
                      }
                      cookieModule={cookieModule}
                      ref={
                        idx === unpinnedCookieList.length - 1
                          ? (e: HTMLElement | null) =>
                              e !== null && setTarget(e)
                          : undefined
                      }
                    />
                  ))}
                </>
              ) : (
                <>
                  {pinnedCookieList.map((cookie) => (
                    <Cookie
                      key={cookie.id}
                      type={type}
                      cookieData={cookie}
                      cookieModule={cookieModule}
                      isLoading={isLoading}
                      unpinnedDir={unpinnedDir}
                      pinnedDir={pinnedDir}
                      createDir={createDir}
                    />
                  ))}
                  {unpinnedCookieList.map((cookie, idx) => (
                    <Cookie
                      key={cookie.id}
                      type={type}
                      cookieData={
                        dirInfo
                          ? {
                              ...cookie,
                              directoryInfo: dirInfo,
                            }
                          : cookie
                      }
                      isLoading={isLoading}
                      cookieModule={cookieModule}
                      unpinnedDir={unpinnedDir}
                      pinnedDir={pinnedDir}
                      createDir={createDir}
                      ref={
                        idx === unpinnedCookieList.length - 1
                          ? (e: HTMLElement | null) =>
                              e !== null && setTarget(e)
                          : undefined
                      }
                    />
                  ))}
                </>
              )}
            </CookieWrap>
          ) : (
            <CookieWrap className="cookie-mobile-wrap">
              {pinnedCookieList.map((cookieData) => (
                <SkeletonCookie key={cookieData.id} />
              ))}
              {unpinnedCookieList.map((cookieData) => (
                <SkeletonCookie key={cookieData.id} />
              ))}
            </CookieWrap>
          )}
        </>
      ) : (
        <>
          {isLoading === true || cookieModule.isUpdateLoading ? (
            <div style={{ height: "334px" }} />
          ) : type === "dirDetail" ? (
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
    </Container>
  );
};

export default Cookies;

const Container = styled.div`
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
    display: block;
    width: 100%;
    padding: 0 20px;
  `}
`;
