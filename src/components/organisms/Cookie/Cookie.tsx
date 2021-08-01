import CookieImg from "@components/molecules/CookieImg/CookieImg";
import CookieHover from "@components/molecules/CookieHover/CookieHover";
import styled from "styled-components";
import { useState } from "react";

const Cookie = () => {
  //normal: 기본 | hover: 호버 | parking: 파킹중 | input: 인풋입력중
  const [cardState, setCardState] = useState("normal");
  return (
    <CookieWrap
      onMouseEnter={() => {
        if (cardState !== "input") setCardState("hover");
      }}
      onMouseLeave={() => {
        if (cardState !== "input") setCardState("normal");
      }}
    >
      <CookieImg cardState={cardState} />
      {(cardState === "hover" || cardState === "input") && (
        <div className="hover-div">
          <CookieHover allDir={[]} setCardState={setCardState} />
        </div>
      )}
    </CookieWrap>
  );
};

const CookieWrap = styled.section`
  position: relative;
  .hover-div {
    position: absolute;
    top: 0;
  }
`;

export default Cookie;
