import { CookieIcon, PlusIcon } from "@assets/icons/common";
import { imgformAnimation } from "@components/animations";
import { ImgBox } from "@components/atoms";
import styled from "styled-components";
import React, {
  Dispatch,
  SetStateAction,
  LegacyRef,
  HTMLAttributes,
  forwardRef,
  ChangeEventHandler,
} from "react";

export interface ImgBoxFormProps extends HTMLAttributes<HTMLDivElement> {
  /** img box 안에 들어가는 img url */
  imgUrl?: string;
  isHover: boolean;
  setIsHover: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  /** hover시 plus 아이콘 크기 (px) */
  plusSize: number;
  /** 로딩뷰의 cookie 아이콘 크기 (px) */
  cookieSize: number;
  onChangeImg: ChangeEventHandler<HTMLInputElement>;
}

const ImgBoxForm = (
  {
    id,
    className,
    imgUrl,
    isHover,
    setIsHover,
    isLoading,
    plusSize,
    cookieSize,
    onChangeImg,
  }: ImgBoxFormProps,
  ref: LegacyRef<HTMLInputElement> | undefined,
) => {
  return (
    <ImgBoxFormWrap
      id={id}
      className={className}
      cookieSize={cookieSize}
      plusSize={plusSize}
    >
      <ImgBox
        className="img-box"
        url={imgUrl}
        isHover={isHover}
        setIsHover={setIsHover}
        isImgInput
      >
        {isLoading ? (
          <div className="img-box__loading">
            <CookieIcon className="cookie-icon" />
          </div>
        ) : (
          <label className="img-box__wrap" htmlFor="img_input">
            {isHover && <PlusIcon className="plus-icon" />}
            <input
              type="file"
              id="img_input"
              accept="image/jpeg, image/jpg, image/png"
              ref={ref}
              onChange={onChangeImg}
              style={{ width: "0", height: "0" }}
            />
          </label>
        )}
      </ImgBox>
      <span className="description">
        최대 5MB의 이미지까지 업로드 가능해요!
      </span>
    </ImgBoxFormWrap>
  );
};

export default forwardRef(ImgBoxForm);

interface ImgBoxFormWrapProps {
  cookieSize: number;
  plusSize: number;
}
const ImgBoxFormWrap = styled.div<ImgBoxFormWrapProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .img-box {
    &__wrap {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .plus-icon {
        width: ${(props) => props.plusSize}px;
        height: ${(props) => props.plusSize}px;
        transform: scale(${(props) => props.plusSize / 24});
      }
    }

    &__loading {
      background-color: rgba(255, 255, 255, 0.92);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .cookie-icon {
        width: ${(props) => props.cookieSize}px;
        height: ${(props) => props.cookieSize}px;
        animation: ${imgformAnimation.rotateRule};
        path {
          fill: var(--gray_7_active);
        }
      }
    }
  }

  .description {
    margin-top: 12px;

    color: var(--gray_6);
    font-weight: 400;
    font-size: 11px;
  }
`;
