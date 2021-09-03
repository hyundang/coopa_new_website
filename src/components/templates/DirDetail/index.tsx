import styled from "styled-components";
import { DirectoryModal, Header, ListHeader } from "@components/organisms";
import { EditIcon, EmptyCookieIcon, LinkIcon } from "@assets/icons/common";
import Cookies from "@components/templates/Cookies";
import { CookieDataProps } from "@interfaces/cookie";
import { Btn } from "@components/atoms";
import { PostDirectoryProps } from "@interfaces/directory";
import { useState } from "react";

export interface DirDetailProps {
  /** 공유 디렉토리 여부 */
  isShared?: boolean;
  /** profile img */
  imgUrl?: string;
  /** profile nickname */
  nickname: string;
  /** cookie data */
  cookies: CookieDataProps[];
  /** 공유 버튼 눌렀을 때 함수 */
  shareClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 수정 버튼 눌렀을 때 함수 */
  editClick?: React.MouseEventHandler;
}
const DirDetail = ({
  isShared = false,
  imgUrl,
  nickname,
  cookies,
  shareClick,
  editClick,
}: DirDetailProps) => {
  // 디렉토리 생성 모달 오픈
  const [isDirAddOpen, setIsDirAddOpen] = useState(false);
  const [newDirData, setNewDirData] = useState<PostDirectoryProps>({
    emoji: "",
    name: "",
  });
  // 온보딩 모달 오픈
  const [isOnboardOpen, setIsOnboardOpen] = useState(false);

  return (
    <>
      <Header
        className="header"
        imgUrl={imgUrl}
        isErrorpage
        isOnboardOpen={isOnboardOpen}
        setIsOnboardOpen={setIsOnboardOpen}
      />
      <DirDetailCntnr>
        <ShareCntnr>
          <Title>
            <p className="name">
              playlist
              {!isShared && (
                <EditIcon
                  className="edit-icon"
                  onClick={editClick ? (e) => editClick(e) : () => {}}
                />
              )}
            </p>
            <p className="info">
              <EmptyCookieIcon className="cookie-icon" />
              8개
            </p>
            {!isShared && (
              <Btn
                className="share-btn"
                isDirShare
                onClick={shareClick ? (e) => shareClick(e) : () => {}}
              >
                <LinkIcon className="icon" />
                디렉토리 공유하기
              </Btn>
            )}
          </Title>
        </ShareCntnr>
        <ListHeader
          type={isShared ? "dirShare" : "dirDetail"}
          imgUrl={imgUrl}
          nickname={nickname}
          filterType="latest"
          onClickType={() => {}}
          isDirAddOpen={isDirAddOpen}
          setIsDirAddOpen={setIsDirAddOpen}
        />
        <Cookies
          type={isShared ? "dirShare" : "dirDetail"}
          data={cookies}
          allDir={[]}
        />
      </DirDetailCntnr>
      <DirectoryModal
        isOpen={isDirAddOpen}
        setIsOpen={setIsDirAddOpen}
        type="new"
        value={newDirData}
        setValue={setNewDirData}
        postDir={() => {}}
      />
    </>
  );
};

export default DirDetail;

const DirDetailCntnr = styled.div`
  position: absolute;
  margin-top: 60px;
  left: 50%;
  transform: translateX(-50%);

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
    width: 33.4rem;
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

    .edit-icon {
      margin-left: 0.5rem;
      width: 2.2rem;
      height: 2.2rem;
      path {
        fill: var(--black_1);
      }
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
