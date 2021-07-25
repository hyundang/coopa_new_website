import Input from "./Input";

export default {
  title: "components | Input",
  component: Input,
};

export const input = () => {
  return (
    <Input
      style={{
        width: "100%",
        height: "46px",
        borderRadius: "12px",
        fontSize: "15px",
      }}
      placeholder="쿠키 제목을 입력해주세요"
      maxLength={45}
    />
  );
};

input.story = {
  default: "Default",
};
