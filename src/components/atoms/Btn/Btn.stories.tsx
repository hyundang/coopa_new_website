import { ClipIcon } from "@assets/icons/btn";
import { CookieIcon } from "@assets/icons/common";
import styled from "styled-components";
import { useState } from "react";
import Btn from "./Btn";

export default {
  title: "components/atoms/Btn",
  component: Btn,
};

export const btn = () => {
  return (
    <Btn
      Style={{
        width: "70px",
        height: "48px",
        borderRadius: "24px",
        fontSize: "16px",
      }}
      onClick={() => console.log("hi")}
      isOrange
    >
      <span>삭제</span>
    </Btn>
  );
};

btn.story = {
  name: "Default",
};

export const iconBtn = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Btn
      Style={{
        width: "191px",
        height: "50px",
        borderRadius: "24px",
        fontSize: "16px",
      }}
      onClick={() => console.log("hi")}
      isOrange
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CookieIcon
          style={{ width: "18px", height: "18px", marginRight: "5px" }}
        />
        <span>로그인하기</span>
      </div>
    </Btn>
  );
};

export const dirShareBtn = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Btn
      Style={{
        width: "191px",
        height: "50px",
        borderRadius: "24px",
        fontSize: "16px",
      }}
      onClick={() => console.log("hi")}
      isOrange={false}
      isDirShare
      setIsHover={setIsHover}
    >
      <Wrap isHover={isHover}>
        <ClipIcon
          style={{
            width: "19px",
            height: "19px",
            marginRight: "5px",
            marginBottom: "3px",
          }}
          className="icon"
        />
        <span>디렉토리 공유하기</span>
      </Wrap>
    </Btn>
  );
};

interface IWrap {
  isHover: boolean;
}
const Wrap = styled.div<IWrap>`
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    path {
      transition: 0.2s;
      fill: ${(props) => (props.isHover ? "var(--white)" : "var(--orange)")};
    }
  }
`;
