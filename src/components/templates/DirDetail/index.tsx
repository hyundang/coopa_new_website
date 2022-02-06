// assets
import { EditIcon, EmptyCookieIcon, LinkIcon } from "@assets/icons/common";
// components
import { Btn, Floating, Icon, ToastMsg } from "@components/atoms";
import {
  DirectoryModal,
  Header,
  ListHeader,
  Footer,
  DelModal,
} from "@components/organisms";
import Cookies from "@components/templates/Cookies";
// interfaces
import { CreateDirProps, DirDataProps } from "@interfaces/directory";
// libs
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
// modules
import { ToastMsgState } from "@modules/states";
import DirDetailModule from "@modules/DirDetailModule";
import CookieModule from "@modules/CookieModule";
import { CookieDataProps, SimpleDirDataProps } from "@interfaces/cookie";

export interface DirDetailProps {
  /** 공유 디렉토리 여부 */
  isShared?: boolean;
  /** profile img */
  imgUrl?: string;
  /** profile nickname */
  nickname: string;
  /** 디렉토리 상세 모듈 */
  dirInfo: SimpleDirDataProps;
  dirDetailModule?: ReturnType<typeof DirDetailModule>;
  /** directory data */
  unpinnedDir?: DirDataProps[];
  /** 고정 디렉토리 */
  pinnedDir?: DirDataProps[];
  /** 디렉토리 생성 */
  createDir?: (e: CreateDirProps) => Promise<number>;
  /** 쿠키 상세 모듈 */
  cookieModule: ReturnType<typeof CookieModule>;
  unpinnedCookieList: CookieDataProps[];
}
const DirDetail = ({
  isShared = false,
  imgUrl,
  nickname,
  dirInfo,
  dirDetailModule,
  unpinnedDir,
  pinnedDir,
  createDir,
  cookieModule,
  unpinnedCookieList,
}: DirDetailProps) => {
  // toast msg
  const [isToastMsgVisible, setIsToastMsgVisible] =
    useRecoilState(ToastMsgState);

  // 디렉토리 수정 모달 오픈
  const [isDirEditOpen, setIsDirEditOpen] = useState(false);
  // 디렉토리 수정 데이터
  const [newDirData, setNewDirData] = useState<CreateDirProps>({
    emoji: "",
    name: "",
  });
  // 삭제 모달 오픈
  const [isDelOpen, setIsDelOpen] = useState(false);
  // 온보딩 모달 오픈
  const [isOnboardOpen, setIsOnboardOpen] = useState(false);
  // 쿠키 추가 모달 오픈
  const [isCreateCookieModalOpen, setIsCreateCookieModalOpen] = useState(false);

  // toast msg visible handling
  const handleToastMsgVisible = (
    key:
      | "dirEdit"
      | "cookieDel"
      | "cookieEdit"
      | "imgSizeOver"
      | "copyLink"
      | "copyShareLink"
      | "pinnedSizeOver",
    value: boolean,
  ) =>
    setIsToastMsgVisible({
      ...isToastMsgVisible,
      [key]: value,
    });

  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    (async () => {
      const link = await dirDetailModule?.getShareLink();
      setShareLink(link || "");
    })();
  }, []);

  useEffect(() => {
    setNewDirData({
      emoji: dirInfo?.emoji || "",
      name: dirInfo.name,
    });
  }, [dirInfo]);

  return (
    <>
      <DirDetailCntnr>
        <Header
          className="header"
          imgUrl={imgUrl}
          isOnboardOpen={isOnboardOpen}
          setIsOnboardOpen={setIsOnboardOpen}
          isMypageIconExist={!isShared}
          isSearchIconExist={false}
        />
        <DirDetailWrap>
          <ShareCntnr>
            <Title isEditIconAtv={isDirEditOpen}>
              <p className="name">
                {`${dirInfo?.emoji || ""} ${dirInfo.name}`}
                {!isShared && (
                  <Icon
                    className="edit-btn"
                    onClick={() => setIsDirEditOpen(true)}
                  >
                    <EditIcon className="edit-icon" />
                  </Icon>
                )}
              </p>
              <p className="info">
                <EmptyCookieIcon className="cookie-icon" />
                {dirInfo.cookieCount || 0}개
              </p>
              {!isShared && (
                <CopyToClipboard text={shareLink || ""}>
                  <Btn
                    className="share-btn"
                    isDirShare
                    onClick={() =>
                      setIsToastMsgVisible({
                        ...isToastMsgVisible,
                        copyLink: true,
                      })
                    }
                    isAtvBtn
                  >
                    <LinkIcon className="icon" />
                    디렉토리 공유하기
                  </Btn>
                </CopyToClipboard>
              )}
            </Title>
          </ShareCntnr>
          <StyledListHeader
            type={isShared ? "dirShare" : "dirDetail"}
            imgUrl={imgUrl}
            nickname={nickname}
            cookieNum={
              unpinnedCookieList.length +
              (cookieModule.pinnedCookieData?.length || 0)
            }
            filterType={cookieModule.cookieFilter}
            onClickFilterType={cookieModule.updateAndSaveCookieFilter}
            isCreateCookieModalOpen={isCreateCookieModalOpen}
            setIsCreateCookieModalOpen={setIsCreateCookieModalOpen}
            createCookie={(url) =>
              cookieModule.createCookie(url, true, dirInfo.id)
            }
          />
          <StyledCookies
            type={isShared ? "dirShare" : "dirDetail"}
            pinnedCookieList={cookieModule.pinnedCookieData || []}
            unpinnedCookieList={unpinnedCookieList}
            dirInfo={dirInfo}
            isLoading={cookieModule.isLoading}
            unpinnedDir={unpinnedDir || []}
            pinnedDir={pinnedDir || []}
            createDir={createDir}
            setIsOnboardOpen={setIsOnboardOpen}
            cookieModule={cookieModule}
          />
        </DirDetailWrap>
        <Footer />
      </DirDetailCntnr>
      <DirectoryModal
        isOpen={isDirEditOpen}
        setIsOpen={setIsDirEditOpen}
        type="edit"
        initDirData={newDirData}
        dirId={dirInfo.id}
        updateDir={dirDetailModule?.editDir}
        deleteDir={() => {
          setIsDelOpen(true);
          setIsDirEditOpen(false);
        }}
      />
      <DelModal
        type="directory"
        isOpen={isDelOpen}
        setIsOpen={setIsDelOpen}
        onClickDelBtn={async () => dirDetailModule?.deleteDir()}
      />
      <ToastMsg
        isVisible={isToastMsgVisible.copyShareLink}
        setIsVisible={(e: boolean) => handleToastMsgVisible("copyShareLink", e)}
      >
        👏 공유 링크를 복사했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.copyLink}
        setIsVisible={(e: boolean) => handleToastMsgVisible("copyLink", e)}
      >
        👏🏻 링크를 복사했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.dirEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("dirEdit", e)}
      >
        👀 디렉토리를 수정했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieDel}
        setIsVisible={(e: boolean) => handleToastMsgVisible("cookieDel", e)}
      >
        ❌ 쿠키를 삭제했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.cookieEdit}
        setIsVisible={(e: boolean) => handleToastMsgVisible("cookieEdit", e)}
      >
        🍪 쿠키를 수정했어요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.imgSizeOver}
        setIsVisible={(e: boolean) => handleToastMsgVisible("imgSizeOver", e)}
        imgSizeOver
      >
        😥 더 작은 이미지를 올려주세요!
      </ToastMsg>
      <ToastMsg
        isVisible={isToastMsgVisible.pinnedSizeOver}
        setIsVisible={(e: boolean) =>
          handleToastMsgVisible("pinnedSizeOver", e)
        }
        imgSizeOver
      >
        😥 최대 15개까지 고정 가능해요!
      </ToastMsg>
      <Floating />
    </>
  );
};

export default DirDetail;

const DirDetailCntnr = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DirDetailWrap = styled.div`
  margin-top: 60px;
  padding-top: 48px;
  padding-bottom: 130px;

  width: 1596px;
  ${({ theme }) => theme.media.desktop_2`
    width: 1272px;
  `}
  /* 1366- 1599*/
  ${({ theme }) => theme.media.desktop_3`
    width: 1152px;
  `}  
  /* 1024-1365 */
  ${({ theme }) => theme.media.desktop_4`
    width: 858px;
  `}
  /* 600-1023 */
  ${({ theme }) => theme.media.tablet`
    width: 564px;
  `}
  /* -599 */
   ${({ theme }) => theme.media.mobile`
    width: 100%;
    padding:0 20px;
    padding-top: 36px;
    padding-bottom: 130px;
  `}
`;

const ShareCntnr = styled.div`
  width: 159.6rem;
  ${({ theme }) => theme.media.desktop_2`
    width: 127.2rem;
  `}
  /* 1366- 1599*/
  ${({ theme }) => theme.media.desktop_3`
    width: 115.2rem;
  `}  
  /* 1024-1365 */
  ${({ theme }) => theme.media.desktop_4`
    width: 85.8rem;
  `}
  /* 600-1023 */
  ${({ theme }) => theme.media.tablet`
    width: 56.4rem;
  `}
  /* -599 */
   ${({ theme }) => theme.media.mobile`
    width: 100%;
  `}
`;

const StyledCookies = styled(Cookies)`
  .cookie_mobile_wrap {
    ${({ theme }) => theme.media.mobile`
    padding: 0;
  `}
  }
`;

const StyledListHeader = styled(ListHeader)`
  ${({ theme }) => theme.media.mobile`
    padding: 0;
  `}
`;

interface TitleProps {
  isEditIconAtv: boolean;
}
const Title = styled.article<TitleProps>`
  position: relative;
  margin-bottom: 4rem;

  display: flex;
  flex-direction: column;
  .name {
    margin: 0;

    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;

    display: flex;
    align-items: center;

    color: var(--black_2);

    .edit-btn {
      width: 44px;
      height: 44px;
      margin-left: 5px;
      border-radius: 22px;
      .edit-icon {
        width: 28px;
        height: 28px;
        path {
          fill: var(--black_1);
        }
      }
      ${({ isEditIconAtv }) =>
        isEditIconAtv
          ? css`
              background-color: var(--gray_active);
              .edit-icon {
                path {
                  fill: var(--white);
                }
              }
            `
          : css`
              @media (hover: hover) {
                &:hover {
                  background-color: var(--gray_hover_1);
                }
              }
            `}
    }
  }
  .info {
    margin: 0;

    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 36px;

    color: var(--black_1);

    .cookie-icon {
      margin-right: 6px;
      path {
        fill: var(--gray_7_active);
      }
    }
  }
  .share-btn {
    position: absolute;
    right: 0;
    top: 1.2rem;

    width: 19.1rem;
    height: 5rem;
    border-radius: 25px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    :hover {
      .icon {
        path {
          fill: var(--white);
        }
      }
    }
    .icon {
      width: 1.9rem;
      margin-right: 5px;
      path {
        fill: var(--orange);
      }
    }
  }
`;
