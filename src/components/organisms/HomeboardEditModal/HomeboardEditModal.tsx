import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import styled from "styled-components";
import ImgBoxForm from "@components/molecules/ImgBoxForm/ImgBoxForm";
import Tab from "@components/atoms/Tab/Tab";

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
  /** 모달 안의 홈보드 배경 이미지 */
  value: string;
  /** 모달 안의 홈보드 배경 이미지 setState */
  setValue: Dispatch<SetStateAction<string>>;
  /** img input 시 img size 에러 여부 setState */
  setIsError: Dispatch<SetStateAction<boolean>>;
  /** 모달 open 여부 setState */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** homeboard img setState */
  setHomeboardImg: Dispatch<SetStateAction<string>>;
  /** input img post */
  postHomeboardImg: (e: File) => string;
}

const HomeboardEditModal = ({
  value,
  setValue,
  setIsError,
  setIsOpen,
  setHomeboardImg,
  postHomeboardImg,
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
        setIsError(true);
        img_input.current.value = "";
      }
    }
  };

  return (
    <>
      <Background onClick={() => setIsOpen(false)} />
      <Container className="modal_container">
        <span className="modal_title">홈보드 변경</span>
        <TabWrap className="tab_wrap">
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
        </TabWrap>
        {tabValue === "기본 테마" ? (
          <div className="theme_wrap">
            {imgs.map((img: string, idx: number) => (
              <img
                src={img}
                id={`${idx + 1}`}
                key={img}
                alt="theme_img"
                className="theme_wrap__img"
                onClick={handleClickThemeImg}
              />
            ))}
          </div>
        ) : (
          <ImgBoxForm
            imgBoxStyle={{
              width: "470px",
              height: "83px",
              borderRadius: "8px",
              border: isLoading ? undefined : "1px solid var(--gray_4)",
            }}
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
      </Container>
    </>
  );
};

export default HomeboardEditModal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 11;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 24px 24px 0px 24px;
  border-radius: 20px;
  background-color: var(--white);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.13);
  width: 518px;
  height: 264px;

  color: var(--black_1);

  .modal_title {
    width: 100%;
    height: 36px;
    margin-bottom: 6px;
    line-height: 36px;
    font-weight: 500;
    font-size: 20px;
    color: var(--black_1);
  }

  .theme_wrap {
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    &__img {
      cursor: pointer;
      width: 11rem;
      height: 5rem;
      border-radius: 0.6rem;
      margin-bottom: 1rem;
      &:hover {
        background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
      }
    }
  }
`;

const TabWrap = styled.div`
  width: 100%;
  margin-bottom: 18px;
  padding-bottom: 1px;
  border-bottom: 1px solid var(--gray_3);
`;
