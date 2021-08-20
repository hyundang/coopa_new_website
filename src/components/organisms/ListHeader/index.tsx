import styled, { css } from "styled-components";
import { FilterIcon, PlusIcon22 } from "@assets/icons/common";
import { Icon } from "@components/atoms";

export interface ListHeaderProps {
  /** list type */
  type: "cookie" | "dir" | "dirDetail" | "dirShare";
  /** profile img */
  imgUrl?: string;
  /** profile nickname */
  nickname: string;
}
const ListHeader = ({ type, imgUrl, nickname }: ListHeaderProps) => {
  return (
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
          <StyledIcon className="create">
            <PlusIcon22 className="plus-icon" />
          </StyledIcon>
        )}
        <StyledIcon className="filter">
          <FilterIcon className="filter-icon" />
        </StyledIcon>
      </div>
    </ListHeaderWrap>
  );
};

export default ListHeader;

interface ListHeaderWrapProps {
  type: "cookie" | "dir" | "dirDetail" | "dirShare";
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

const StyledIcon = styled(Icon)`
  width: 48px;
  height: 48px;
  border-radius: 24px;

  &:hover {
    background-color: var(--gray_hover_1);
  }
`;
