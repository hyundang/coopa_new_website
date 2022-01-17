import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from "react";
import styled, { css } from "styled-components";
import { ImgBoxForm } from "@components/molecules";
import { ImgBox, MoveModal, Tab } from "@components/atoms";
import { modalAnimation } from "@components/animations";
import { useRecoilState, useSetRecoilState } from "recoil";
import { HomeboardState } from "@modules/states";

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
  /** location x좌표 */
  locationX: number;
  /** 모달 open 여부 */
  isOpen: boolean;
  /** 모달 open 여부 setState */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** homeboard img 변경 성공 */
  setIsSuccess: (e: boolean) => void;
  /** img input 시 img size 에러 */
  setIsError: (e: boolean) => void;
  /** input img post */
  updateHomeboardImg: (e: File) => Promise<string>;
}

const HomeboardEditModal = ({
  id,
  className,
  locationX,
  isOpen,
  setIsOpen,
  setIsSuccess,
  setIsError,
  updateHomeboardImg,
}: HomeboardEditModalProps) => {
  // 탭 선택값
  const [tabValue, setTabValue] = useState("기본 테마");

  // 홈보드 이미지
  const setHomeboardImg = useSetRecoilState(HomeboardState.HomeboardImgState);
  // 홈보드 수정 모달 이미지
  const [homeboardModalImg, setHomeboardModalImg] = useRecoilState(
    HomeboardState.HomeboardModalImgState,
  );

  // img box hover 여부
  const [isHover, setIsHover] = useState(false);
  const img_input = useRef<HTMLInputElement>(null);
  // loading 여부
  const [isLoading, setIsLoading] = useState(false);

  // 키 떼어냈을 때
  const handleKeyUp = (e: any) => {
    // shift + -> = 업로드
    if (e.shiftKey && e.key === "ArrowRight") {
      setTabValue("업로드");
    }
    // shift + <- = 기본 테마
    if (e.shiftKey && e.key === "ArrowLeft") {
      setTabValue("기본 테마");
    }
  };

  // theme img click event handling
  const handleClickThemeImg = (e: any) => {
    localStorage.setItem("homeboardImgUrl", e?.target?.id);
    setHomeboardModalImg("");
    setHomeboardImg(`/theme_img/img_${e.target.id}.jpg`);
    setIsSuccess(true);
  };

  // img input event handling 함수
  const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size < 5000001) {
        setIsLoading(true);
        setHomeboardModalImg(URL.createObjectURL(e.target.files[0]));
        const imgUrl = await updateHomeboardImg(e.target.files[0]);
        setHomeboardImg(imgUrl);
        setIsLoading(false);
        setIsSuccess(true);
      } else {
        setIsError(true);
        // img_input.current && img_input.current.value = "";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
            <ThemeImg
              id={idx + 1}
              key={img}
              onClick={handleClickThemeImg}
              url={img}
            />
          ))}
        </div>
      ) : (
        <ImgBoxForm
          className="input-img"
          imgUrl={homeboardModalImg}
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

interface ThemeImgProps {
  id: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  url: string;
}
const ThemeImg = ({ id, onClick, url }: ThemeImgProps) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <ImgBox
      id={`${id}`}
      className="theme__img"
      onClick={onClick}
      url={url}
      isHover={isHover}
      setIsHover={setIsHover}
    />
  );
};

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
