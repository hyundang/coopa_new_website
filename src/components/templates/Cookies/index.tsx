import styled from "styled-components";
import { CookieDataProps } from "src/lib/interfaces/cookie";
import { Btn } from "@components/atoms";
import { Cookie, ListHeader } from "@components/organisms";
import {
  EmptyCookieIcon,
  FilterIcon,
  EditIcon,
  LinkIcon,
} from "@assets/icons/common";
import React from "react";

export interface IProps {
  /** cookie data */
  data: CookieDataProps[];
  /** 어떤 페이지에 들어가는 cookies인지 */
  type: "cookie" | "dir" | "dirDetail" | "dirShare";
  /** 공유 버튼 눌렀을 때 함수 */
  shareClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 수정 버튼 눌렀을 때 함수 */
  editClick?: React.MouseEventHandler;
}

const Cookies = ({ data, type, shareClick, editClick }: IProps) => {
  return (
    <CookiesCntnr>
      <ShareCntnr>
        <Title>
          <p className="name">
            playlist
            {type !== "dirShare" && (
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
          {type !== "dirShare" && (
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
        type={type}
        imgUrl="https://lh4.googleusercontent.com/-8Sj3uh-4Tvc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm1v42OfrKMBeMcncTbD27GToGVqA/s96-c/photo.jpg"
        nickname="test"
        filterType="latest"
        onClickType={() => {}}
        postDir={() => {}}
      />
      <CookieWrap>
        {data.map((cookie) => (
          <Cookie
            cookie={cookie}
            key={cookie.id}
            allDir={[]}
            isShared={type === "dirShare"}
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
