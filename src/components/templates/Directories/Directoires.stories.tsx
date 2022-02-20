import { Meta, Story } from "@storybook/react";
import Directories, { DirectoriesProps } from ".";
import { directories, mockDirModule } from "@data/dummy/directory";

export default {
  title: "components/templates/Directories",
  component: Directories,
} as Meta;

const Template: Story<DirectoriesProps> = (args) => {
  return (
    <Directories
      {...args}
      dirModule={mockDirModule}
      refreshCookie={async () => {}}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  unpinnedData: directories.common,
};
