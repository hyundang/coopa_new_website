import { BookmarkDataProps } from "@interfaces/homeboard";
import client from "./client";

const delBookmarkData = async (
  favoritesId: number,
): Promise<BookmarkDataProps | undefined> => {
  try {
    const {
      data: { data },
    } = await client.delete(`/users/favorites`, {
      data: { favoritesId },
    });
    console.log("[SUCCESS] DELETE BOOKMARK DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] DELETE BOOKMARK DATA", e);
    return undefined;
  }
};

const delApi = {
  delBookmarkData,
};

export default delApi;
