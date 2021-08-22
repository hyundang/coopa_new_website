import styled, { css } from "styled-components";
import { FilterIcon, PlusIcon22 } from "@assets/icons/common";
import { Icon } from "@components/atoms";
import { FilterModal } from "@components/molecules";
import { DirectoryModal } from "@components/organisms";
import { useState } from "react";
import { PostDirectoryProps } from "@interfaces/directory";

export interface ListHeaderProps {
  /** list type */
  type: "cookie" | "dir" | "dirDetail" | "dirShare";
  /** profile img */
  imgUrl?: string;
  /** profile nickname */
  nickname: string;
  /** filter type */
  filterType: "latest" | "oldest" | "readMost" | "readLeast" | "abc";
  /** filter type click event handler */
  onClickType: () => void;
  /** post dir */
  postDir: (e: PostDirectoryProps) => void;
}
const ListHeader = ({
  type,
  imgUrl,
  nickname,
  filterType,
  onClickType,
  postDir,
}: ListHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDirAddOpen, setIsDirAddOpen] = useState(false);
  const [newDirData, setNewDirData] = useState<PostDirectoryProps>({
    emoji: "",
    name: "",
  });

  return (
    <>
      <ListHeaderWrap type={type}>
        {(type === "dirDetail" || type === "dirShare") && (
          <User>
            <img alt="profile-img" src={imgUrl} />
            <p>{nickname}</p>
          </User>
        )}
        {type === "cookie" && (
          <div className="nickname">{nickname}님의 파킹랏</div>
        )}
        {type === "dir" && (
          <div className="nickname">{nickname}님의 디렉토리</div>
        )}
        <div className="button-wrap">
          {type === "dir" && (
            <StyledIcon
              className="create"
              onClick={() => setIsDirAddOpen(true)}
              isAtv={isDirAddOpen}
            >
              <PlusIcon22 className="plus-icon" />
            </StyledIcon>
          )}
          <StyledIcon
            className="filter"
            onClick={() => setIsFilterOpen(true)}
            isAtv={isFilterOpen}
          >
            <FilterIcon className="filter-icon" />
          </StyledIcon>
          <FilterModal
            className="filter-modal"
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            type={type === "cookie" ? "cookie" : "dir"}
            filterType={filterType}
            onClickType={onClickType}
          />
        </div>
      </ListHeaderWrap>
      <DirectoryModal
        isOpen={isDirAddOpen}
        setIsOpen={setIsDirAddOpen}
        type="new"
        value={newDirData}
        setValue={setNewDirData}
        postDir={postDir}
      />
    </>
  );
};

export default ListHeader;

interface ListHeaderWrapProps {
  type: "cookie" | "dir" | "dirDetail" | "dirShare" | "abc";
}
const ListHeaderWrap = styled.section<ListHeaderWrapProps>`
  width: 1596px;
  ${({ type }) =>
    type === "cookie" || type === "dir"
      ? css`
          margin-top: 26px;
          margin-bottom: 20px;
        `
      : css`
          margin-bottom: 30px;
        `}
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
   ${({ theme, type }) => theme.media.mobile`
    width: 100%;
  `}

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .nickname {
    font-weight: 700;
    font-size: 22px;
    line-height: 28px;
    color: var(--black_1);
  }

  .button-wrap {
    width: fit-content;
    display: flex;
    flex-direction: row;

    /** 이 부분 수정 필요 */
    .filter-modal {
      margin-right: 140px;
      right: 80px;
      top: 94px;
    }
  }
`;

const User = styled.div`
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

interface StyledIconProps {
  isAtv?: boolean;
}
const StyledIcon = styled(Icon)<StyledIconProps>`
  width: 48px;
  height: 48px;
  border-radius: 24px;

  ${({ isAtv }) =>
    isAtv
      ? css`
          background-color: var(--gray_active);
          .plus-icon {
            rect {
              fill: var(--white);
            }
          }
          .filter-icon {
            rect {
              fill: var(--white);
            }
            circle {
              stroke: var(--white);
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
