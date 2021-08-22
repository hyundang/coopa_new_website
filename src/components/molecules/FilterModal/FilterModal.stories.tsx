import { Story, Meta } from "@storybook/react";
import FilterModal, { FilterModalProps } from ".";

export default {
  title: "components/molecules/FilterModal",
  component: FilterModal,
} as Meta;

export const Template: Story<FilterModalProps> = (args) => (
  <FilterModal {...args} isOpen type="latest" />
);
