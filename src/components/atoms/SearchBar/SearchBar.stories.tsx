import React from "react";
import { Meta, Story } from "@storybook/react";
import SearchBar, {
  SearchBarProps,
} from "src/components/atoms/SearchBar/SearchBar";

export default {
  component: SearchBar,
  title: "components/common/SearchBar",
} as Meta;

export const Basic: Story<SearchBarProps> = (props) => <SearchBar {...props} />;
