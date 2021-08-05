import { ChangeEvent, useState } from "react";
import TextAreaForm from ".";

export default {
  title: "components/molecules/TextAreaForm",
  component: TextAreaForm,
};

export const textAreaForm = () => {
  const [value, setValue] = useState("");
  return (
    <TextAreaForm
      textareaStyle={{ height: "99px", borderRadius: "10px", fontSize: "15px" }}
      text="쿠키 텍스트"
      length={value.length}
      maxLength={200}
      placeholder="나만의 코멘트나 메모를 남겨주세요"
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        e.target.value.length < 201 ? setValue(e.target.value) : () => {}
      }
    />
  );
};

textAreaForm.story = {
  name: "Cookie Edit Modal",
};
