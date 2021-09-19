import styled from "styled-components";
import {
  DirectoryDataProps,
  PostDirectoryProps,
} from "src/lib/interfaces/directory";
import Directory from "@components/organisms/Directory";
import { Empty } from "@components/organisms";
import { EmptyImg } from "@assets/imgs/common";
import { PlusIcon } from "@assets/icons/common";
import { Btn } from "@components/atoms";
import { Dispatch, SetStateAction } from "react";

export interface DirectoriesProps {
  data: DirectoryDataProps[];
  /** 검색 디렉토리 여부 */
  isSearched?: boolean;
  /** 디렉토리 생성 모달 오픈 여부 */
  setIsDirAddOpen?: Dispatch<SetStateAction<boolean>>;
  /** delete dir */
  handleDelDirectory: (id: number) => void;
  /** update dir */
  handleUpdateDirectory: (id: number, data: PostDirectoryProps) => void;
}

const Directories = ({
  data,
  isSearched = false,
  setIsDirAddOpen,
  handleDelDirectory,
  handleUpdateDirectory,
}: DirectoriesProps) => {
  return (
    <>
      {data.length !== 0 ? (
        <DirectoiresWrap>
          {data.map((dir) => (
            <Directory
              key={dir.id}
              dir={dir}
              handleDelDirectory={handleDelDirectory}
              handleUpdateDirectory={handleUpdateDirectory}
            />
          ))}
        </DirectoiresWrap>
      ) : (
        <>
          {isSearched ? (
            <Empty
              img={EmptyImg}
              imgWidth={170}
              text="검색된 디렉토리가 없어요!"
            />
          ) : (
            <StyledEmpty
              className="empty"
              img={EmptyImg}
              imgWidth={170}
              text="새 디렉토리를 만들어볼까요?"
              Btn={
                <Btn
                  className="empty__button--dir"
                  isOrange
                  isAtvBtn
                  onClick={() => setIsDirAddOpen && setIsDirAddOpen(true)}
                  role="link"
                >
                  <PlusIcon className="plus-icon" />새 디렉토리 만들기
                </Btn>
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default Directories;

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

const StyledEmpty = styled(Empty)`
  .empty__button--dir {
    width: 259px;
    height: 58px;
    border-radius: 29px;
    font-size: 18px;
    .plus-icon {
      width: 17px;
      height: 17px;
      margin-right: 8px;
    }
  }
`;
