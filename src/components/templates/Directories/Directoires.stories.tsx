import Directories from ".";

export default {
  title: "components/templates/Directories",
  component: Directories,
};

export const directories = () => {
  return <Directories data={allDir} />;
};

const allDir = [
  {
    emoji: "😀",
    id: 2543,
    name: "3ps1",
    thumbnail: "https://www.notion.so/images/meta/default.png",
    cookieCnt: 1,
  },
  {
    emoji: "",
    id: 2543,
    name: "3ps2",
    thumbnail: "https://www.notion.so/images/meta/default.png",
    cookieCnt: 1,
  },
  {
    emoji: "😀",
    id: 2543,
    name: "3ps3",
    thumbnail: "https://www.notion.so/images/meta/default.png",
    cookieCnt: 1,
  },
  {
    emoji: "😀",
    id: 2543,
    name: "3ps4",
    thumbnail: "https://www.notion.so/images/meta/default.png",
    cookieCnt: 1,
  },
];

directories.story = {
  name: "Default",
};
