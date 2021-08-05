import React from "react";
import { Meta, Story } from "@storybook/react";
import SearchBar, { SearchBarProps } from ".";

export default {
  component: SearchBar,
  title: "components/atoms/SearchBar",
} as Meta;

export const Basic: Story<SearchBarProps> = (props) => <SearchBar {...props} />;
