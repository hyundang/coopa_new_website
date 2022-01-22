import { Story, Meta } from "@storybook/react";
import Bookmark, { BookmarkProps } from ".";

export default {
  title: "components/organisms/Bookmark",
  component: Bookmark,
} as Meta;

export const Default: Story<BookmarkProps> = (args) => {
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
      <Bookmark {...args} bookmarkData={[]} />
    </div>
  );
};

export const ManyBookmark: Story<BookmarkProps> = (args) => {
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
        {...args}
        bookmarkData={[
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
      />
    </div>
  );
};

export const error: Story<BookmarkProps> = (args) => {
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
        {...args}
        bookmarkData={[
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
      />
    </div>
  );
};
