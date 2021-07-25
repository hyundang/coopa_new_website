import { ChangeEvent, useState } from "react";
import InputForm from "./InputForm";

export default {
  title: "components | InputForm",
  component: InputForm,
};

export const inputForm = () => {
  const [value, setValue] = useState("");
  return (
    <InputForm
      inputStyle={{ height: "46px", borderRadius: "12px", fontSize: "15px" }}
      text="쿠키 제목"
      length={value.length}
      maxLength={45}
      placeholder="쿠키 제목을 입력해주세요"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        e.target.value.length < 46 ? setValue(e.target.value) : () => {}
      }
    />
  );
};

inputForm.story = {
  name: "Cookie Edit Modal",
};
