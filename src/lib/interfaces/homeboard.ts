export interface BookmarkDataProps {
  id: number;
  name: string;
  link: string;
  image?: string;
}

export interface CreateBookmarkProps {
  name: string;
  link: string;
}
