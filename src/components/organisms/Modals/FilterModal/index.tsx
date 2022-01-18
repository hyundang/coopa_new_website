import { CheckIcon } from "@assets/icons/common";
import { modalAnimation } from "@components/animations";
import { MoveModal } from "@components/atoms";
import { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";

const cookieItems = [
  { text: "최신순", type: "latest" },
  { text: "오래된 순", type: "oldest" },
  { text: "많이 읽은 순", type: "readMost" },
  { text: "적게 읽은 순", type: "readLeast" },
];

const dirItems = [
  { text: "최신순", type: "latest" },
  { text: "오래된 순", type: "oldest" },
  { text: "가나다순", type: "abc" },
];

const dirShareItems = [
  { text: "최신순", type: "latest" },
  { text: "오래된 순", type: "oldest" },
];

export interface FilterModalProps {
  id?: string;
  className?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** filter list type */
  type?: "cookie" | "dir" | "dirShare";
  filterType: "latest" | "oldest" | "readMost" | "readLeast" | "abc";
  onClickType: (
    e: "latest" | "oldest" | "readMost" | "readLeast" | "abc",
  ) => void;
}
const NotiModal = ({
  id,
  className,
  isOpen,
  setIsOpen,
  type = "cookie",
  filterType,
  onClickType,
}: FilterModalProps) => {
  return (
    <FilterModalWrap
      id={id}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {type === "cookie"
        ? cookieItems.map((i) => (
            <Item
              key={i.type}
              id={i.type}
              text={i.text}
              isClicked={filterType === i.type}
              onClickType={onClickType}
            />
          ))
        : type === "dir"
        ? dirItems.map((i) => (
            <Item
              key={i.type}
              id={i.type}
              text={i.text}
              isClicked={filterType === i.type}
              onClickType={onClickType}
            />
          ))
        : dirShareItems.map((i) => (
            <Item
              key={i.type}
              id={i.type}
              text={i.text}
              isClicked={filterType === i.type}
              onClickType={onClickType}
            />
          ))}
    </FilterModalWrap>
  );
};

export default NotiModal;

const FilterModalWrap = styled(MoveModal)`
  position: fixed;
  z-index: 3;

  width: 140px;
  padding: 10px 9px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.13);
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: 0.4s all;
  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
          animation: ${modalAnimation.notiFadeInRule};
        `
      : css`
          opacity: 0;
          visibility: hidden;
          animation: ${modalAnimation.notiFadeOutRule};
        `}
`;

interface ItemProps {
  id?: string;
  className?: string;
  text: string;
  isClicked: boolean;
  onClickType: (
    e: "latest" | "oldest" | "readMost" | "readLeast" | "abc",
  ) => void;
}
const Item = ({ id, className, text, isClicked, onClickType }: ItemProps) => {
  return (
    <ItemWrap
      id={id}
      className={className}
      onClick={(e: any) => onClickType(e.target.id)}
    >
      {text}
      {isClicked && <CheckIcon className="check-icon" />}
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  width: 100%;
  height: 32px;
  padding: 0 9px;
  border-radius: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-weight: 500;
  font-size: 15px;
  color: var(--black_1);

  &:hover {
    background-color: var(--gray_hover_1);
  }
`;
