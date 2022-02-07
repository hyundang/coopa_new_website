// assets
import { EmptyImg } from "@assets/imgs/error";
import { PlusIcon } from "@assets/icons/common";
// components
import { Empty, Directory, DirectoryModal } from "@components/organisms";
import { Btn } from "@components/atoms";
// interfaces
import { DirDataProps } from "@interfaces/directory";
// libs
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
// modules
import { DirModule } from "@modules/index";

export interface DirectoriesProps {
  isLoading: boolean;
  unpinnedData: DirDataProps[];
  pinnedData?: DirDataProps[];
  isSearched?: boolean;
  isDirAddOpen?: boolean;
  setIsDirAddOpen?: Dispatch<SetStateAction<boolean>>;
  dirModule: ReturnType<typeof DirModule>;
  refreshCookie: () => Promise<void>;
}

const Directories = ({
  isLoading,
  unpinnedData,
  pinnedData,
  isSearched = false,
  isDirAddOpen = false,
  setIsDirAddOpen = () => {},
  dirModule,
  refreshCookie,
}: DirectoriesProps) => {
  return (
    <>
      {unpinnedData.length !== 0 || pinnedData?.length !== 0 ? (
        <DirectoiresWrap>
          {pinnedData?.map((dir) => (
            <Directory
              key={dir.id}
              dir={dir}
              dirModule={dirModule}
              refreshCookie={refreshCookie}
            />
          ))}
          {unpinnedData.map((dir) => (
            <Directory
              key={dir.id}
              dir={dir}
              isSearched={isSearched}
              dirModule={dirModule}
              refreshCookie={refreshCookie}
            />
          ))}
        </DirectoiresWrap>
      ) : (
        <>
          {isLoading === true ? (
            <div style={{ height: "120px" }} />
          ) : isSearched ? (
            <Empty
              img={EmptyImg}
              imgWidth={170}
              text="검색된 디렉토리가 없어요!"
            />
          ) : (
            <>
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
                  >
                    <PlusIcon className="plus-icon" />새 디렉토리 만들기
                  </Btn>
                }
              />
              <DirectoryModal
                isOpen={isDirAddOpen}
                setIsOpen={setIsDirAddOpen}
                type="new"
                createDir={dirModule.createDir}
              />
            </>
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
    padding: 0 20px;
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
