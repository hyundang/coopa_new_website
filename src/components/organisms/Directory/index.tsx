import styled, { css } from "styled-components";
import { EmptyCookieIcon, EditIcon } from "@assets/icons/common";
import {
  DirectoryDataProps,
  PostDirectoryProps,
} from "src/lib/interfaces/directory";
import { Icon } from "@components/atoms";
import { useState } from "react";
import { DelModal, DirectoryModal } from "..";

export interface DirectoryProps {
  dir: DirectoryDataProps;
}
const Directory = ({ dir }: DirectoryProps) => {
  const [postData, setPostData] = useState<PostDirectoryProps>({
    name: "",
    emoji: "",
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setISDeleteOpen] = useState(false);
  return (
    <>
      <DirectoryWrap thumbnail={dir.thumbnail}>
        <div className="content">
          <div className="content__title">
            {dir.emoji ? `${dir.emoji} ${dir.name}` : dir.name}
          </div>
          <div className="content__num">
            <EmptyCookieIcon className="cookie-icon" />
            <span>{dir.cookieCnt}개</span>
          </div>
        </div>
        <div className="icon">
          <Icon onClick={() => setIsEditOpen(true)}>
            <EditIcon />
          </Icon>
        </div>
      </DirectoryWrap>
      <DirectoryModal
        type="edit"
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        value={postData}
        setValue={setPostData}
        postDir={() => {}}
        putDir={() => {}}
        delDir={() => {
          setISDeleteOpen(true);
          setIsEditOpen(false);
        }}
      />
      <DelModal
        type="directory"
        isOpen={isDeleteOpen}
        setIsOpen={setISDeleteOpen}
        onClickDel={() => {}}
      />
    </>
  );
};

export default Directory;

export interface DirectoryWrapProps {
  thumbnail?: string;
}

const DirectoryWrap = styled.article<DirectoryWrapProps>`
  cursor: pointer;

  position: relative;
  z-index: 1;

  width: 100%;
  height: 134px;
  ${({ theme }) => theme.media.desktop_3`
    height: 120px;
  `}
  ${({ theme }) => theme.media.mobile`
    height: 73px;
  `}
  background-color: var(--gray_1);
  border-radius: 12px;
  color: var(--black_2);

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.2s;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
    .icon {
      display: block;
    }
    .content > * {
      color: var(--white);
    }
    .content {
      &__num {
        .cookie-icon {
          path {
            fill: var(--white);
          }
        }
      }
    }
  }
  ${(props) =>
    props.thumbnail &&
    css`
      ::after {
        content: "";
        display: block;
        position: absolute;
        border-radius: 12px;
        top: 0;
        left: 0;
        background: url(${props.thumbnail}) center center / cover no-repeat;
        width: 100%;
        height: 100%;
        opacity: 0.15;
        z-index: -1;
      }
    `}
  .content {
    position: absolute;
    top: 46px;
    ${({ theme }) => theme.media.desktop_3`
      top: 40px;
    `}
    ${({ theme }) => theme.media.mobile`
      top: 20px;
    `}

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    &__title {
      max-width: 254px;
      height: 19px;
      line-height: 19px;

      font-size: 17px;
      font-weight: 500;
      color: var(--black_2);

      display: inline-block;
      align-items: center;
      gap: 6px;

      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      ${({ theme }) => theme.media.desktop_3`
        max-width: 225px;
        font-size: 16px;
      `}
      ${({ theme }) => theme.media.mobile`
        max-width: 136px;
        font-size: 13px;
        height: 16px;
        line-height: 16px;
      `}
    }
    &__num {
      font-size: 15px;
      font-weight: 500;

      display: flex;
      align-items: center;
      gap: 6px;

      color: var(--gray_7);

      ${({ theme }) => theme.media.desktop_3`
        font-size: 14px;
      `}
      ${({ theme }) => theme.media.mobile`
        font-size: 11px;
        gap: 4px;
      `}

      .cookie-icon {
        ${({ theme }) => theme.media.mobile`
          width: 11px;
        `}
        path {
          fill: var(--gray_7_active);
        }
      }
    }
    .cookie-icon {
      path {
        fill: var(--gray_7_active);
      }
    }
  }
  .icon {
    position: absolute;
    bottom: 1.7rem;
    right: 1.7rem;

    display: none;
  }
`;
