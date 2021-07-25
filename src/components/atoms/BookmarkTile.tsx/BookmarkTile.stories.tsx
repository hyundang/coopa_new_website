import React from "react";
import { Meta, Story } from "@storybook/react";
import BookmarkTile, { BookmarkTileProps } from "./BookmarkTile";

export default {
  title: "components/atoms/BookmarkTile",
  component: BookmarkTile,
} as Meta;

export const bookmarkTile: Story<BookmarkTileProps> = (props) => (
  <BookmarkTile {...props} />
);
