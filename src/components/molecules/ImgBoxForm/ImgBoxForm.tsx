import ImgBox from "@components/atoms/ImgBox/ImgBox";
import styled, { keyframes } from "styled-components";
import { CookieIcon, PlusIcon } from "@assets/icons/common";
import { Dispatch, SetStateAction, LegacyRef } from "react";

export interface ImgBoxFormProps {
  /** img box style */
  imgBoxStyle?: React.CSSProperties;
  /** img box 안에 들어가는 img url */
  imgUrl?: string;
  /** img box hover 여부 */
  isHover: boolean;
  /** img box hover 여부 setState */
  setIsHover: Dispatch<SetStateAction<boolean>>;
  /** post시 로딩 여부 */
  isLoading: boolean;
  /** hover시 plus 아이콘 크기 (px) */
  plusSize: number;
  /** 로딩뷰의 cookie 아이콘 크기 (px) */
  cookieSize: number;
  /** input을 위한 ref */
  ref: LegacyRef<HTMLInputElement> | undefined;
  /** input event handling 함수 */
  onChangeImg: React.ChangeEventHandler<HTMLInputElement>;
}

const ImgBoxForm = ({
  imgBoxStyle,
  imgUrl,
  isHover,
  setIsHover,
  isLoading,
  plusSize,
  cookieSize,
  ref,
  onChangeImg,
}: ImgBoxFormProps) => {
  return (
    <Container
      className="img_box_form_container"
      cookieSize={cookieSize}
      plusSize={plusSize}
    >
      <ImgBox
        className="img_box_form_img"
        style={imgBoxStyle}
        url={imgUrl}
        setIsHover={setIsHover}
      >
        {isLoading ? (
          <div className="img_box_form_img__loading">
            <CookieIcon className="cookie_icon" />
          </div>
        ) : (
          isHover && (
            <label className="img_box_form_img__label" htmlFor="img_input">
              <PlusIcon className="plus_icon" />
              <input
                type="file"
                id="img_input"
                accept="image/jpeg, image/jpg, image/png"
                ref={ref}
                onChange={onChangeImg}
                style={{ width: "0", height: "0" }}
              />
            </label>
          )
        )}
      </ImgBox>
      <span className="img_box_form_text">
        최대 5MB의 이미지까지 업로드 가능해요!
      </span>
    </Container>
  );
};

export default ImgBoxForm;

const rotate = keyframes`
    100%{transform: rotate(360deg);}
`;

interface ContainerProps {
  cookieSize: number;
  plusSize: number;
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .img_box_form_img {
    &__label {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .plus_icon {
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
      .cookie_icon {
        width: ${(props) => props.cookieSize}px;
        height: ${(props) => props.cookieSize}px;
        animation: ${rotate} 1.2s ease-in-out infinite;
        path {
          fill: var(--gray_7_active);
        }
      }
    }
  }

  .img_box_form_text {
    margin-top: 12px;

    color: var(--gray_6);
    font-weight: 400;
    font-size: 11px;
  }
`;
