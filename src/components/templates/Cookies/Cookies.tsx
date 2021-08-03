import styled from "styled-components";
import { CookieData } from "src/lib/interfaces/user";
import Cookie from "@components/organisms/Cookie/Cookie";

export interface IProps {
  data: CookieData[];
}

const Cookies = ({ data }: IProps) => {
  return (
    <CookiesWrap>
      {data.map((cookie) => (
        <Cookie cookie={cookie} key={cookie.id} allDir={[]} />
      ))}
    </CookiesWrap>
  );
};
const CookiesWrap = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 5px 24px;
  /* 1920- */
  grid-template-columns: repeat(5, 30rem);
  /* 1600- 1919*/
  ${({ theme }) => theme.media.desktop_2`
    grid-template-columns: repeat(4, 30rem);
  `}
  /* 1366- 1599*/
  ${({ theme }) => theme.media.desktop_3`
    grid-template-columns: repeat(4, 27rem);
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
export default Cookies;
