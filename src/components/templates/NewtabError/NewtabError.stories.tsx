import { NetworkErrorImg, NotFoundErrorImg } from "@assets/imgs/error";
import { Story, Meta } from "@storybook/react";
import NewtabError, { NewtabErrorProps } from ".";

export default {
  title: "components/templates/NewtabError",
  component: NewtabError,
} as Meta;

export const error404: Story<NewtabErrorProps> = (args) => {
  return (
    <NewtabError
      {...args}
      errorImg={NotFoundErrorImg}
      errorImgWidth={141}
      text="앗, 찾을 수 없는 페이지에요..😢️"
      text2="확인 후 다시 함께하시겠어요?"
    />
  );
};

export const errorDefault: Story<NewtabErrorProps> = (args) => {
  return (
    <NewtabError
      {...args}
      errorImg={NotFoundErrorImg}
      errorImgWidth={141}
      text="앗, 오류가 발생했어요 😮"
      text2="다시 한번 함께해주시겠어요?"
    />
  );
};

export const errorLogin: Story<NewtabErrorProps> = (args) => {
  return (
    <NewtabError
      {...args}
      errorImg={NotFoundErrorImg}
      errorImgWidth={141}
      text="앗, 로그인이 필요한 페이지에요! 😮"
      text2="로그인 후 함께하시겠어요?"
      isLoginError
    />
  );
};

export const errorNetwork: Story<NewtabErrorProps> = (args) => {
  return (
    <NewtabError
      {...args}
      errorImg={NetworkErrorImg}
      errorImgWidth={183}
      text="앗, 인터넷 연결을 확인해주세요! 😮"
      text2="확인 후 다시 도전하시겠어요?"
    />
  );
};
