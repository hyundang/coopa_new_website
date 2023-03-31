interface BookmarkInfoProps {
  name: string;
  link: string;
}

export interface BookmarkDataProps extends BookmarkInfoProps {
  id: number;
  image?: string;
}

export interface CreateBookmarkProps extends BookmarkInfoProps {}
