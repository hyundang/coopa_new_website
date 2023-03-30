// assets
import { EditIcon, EmptyCookieIcon, LinkIcon } from "@assets/icons/common";
// components
import { Btn, Icon, ToastMsg } from "@components/atoms";
import {
  DirectoryModal,
  Header,
  ListHeader,
  Footer,
  DelModal,
} from "@components/organisms";
import Cookies from "@components/templates/Cookies";
// interfaces
import { CookieDataProps } from "@interfaces/cookie";
import {
  CreateDirProps,
  DirDataProps,
  SimpleDirDataProps,
} from "@interfaces/directory";
// libs
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
// modules
import { ToastMsgState } from "@modules/states";
import DirDetailModule from "@modules/DirDetailModule";
import CookieModule from "@modules/CookieModule";
import { ToastMsgs } from "..";

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
  const handleToastMsgVisible = (key: "copyShareLink", value: boolean) =>
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
            <Title>
              <p className="name">
                {`${dirInfo?.emoji || ""} ${dirInfo.name}`}
                {!isShared && (
                  <EditBtn
                    isEditIconAtv={isDirEditOpen}
                    onClick={() => setIsDirEditOpen(true)}
                  >
                    <EditIcon className="edit-icon" />
                  </EditBtn>
                )}
              </p>
              <p className="info">
                <EmptyCookieIcon className="cookie-icon" />
                {dirInfo.cookieCount || 0}개
              </p>
              {!isShared && (
                <CopyToClipboard text={shareLink || ""}>
                  <ShareBtn
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
                  </ShareBtn>
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
      <ToastMsgs />
      {!isShared && (
        <CopyToClipboard text={shareLink || ""}>
          <MobileShareBtn
            isOrange
            onClick={() =>
              setIsToastMsgVisible({
                ...isToastMsgVisible,
                copyLink: true,
              })
            }
            isAtvBtn
          >
            <LinkIcon className="icon" />
          </MobileShareBtn>
        </CopyToClipboard>
      )}
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
  .cookie-mobile-wrap {
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

const Title = styled.article`
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
`;

const ShareBtn = styled(Btn)`
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

  ${({ theme }) => theme.media.mobile`
    display: none;
  `}
`;

const MobileShareBtn = styled(Btn)`
  display: none;
  ${({ theme }) => theme.media.mobile`
    position: fixed;
    right: 20px;
    bottom: 28px;
    z-index: 2;

    width: 48px;
    height: 48px;
    border-radius: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 24px;
      height: 24px;
    }
  `}
`;

interface EditBtnProps {
  isEditIconAtv: boolean;
}
const EditBtn = styled(Icon)<EditBtnProps>`
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
`;
