import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import SearchBar, { SearchBarProps } from ".";

export default {
  component: SearchBar,
  title: "components/atoms/SearchBar",
} as Meta;

export const Default = () => {
  const [visible, setVisible] = useState(true);
  const [isSearched, setIsSearched] = useState(false);
  return (
    <div style={{ width: "100%", padding: "0 20px" }}>
      <SearchBar
        visible={visible}
        setVisible={setVisible}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
      />
    </div>
  );
};
