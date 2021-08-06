import { Story, Meta } from "@storybook/react";
import Bookmark, { BookmarkProps } from ".";

export default {
  title: "components/organisms/Bookmark",
  component: Bookmark,
} as Meta;

export const Default = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Bookmark
        datas={[]}
        onClickSave={() => console.log("bookmark add")}
        onClickDel={() => console.log("bookmark del")}
      />
    </div>
  );
};

export const ManyBookmark = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Bookmark
        datas={[
          {
            id: 1,
            name: "naver",
            link: "https://www.naver.com",
            image: "	https://papago.naver.com/favicon.ico",
          },
          {
            id: 2,
            name: "naver",
            link: "https://www.naver.com",
            image: "	https://papago.naver.com/favicon.ico",
          },
          {
            id: 3,
            name: "naver",
            link: "https://www.naver.com",
            image: "	https://papago.naver.com/favicon.ico",
          },
        ]}
        onClickSave={() => console.log("bookmark add")}
        onClickDel={() => console.log("bookmark del")}
      />
    </div>
  );
};
