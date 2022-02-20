import React from "react";
import { Meta, Story } from "@storybook/react";
import SearchBar from ".";

export default {
  component: SearchBar,
  title: "components/atoms/SearchBar",
} as Meta;

export const Default: Story = (args) => {
  return (
    <div style={{ width: "100%", padding: "0 20px" }}>
      <SearchBar {...args} />
    </div>
  );
};
