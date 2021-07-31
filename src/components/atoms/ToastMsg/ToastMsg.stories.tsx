import { useState } from "react";
import ToastMsg from "./ToastMsg";

export default {
  title: "components/atoms/ToastMsg",
  component: ToastMsg,
};

export const toastMsg = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <ToastMsg isVisible={isVisible} setIsVisible={setIsVisible}>
      👀프로필을 수정했어요!
    </ToastMsg>
  );
};

toastMsg.story = {
  name: "Default",
};

// export const toastMsgError = () => {
//   const [isVisible, setIsVisible] = useState(true);
//   return (
//     <ToastMsg
//       isVisible={isVisible}
//       setIsVisible={setIsVisible}
//       imgSizeOver
//     >
//       😥더 작은 이미지를 올려주세요!
//     </ToastMsg>
//   );
// };

// toastMsgError.story = {
//   name: "Error",
// };
