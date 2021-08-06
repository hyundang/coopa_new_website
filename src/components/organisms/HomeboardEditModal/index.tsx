import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ImgBoxForm } from "@components/molecules";
import { MoveModal, Tab } from "@components/atoms";
import { modalAnimation } from "@components/animations";

const imgs = [
  "/theme_img/img_1_small.png",
  "/theme_img/img_2_small.png",
  "/theme_img/img_3_small.png",
  "/theme_img/img_4_small.png",
  "/theme_img/img_5_small.png",
  "/theme_img/img_6_small.png",
  "/theme_img/img_7_small.png",
  "/theme_img/img_8_small.png",
];

export interface HomeboardEditModalProps {
  /** id */
  id?: string;
  /** className */
  className?: string;
  /** 모달 안의 홈보드 배경 이미지 */
  value: string;
  /** 모달 안의 홈보드 배경 이미지 setState */
  setValue: Dispatch<SetStateAction<string>>;
  /** img input 시 img size 에러 여부 setState */
  setIsError?: Dispatch<SetStateAction<boolean>>;
  /** 모달 open 여부 */
  isOpen: boolean;
  /** 모달 open 여부 setState */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** homeboard img setState */
  setHomeboardImg: Dispatch<SetStateAction<string>>;
  /** input img post */
  postHomeboardImg: (e: File) => string;
  /** location x좌표 */
  locationX: number;
}

const HomeboardEditModal = ({
  id,
  className,
  value,
  setValue,
  setIsError,
  isOpen,
  setIsOpen,
  setHomeboardImg,
  postHomeboardImg,
  locationX,
}: HomeboardEditModalProps) => {
  // 탭 선택값
  const [tabValue, setTabValue] = useState("기본 테마");
  // img box hover 여부
  const [isHover, setIsHover] = useState(false);
  const img_input = useRef(document.createElement("input"));
  // loading 여부
  const [isLoading, setIsLoading] = useState(false);

  // theme img click event handling
  const handleClickThemeImg = (e: any) => {
    localStorage.setItem("homeboardImg", e?.target?.id);
    setHomeboardImg(`/theme_img/img_${e.target.id}`);
  };

  // img input event handling 함수
  const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size < 5000001) {
        setIsLoading(true);
        setValue(URL.createObjectURL(e.target.files[0]));
        const imgUrl = await postHomeboardImg(e.target.files[0]);
        localStorage.removeItem("homeboardImg");
        setHomeboardImg(imgUrl);
        setIsLoading(false);
      } else {
        // setIsError(true);
        img_input.current.value = "";
      }
    }
  };

  return (
    <ModalWrap
      id={id}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      locationX={locationX}
      isLoading={isLoading}
    >
      <span className="title">홈보드 변경</span>
      <div className="tab-wrap">
        <Tab
          tabStyle={{
            width: "68px",
            height: "48px",
            fontSize: "13px",
          }}
          options={["기본 테마", "업로드"]}
          value={tabValue}
          setValue={setTabValue}
        />
      </div>
      {tabValue === "기본 테마" ? (
        <div className="theme">
          {imgs.map((img: string, idx: number) => (
            <div
              id={`${idx + 1}`}
              className="theme__img-wrap"
              key={img}
              role="button"
              onClick={handleClickThemeImg}
              tabIndex={-1}
            >
              <img src={img} alt="theme-img" className="theme__img" />
            </div>
          ))}
        </div>
      ) : (
        <ImgBoxForm
          className="input-img"
          imgUrl={value}
          isHover={isHover}
          setIsHover={setIsHover}
          isLoading={isLoading}
          plusSize={18}
          cookieSize={36}
          ref={img_input}
          onChangeImg={handleChangeImg}
        />
      )}
    </ModalWrap>
  );
};

export default HomeboardEditModal;

interface ModalWrapProps {
  locationX: number;
  isLoading: boolean;
}
const ModalWrap = styled(MoveModal)<ModalWrapProps>`
  top: 133px;
  left: ${(props) => props.locationX}px;
  z-index: 3;

  width: 518px;
  height: 264px;
  padding: 24px 24px 0px 24px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.13);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  transition: 0.4s all;
  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
          animation: ${modalAnimation.homeboardFadeInRule};
        `
      : css`
          opacity: 0;
          visibility: hidden;
          animation: ${modalAnimation.homeboardFadeOutRule};
        `}

  .title {
    width: 100%;
    height: 36px;
    margin-bottom: 6px;
    line-height: 36px;
    font-weight: 500;
    font-size: 20px;
    color: var(--black_1);
  }

  .tab-wrap {
    width: 100%;
    margin-bottom: 18px;
    padding-bottom: 1px;
    border-bottom: 1px solid var(--gray_3);
  }

  .theme {
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    &__img {
      cursor: pointer;
      width: 110px;
      height: 50px;
      border-radius: 6px;
      margin-bottom: 10px;
      @media (hover: hover) {
        &:hover {
          background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
        }
      }
    }
  }

  .input-img {
    .img-box {
      width: 470px;
      height: 83px;
      border-radius: 8px;
      border: ${(props) =>
        props.isLoading ? undefined : "1px solid var(--gray_4)"};
    }
  }
`;
