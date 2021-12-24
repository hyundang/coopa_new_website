import styled from "styled-components";
import {
  useState,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  RefObject,
  forwardRef,
} from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { DeleteIcon } from "@assets/icons/card";
import { CookieDataProps } from "src/lib/interfaces/cookie";
import { Icon } from "@components/atoms";
import { EditIcon, LinkIcon32 } from "@assets/icons/common";
import { CookieEditModal, DelModal } from "@components/organisms";
import { PatchCookieProps } from "@interfaces/cookie";
import { NoThumbImg } from "@assets/imgs/card";

export interface CookieMobileProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** cookie */
  cookie: CookieDataProps;
  /** share cookie */
  isShared?: boolean;
  /** 쿠키 수정 로딩 여부 */
  isLoading: boolean;
  /** 쿠키 수정or삭제 에러 여부 */
  setIsError: Dispatch<SetStateAction<boolean>>;
  /** copy cookie link */
  copyCookieLink: () => void;
  /** del cookie handler */
  delCookieHandler: (id: number) => Promise<void>;
  /** edit cookie handler */
  handleEditCookie: (data: FormData) => Promise<void>;
  /** add cookie count*/
  handleAddCookieCount: (id: number) => Promise<void>;
}
const CookieMobile = (
  {
    id,
    className,
    cookie,
    isShared = false,
    isLoading,
    setIsError,
    copyCookieLink,
    delCookieHandler,
    handleEditCookie,
    handleAddCookieCount,
  }: CookieMobileProps,
  ref?:
    | ((instance: HTMLButtonElement | null) => void)
    | RefObject<HTMLButtonElement>
    | null
    | undefined,
) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  const [cookieValue, setCookieValue] = useState<PatchCookieProps>({
    title: cookie.title,
    content: cookie.content,
    cookieId: cookie.id,
    thumbnail: cookie.thumbnail,
  });

  return (
    <>
      <CookieWrap
        id={id}
        className={className}
        onClick={() => {
          handleAddCookieCount(cookie.id);
          window.open(cookie.link);
        }}
        ref={ref}
      >
        <div className="thumbnail-wrap">
          <img
            alt="cookie-thumbnail"
            className="thumbnail"
            src={cookie.thumbnail}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src = NoThumbImg)
            }
          />
        </div>
        <section className="content">
          <h1 className="title">{cookie.title}</h1>
          <p className="desc">{cookie.content}</p>
          <div className="profile">
            <cite className="profile__site">{cookie.provider}</cite>
            <div style={{ flexGrow: 1 }} />
            {!isShared && (
              <div className="profile__icon-wrap">
                <Icon className="icon" onClick={() => setIsEditModalOpen(true)}>
                  <EditIcon className="icon__asset" />
                </Icon>
                <CopyToClipboard text={cookie.link} onCopy={copyCookieLink}>
                  <Icon className="icon">
                    <LinkIcon32 className="icon__asset--link" />
                  </Icon>
                </CopyToClipboard>
                <Icon className="icon" onClick={() => setIsDelModalOpen(true)}>
                  <DeleteIcon className="icon__asset" />
                </Icon>
              </div>
            )}
          </div>
        </section>
      </CookieWrap>
      <CookieEditModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        value={cookieValue}
        setValue={setCookieValue}
        // onClickDel={() => {}}
        // onClickSave={() => { }}
        handleEditCookie={handleEditCookie}
        onClickDel={() => {
          setIsEditModalOpen(false);
          setIsDelModalOpen(true);
        }}
        setIsError={setIsError}
        isLoading={isLoading}
      />
      <DelModal
        isOpen={isDelModalOpen}
        setIsOpen={setIsDelModalOpen}
        onClickDel={() => delCookieHandler(cookie.id)}
      />
    </>
  );
};

const CookieWrap = styled.article`
  cursor: pointer;
  position: relative;
  width: 100%;
  padding: 28px 0;
  border-bottom: 1px solid var(--gray_3);
  display: flex;
  flex-direction: row;

  .thumbnail-wrap {
    width: 108px;
    height: 72px;
    margin-right: 18px;
    .thumbnail {
      width: 108px;
      height: 72px;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .title {
      all: unset;
      color: var(--black_1);
      line-height: 25px;
      font-size: 16px;
      font-weight: 500;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: normal;
      word-break: break-all;
    }

    .desc {
      all: unset;
      margin-top: 6px;
      font-weight: 400;
      line-height: 22px;
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: normal;
      word-break: break-all;
      color: var(--gray_5);
    }

    .profile {
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &__site {
        all: unset;
        font-size: 13px;
        color: var(--gray_5);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        word-wrap: normal;
        word-break: break-all;
      }
      &__icon-wrap {
        display: flex;
        flex-direction: row;
        .icon {
          width: 36px;
          height: 32px;
          &__asset {
            path {
              fill: var(--gray_5);
            }
          }
          &__asset--link {
            path {
              stroke: var(--gray_5);
            }
          }
        }
      }
    }
  }
`;

export default forwardRef(CookieMobile);
