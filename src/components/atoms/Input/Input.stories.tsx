import Input from ".";

export default {
  title: "components/atoms/Input",
  component: Input,
};

export const input = () => {
  return <Input placeholder="쿠키 제목을 입력해주세요" maxLength={45} />;
};

input.story = {
  default: "Default",
};
