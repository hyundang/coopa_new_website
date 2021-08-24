import styled from "styled-components";
import { CookieDataProps } from "src/lib/interfaces/cookie";
import { Btn } from "@components/atoms";
import { Cookie } from "@components/organisms";
import {
  EmptyCookieIcon,
  FilterIcon,
  EditIcon,
  LinkIcon,
} from "@assets/icons/common";

export interface IProps {
  data: CookieDataProps[];
  isShared?: boolean;
}

const Cookies = ({ data, isShared }: IProps) => {
  return (
    <CookiesCntnr>
      <ShareCntnr>
        <Title>
          <p className="name">
            playlist
            {!isShared && <EditIcon className="edit-icon" />}
          </p>
          <p className="info">
            <EmptyCookieIcon className="cookie-icon" />
            8개
          </p>
          {!isShared && (
            <Btn className="share-btn" isDirShare onClick={() => {}}>
              <LinkIcon className="icon" />
              디렉토리 공유하기
            </Btn>
          )}
        </Title>
        <Middle>
          <User>
            <img
              alt=""
              src="https://lh4.googleusercontent.com/-8Sj3uh-4Tvc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm1v42OfrKMBeMcncTbD27GToGVqA/s96-c/photo.jpg"
            />
            <p>희수 친구 채린</p>
          </User>
          <FilterIcon />
        </Middle>
      </ShareCntnr>
      <CookieWrap>
        {data.map((cookie) => (
          <Cookie
            cookie={cookie}
            key={cookie.id}
            allDir={[]}
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
  margin-bottom: 5rem;

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
const Middle = styled.div`
  display: flex;
  justify-content: space-between;
`;
const User = styled.article`
  margin-bottom: 3rem;

  display: flex;
  gap: 1rem;
  & > img {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
  }
  & > p {
    margin: 0;

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 2.8rem;

    color: var(--black_1);
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
