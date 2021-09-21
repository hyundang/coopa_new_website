import { Meta, Story } from "@storybook/react";
import Directories, { DirectoriesProps } from ".";

export default {
  title: "components/templates/Directories",
  component: Directories,
} as Meta;

const Template: Story<DirectoriesProps> = (args) => {
  return <Directories {...args} />;
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

export const Default = Template.bind({});
Default.args = {
  data: allDir,
};

export const empty = Template.bind({});
empty.args = {
  data: [],
};

export const searchEmpty = Template.bind({});
searchEmpty.args = {
  data: [],
  isSearched: true,
};
