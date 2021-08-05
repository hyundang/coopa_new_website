import TextArea from ".";

export default {
  title: "components/atoms/TextArea",
  component: TextArea,
};

export const textArea = () => {
  return (
    <TextArea
      style={{
        width: "100%",
        height: "99px",
        borderRadius: "10px",
        fontSize: "15px",
        lineHeight: "24px",
      }}
      placeholder="나만의 코멘트나 메모를 남겨주세요"
      maxLength={200}
    />
  );
};

textArea.story = {
  default: "Default",
};
