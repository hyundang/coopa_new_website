import styled from "styled-components";
import { DirectoryData } from "src/lib/interfaces/directory";
import Directory from "@components/organisms/Directory";

export interface DirectoriesProps {
  data: DirectoryData[];
}

const Directories = ({ data }: DirectoriesProps) => {
  return (
    <DirectoiresWrap>
      {data.map((dir) => (
        <Directory key={dir.id} dir={dir} />
      ))}
    </DirectoiresWrap>
  );
};
const DirectoiresWrap = styled.section`
  display: grid;
  justify-content: center;
  grid-gap: 24px;
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
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
  `}
`;
export default Directories;
