import { CookieDataProps } from "@interfaces/cookie";
import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import CookieImg, { CookieImgProps } from ".";

export default {
  title: "components/molecules/CookieImg",
  component: CookieImg,
} as Meta;

const Template: Story<CookieImgProps> = (args) => {
  const [cardState] = useState<"hover" | "parking" | "normal" | "input">(
    "hover",
  );
  return <CookieImg {...args} cardState={cardState} />;
};

// mock data
const cookieData: CookieDataProps = {
  content:
    "이번 플리는 오래전부터 좋아했던 아티스트 'Justice Der'의 기타 커버곡으로 이루어져 있습니다. 음악을 듣다 보면 한번쯤은 들어보셨을 만한 유명한 팝송 위주로 선곡했습니다. 봄밤과 어울리는 은은한 분위기의 jazzy한 기타 커버곡 플레이리스트 좋아하셨으면 좋겠네요 :)+ 아...",
  directoryInfo: {
    emoji: null,
    id: 1367,
    name: "playlist🎧",
  },
  favicon: "https://www.youtube.com/s/desktop/cb471591/img/favicon_32x32.png",
  id: 11973,
  link: "https://www.youtube.com/watch?v=C7sLwDOL1Vo",
  provider: "YouTube",
  readCnt: 1,
  thumbnail: "https://i.ytimg.com/vi/C7sLwDOL1Vo/hqdefault.jpg",
  // thumbnail: "",
  title: "[playlist]봄 밤, 창이 열린 1층 카페 끝 자리, 가사 없는 chilling 음악",
  isPinned: true,
};

export const CookieDefault = Template.bind({});
CookieDefault.args = {
  cookieData,
};
