import { DeleteIcon, PinAtvIconGray, PinIconGray } from "@assets/icons/card";
import { EditIcon, LinkIcon32 } from "@assets/icons/common";
import { Icon } from "@components/atoms";
import { CookieDataProps } from "@interfaces/cookie";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";
import React from "react";

export interface CookieContentProps {
  className?: string;
  type: "normal" | "searched" | "dirDetail" | "dirShare";
  cookieData: CookieDataProps;
  onClickPinIcon: () => void;
  onClickEditIcon: () => void;
  onClickShareIcon: () => void;
  onClickDelIcon: () => void;
}
const CookieContent = ({
  className,
  type,
  cookieData,
  onClickPinIcon,
  onClickEditIcon,
  onClickShareIcon,
  onClickDelIcon,
}: CookieContentProps) => {
  return (
    <ContentWrap className={className}>
      <h1 className="title">{cookieData.title}</h1>
      <p className="desc">{cookieData.content}</p>
      <div style={{ flexGrow: 1 }} />
      <div className="profile">
        <cite className="profile__site">{cookieData.provider}</cite>
        <div style={{ flexGrow: 1 }} />
        {type !== "dirShare" && (
          <IconWrap>
            <Icon className="icon" onClick={onClickPinIcon}>
              {cookieData.isPinned ? (
                <PinAtvIconGray className="icon__pin" />
              ) : (
                <PinIconGray className="icon__pin" />
              )}
            </Icon>
            <Icon className="icon" onClick={onClickEditIcon}>
              <EditIcon className="icon__asset" />
            </Icon>
            <CopyToClipboard text={cookieData.link} onCopy={onClickShareIcon}>
              <Icon className="icon">
                <LinkIcon32 className="icon__asset--link" />
              </Icon>
            </CopyToClipboard>
            <Icon className="icon" onClick={onClickDelIcon}>
              <DeleteIcon className="icon__asset" />
            </Icon>
          </IconWrap>
        )}
      </div>
    </ContentWrap>
  );
};

export default CookieContent;

const ContentWrap = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .title {
    all: unset;
    color: var(--black_1);
    line-height: 25px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 6px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap: normal;
    word-break: break-all;
  }

  .desc {
    all: unset;
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
    line-height: normal;
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
  }
`;

const IconWrap = styled.div`
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
`;
