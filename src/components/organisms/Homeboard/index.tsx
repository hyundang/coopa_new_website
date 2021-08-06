import { SettingIcon } from "@assets/icons/homeboard";
import { DuribunLImg, DuribunRImg, SearchImg } from "@assets/imgs/homeboard";
import { Icon, SearchBar } from "@components/atoms";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HomeboardEditModal, Bookmark } from "@components/organisms";
import { useWindowSize } from "src/hooks";
import { BookmarkDataProps } from "@interfaces/homeboard";
import { NewBookmarkProps } from "../BookmarkAddModal";

export interface HomeboardProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 검색창 visible 여부 */
  visible: boolean;
  /** 검색창 visible 여부 setState */
  setVisible: Dispatch<SetStateAction<boolean>>;
  /** 검색 여부 */
  isSearched: boolean;
  /** 검색 여부 setState */
  setIsSearched: Dispatch<SetStateAction<boolean>>;
  /** homeboard modal img */
  homeboardModalImg: string;
  /** homeboard modal img setState */
  setHomeboardModalImg: Dispatch<SetStateAction<string>>;
  /** homeboard img setState */
  setHomeboardImg: Dispatch<SetStateAction<string>>;
  /** homeboard img post 함수 */
  postHomeboardImg: (e: File) => string;
  /** bookmark data list */
  bookmarkDatas: BookmarkDataProps[];
  /** bookmark 추가 함수 */
  onClickBookmarkSave: (newBookmark: NewBookmarkProps) => void;
  /** bookmark 삭제 함수 */
  onClickBookmarkDel: (bookmarkID: number) => void;
}
const Homeboard = ({
  id,
  className,
  visible,
  setVisible,
  isSearched,
  setIsSearched,
  homeboardModalImg,
  setHomeboardModalImg,
  setHomeboardImg,
  postHomeboardImg,
  bookmarkDatas,
  onClickBookmarkDel,
  onClickBookmarkSave,
}: HomeboardProps) => {
  // homeboard edit modal open 여부
  const [isOpen, setIsOpen] = useState(false);
  // homeboard edit modal x좌표
  const [locationX, setLocationX] = useState(0);
  const windowSize = useWindowSize();
  const settingIconLocation = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    settingIconLocation.current &&
      setLocationX(settingIconLocation.current.getBoundingClientRect().x);
  }, [windowSize.width]);

  return (
    <HomeboardWrap id={id} className={className}>
      <div className="inner-wrap">
        {!visible && <DuribunLImg role="img" className="duribun-left" />}
        {!visible && <DuribunRImg role="img" className="duribun-right" />}
        {visible && <SearchImg role="img" className="duribun-search" />}
        {!visible && (
          <Icon
            className="setting"
            ref={settingIconLocation}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <SettingIcon className="setting__icon" />
          </Icon>
        )}
        <SearchBar
          className="search"
          visible={visible}
          setVisible={setVisible}
          isSearched={isSearched}
          setIsSearched={setIsSearched}
        />
        {!visible && (
          <Bookmark
            className="bookmark"
            datas={bookmarkDatas}
            onClickSave={onClickBookmarkSave}
            onClickDel={onClickBookmarkDel}
          />
        )}
      </div>
      <HomeboardEditModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        value={homeboardModalImg}
        setValue={setHomeboardModalImg}
        setHomeboardImg={setHomeboardImg}
        postHomeboardImg={postHomeboardImg}
        locationX={locationX - 518 + 36}
      />
    </HomeboardWrap>
  );
};

export default Homeboard;

const HomeboardWrap = styled.section`
  width: 100%;
  height: 210px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.tablet`
    display: none;
  `}

  .inner-wrap {
    position: relative;
    width: 1596px;
    height: 100%;

    .duribun-left {
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: 284px;
      height: 168px;
    }
    .duribun-right {
      position: absolute;
      z-index: 1;
      right: 0;
      bottom: -2px;
      width: 320px;
      height: 143px;
    }
    .duribun-search {
      position: absolute;
      z-index: 3;
      bottom: 0;
      width: 200px;
      height: 168px;
    }

    .setting {
      position: absolute;
      z-index: 2;
      top: 18px;
      right: 0;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background: rgba(243, 243, 243, 0.5);
      &:hover {
        top: 17px;
        right: -1px;
        width: 42px;
        height: 42px;
        border-radius: 21px;
        background: rgba(85, 83, 82, 0.35);
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
    }

    .search {
      position: absolute;
      z-index: 2;
      top: 67px;
      left: 50%;
      transform: translateX(-50%);
    }

    .bookmark {
      position: absolute;
      z-index: 3;
      left: 50%;
      top: 73px;
      transform: translateX(-50%);
    }

    ${({ theme }) => theme.media.desktop_2`
      width: 1272px;
      .duribun-search {
        width: 180px;
        height: 152px;
      }
    `};
    ${({ theme }) => theme.media.desktop_3`
      width: 1152px;
      .duribun-left {
        width: 300px;
        height: 178px;
      }
      .duribun-right {
        width: 295px;
        height: 131px;
      }
      .duribun-search {
        width: 168px;
        height: 142px;
      }
    `};
    ${({ theme }) => theme.media.desktop_4`
        width: 858px;
        .duribun-search {
            display: none;
        }
    `};
  }
`;
