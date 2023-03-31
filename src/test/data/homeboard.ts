import { BookmarkDataProps } from "@interfaces/homeboard";

export const favorite: BookmarkDataProps = {
  id: 1305,
  name: "github",
  link: "https://github.com/hyundang/",
  image: "https://github.githubassets.com/favicons/favicon.svg",
};

export const favorites: BookmarkDataProps[] = [
  favorite,
  {
    id: 276,
    name: "gmail",
    link: "https://mail.google.com/mail/",
    image: "https://mail.google.com/",
  },
  {
    id: 294,
    name: "블로그",
    link: "https://carpediem9911.tistory.com/",
    image: "https://t1.daumcdn.net/tistory_admin/static/top/favicon_0630.ico",
  },
  {
    id: 1132,
    name: "leetcode",
    link: "https://leetcode.com/",
    image: "https://leetcode.com/favicon-16x16.png",
  },
  {
    id: 1133,
    name: "hackerrank",
    link: "https://www.hackerrank.com/",
    image:
      "https://www.hackerrank.com/wp-content/uploads/2020/05/hackerrank_cursor_favicon_480px-150x150.png",
  },
  {
    id: 1134,
    name: "프로그래머스",
    link: "https://programmers.co.kr/",
    image:
      "https://programmers.co.kr/assets/icons/favicon-40b78633b6556a68c3da8e2125c31512fbd01d09906ab76c8a8ff289e494cadb.png",
  },
];
