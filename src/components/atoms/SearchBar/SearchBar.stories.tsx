import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import SearchBar, { SearchBarProps } from ".";

export default {
  component: SearchBar,
  title: "components/atoms/SearchBar",
} as Meta;

export const Default: Story<SearchBarProps> = (args) => {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ width: "100%", padding: "0 20px" }}>
      <SearchBar {...args} visible={visible} setVisible={setVisible} />
    </div>
  );
};
