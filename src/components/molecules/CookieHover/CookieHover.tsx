import { useState, ChangeEvent, SetStateAction, Dispatch } from "react";
import Input from "@components/atoms/Input/Input";
import DropDown from "@components/atoms/DropDown/DropDown";
import List from "@components/atoms/List/List";
import Btn from "@components/atoms/Btn/Btn";

interface directory {
  name: string;
  emoji: string;
}
export interface IProps {
  //모든 디렉토리
  allDir: directory[];
  //cardState를 parking으로 변경
  setCardState: Dispatch<SetStateAction<string>>;
  //현재 디렉토리
  currDir: string;
  //set currDir
  setCurrDir: Dispatch<SetStateAction<string>>;
}

const CookieHover = ({ allDir, setCardState, currDir, setCurrDir }: IProps) => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("");
  const postHandler = () => {
    setCurrDir(text);
  };
  return (
    <DropDown
      selectedItem={currDir}
      isActive={isActive}
      setIsActive={setIsActive}
    >
      <div>
        <List allDir={allDir} setCurrDir={setCurrDir} />
        <div
          className="form"
          style={{
            display: "grid",
            gridTemplateColumns: "2.6fr 1fr",
            gridGap: "7px",
            marginTop: "12px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            style={{
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "13px",
              padding: "0px 8px",
              letterSpacing: "-0.02em",
            }}
            placeholder="새 디렉토리 명을 입력하세요"
            maxLength={13}
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
              setCardState("input");
            }}
            onKeyPress={(e) => (e.key === "Enter" ? postHandler() : {})}
            onBlur={(e) =>
              e.target.className !== "form" && setCardState("normal")
            }
          />
          <Btn
            Style={{
              width: "100%",
              height: "36px",
              borderRadius: "18px",
              fontSize: "13px",
            }}
            onClick={() => postHandler()}
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

export default CookieHover;
