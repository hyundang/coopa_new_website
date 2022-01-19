import { Meta, Story } from "@storybook/react";
import Directories, { DirectoriesProps } from ".";
import { directories } from "@data/dummy/directory";

export default {
  title: "components/templates/Directories",
  component: Directories,
} as Meta;

const Template: Story<DirectoriesProps> = (args) => {
  return (
    <Directories
      {...args}
      deleteDir={async () => {}}
      updateDir={async () => {}}
      updateDirPin={async () => {}}
      refreshCookie={() => {}}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  unpinnedData: directories.common,
};
