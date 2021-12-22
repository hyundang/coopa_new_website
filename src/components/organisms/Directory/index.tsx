import styled, { css } from "styled-components";
import { EmptyCookieIcon, EditIcon } from "@assets/icons/common";
import { PinAtvIcon, PinIcon } from "@assets/icons/card";
import { PinImg } from "@assets/imgs/card";
import {
  DirectoryDataProps,
  PostDirectoryProps,
} from "src/lib/interfaces/directory";
import { Icon } from "@components/atoms";
import { useState } from "react";
import { DelModal, DirectoryModal } from "..";

export interface DirectoryProps {
  dir: DirectoryDataProps;
  handleDelDirectory: (id: number) => Promise<void>;
  handleUpdateDirectory: (
    id: number,
    data: PostDirectoryProps,
  ) => Promise<void>;
  fixDirHandler: (id: number, isPinned: boolean) => Promise<void>;
}
const Directory = ({
  dir,
  handleDelDirectory,
  handleUpdateDirectory,
  fixDirHandler,
}: DirectoryProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setISDeleteOpen] = useState(false);

  // dir 고정 여부
  const [isDirFixed, setIsDirFixed] = useState(dir.isPinned);

  return (
    <>
      <DirectoryWrap
        thumbnail={dir.thumbnail}
        onClick={() => window.open(`${DOMAIN}/directory/${dir.id}`, "_self")}
      >
        {isDirFixed && <StyledPinImg className="pin_img" />}
        <section className="content">
          <h1 className="content__title">
            {dir.emoji ? `${dir.emoji} ${dir.name}` : dir.name}
          </h1>
          <div className="content__num">
            <EmptyCookieIcon className="cookie-icon" />
            <span>{dir.cookieCnt}개</span>
          </div>
        </section>
        <div className="icon">
          <Icon
            className="hover_icon"
            onClick={() => {
              fixDirHandler(dir.id, !isDirFixed);
              setIsDirFixed(!isDirFixed);
            }}
          >
            {isDirFixed ? <PinAtvIcon /> : <PinIcon />}
          </Icon>
          <Icon className="hover_icon" onClick={() => setIsEditOpen(true)}>
            <EditIcon />
          </Icon>
        </div>
      </DirectoryWrap>
      <DirectoryModal
        type="edit"
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        postDir={() => {}}
        putDir={handleUpdateDirectory}
        delDir={() => {
          setISDeleteOpen(true);
          setIsEditOpen(false);
        }}
        initValue={{
          emoji: dir.emoji,
          name: dir.name,
        }}
        dirId={dir.id}
      />
      <DelModal
        type="directory"
        isOpen={isDeleteOpen}
        setIsOpen={setISDeleteOpen}
        onClickDel={() => handleDelDirectory(dir.id)}
      />
    </>
  );
};

export default Directory;

const StyledPinImg = styled(PinImg)`
  position: absolute;
  z-index: 2;
  top: -5px;
  left: 24px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
`;

export interface DirectoryWrapProps {
  thumbnail?: string;
}
const DirectoryWrap = styled.article<DirectoryWrapProps>`
  cursor: pointer;

  position: relative;
  z-index: 1;

  width: 100%;
  height: 134px;

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
      display: flex;
      flex-direction: row;
      .hover_icon {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: transparent;
        -webkit-filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.9));
        &:hover {
          background-color: rgba(243, 243, 243, 0.4);
          -webkit-filter: none;
        }
      }
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
        background: url("${props.thumbnail}") center center / cover no-repeat;
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
      all: unset;
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
    bottom: 1.3rem;
    right: 1.3rem;

    display: none;
  }

  ${({ theme }) => theme.media.desktop_3`
    height: 120px;
  `}
  ${({ theme }) => theme.media.mobile`
    height: 73px;
    &:hover {
      .icon {
        display: none;
      }
    }
  `}
`;
