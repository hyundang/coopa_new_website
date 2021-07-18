import BookmarkTile from "./BookmarkTile";

export default {
  title: "components | BookmarkTile",
  component: BookmarkTile,
};

export const bookmarkTile = () => {
  return (
    <BookmarkTile
      url="https://www.naver.com/favicon.ico?1"
      siteName="네이버"
      onClickTile={() => console.log("naver")}
    />
  );
};

bookmarkTile.story = {
  name: "Default",
};

export const bookmarkAddTile = () => {
  return (
    <BookmarkTile
      url="https://www.naver.com/favicon.ico?1"
      siteName="네이버"
      onClickTile={() => console.log("naver")}
      isAddBtn
    />
  );
};
