import { CreateDirProps } from "@interfaces/directory";
import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import DirectoryModal, { DirectoryModalProps } from ".";

export default {
  title: "components/organisms/DirectoryModal",
  component: DirectoryModal,
} as Meta;

const Template: Story<DirectoryModalProps> = (args) => {
  const [value, setValue] = useState<CreateDirProps>({
    name: "",
    emoji: "",
  });
  const [isOpen, setIsOpen] = useState(true);
  return (
    <DirectoryModal
      {...args}
      value={value}
      setValue={setValue}
      // isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};
export const CreateDirectoryModal = Template.bind({});
// directoryModal.args = {
// };
export const EditDirectoryModal = Template.bind({});
EditDirectoryModal.args = {
  type: "edit",
  value: {
    emoji: "😜",
    name: "디렉토리 이름",
  },
};
