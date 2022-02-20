import { Story, Meta } from "@storybook/react";
import DirectoryModal, { DirectoryModalProps } from ".";

export default {
  title: "components/organisms/DirectoryModal",
  component: DirectoryModal,
} as Meta;

const Template: Story<DirectoryModalProps> = (args) => {
  return (
    <DirectoryModal
      {...args}
      // isOpen={isOpen}
      setIsOpen={() => {}}
    />
  );
};
export const CreateDirectoryModal = Template.bind({});
// directoryModal.args = {
// };
export const EditDirectoryModal = Template.bind({});
EditDirectoryModal.args = {
  type: "edit",
};
