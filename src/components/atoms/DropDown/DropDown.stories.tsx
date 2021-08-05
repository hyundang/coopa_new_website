import { useState, ChangeEvent } from "react";
import { Btn, Input, List } from "@components/atoms";
import DropDown from ".";

//mock data
const allDir = [
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
  {
    name: "블라블라",
    emoji: "😀",
  },
];

export default {
  title: "components/atoms/DropDown",
  component: DropDown,
};

export const CookieDropDown = () => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("");
  return (
    <DropDown
      selectedItem="디렉토리"
      style={{ width: "270px", padding: "14px" }}
      isActive={isActive}
      setIsActive={setIsActive}
    >
      <div>
        <List allDir={allDir} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.8fr 1fr",
            gridGap: "7px",
            marginTop: "12px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            style={{
              fontWeight: 500,
              fontSize: "11px",
              lineHeight: "13px",
              padding: "0px 8px",
              letterSpacing: "-0.02em",
            }}
            placeholder="새 디렉토리 명을 입력하세요"
            maxLength={13}
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.value.length < 46 ? setText(e.target.value) : () => {}
            }
          />
          <Btn
            onClick={() => console.log("hi")}
            isOrange
            isCookieDirBtn
            isAtvBtn={!!text.length}
          >
            저장
          </Btn>
        </div>
      </div>
    </DropDown>
  );
};

CookieDropDown.story = {
  name: "Default",
};

export const NoScrollList = () => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("");
  return (
    <DropDown
      selectedItem="디렉토리"
      style={{ width: "270px", padding: "14px" }}
      isActive={isActive}
      setIsActive={setIsActive}
    >
      <div>
        <List
          allDir={[
            {
              name: "블라블라",
              emoji: "😀",
            },
          ]}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.8fr 1fr",
            gridGap: "7px",
            marginTop: "12px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            style={{
              fontWeight: 500,
              fontSize: "11px",
              lineHeight: "13px",
              padding: "0px 8px",
              letterSpacing: "-0.02em",
            }}
            placeholder="새 디렉토리 명을 입력하세요"
            maxLength={13}
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.value.length < 46 ? setText(e.target.value) : () => {}
            }
          />
          <Btn
            onClick={() => console.log("hi")}
            isOrange
            isCookieDirBtn
            isAtvBtn={!!text.length}
          >
            저장
          </Btn>
        </div>
      </div>
    </DropDown>
  );
};
