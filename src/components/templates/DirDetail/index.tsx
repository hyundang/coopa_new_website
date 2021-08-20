import styled from "styled-components";
import { Header } from "@components/organisms";
import { EmptyCookieIcon, FilterIcon } from "@assets/icons/common";
import Cookies from "@components/templates/Cookies";
import { CookieDataProps } from "@interfaces/cookie";

export interface DirDetailProps {
  /** 공유 디렉토리 여부 */
  isShared?: boolean;
  /** cookie data */
  cookies: CookieDataProps[];
}
const DirDetail = ({ isShared = false, cookies }: DirDetailProps) => {
  return (
    <>
      <Header
        className="header"
        imgUrl="https://lh4.googleusercontent.com/-8Sj3uh-4Tvc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm1v42OfrKMBeMcncTbD27GToGVqA/s96-c/photo.jpg"
        isMypage
      />
      <DirDetailCntnr>
        <Title>
          <p className="name">playlist</p>
          <p className="info">
            <EmptyCookieIcon className="cookie-icon" />
            8개
          </p>
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
        <Cookies isShared={isShared} data={cookies} />
      </DirDetailCntnr>
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

const Title = styled.section`
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  .name {
    margin: 0;

    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;

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

const Middle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User = styled.article`
  margin-bottom: 30px;

  display: flex;
  gap: 10px;
  & > img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  & > p {
    margin: 0;

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;

    color: var(--black_1);
  }
`;
