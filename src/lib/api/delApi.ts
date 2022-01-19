import { DeleteCookieProps } from "@interfaces/cookie";
import { DeleteDirProps } from "@interfaces/directory";
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

const delCookieData = async (
  cookieId: number,
): Promise<DeleteCookieProps | undefined> => {
  try {
    const {
      data: { data },
    } = await client.delete(`/cookies/${cookieId}`);
    console.log("[SUCCESS] DELETE COOKIE DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] DELETE COOKIE DATA", e);
    return undefined;
  }
};

const delDirData = async (
  dirId: number,
): Promise<DeleteDirProps | undefined> => {
  try {
    const {
      data: { data },
    } = await client.delete(`/directories/${dirId}`);
    console.log("[SUCCESS] DELETE DIRECTORY DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] DELETE DIRECTORY DATA", e);
    return undefined;
  }
};

const delApi = {
  delBookmarkData,
  delCookieData,
  delDirData,
};

export default delApi;
