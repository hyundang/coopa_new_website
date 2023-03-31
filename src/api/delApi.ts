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
    return data;
  } catch (e) {
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
    return data;
  } catch (e) {
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
    return data;
  } catch (e) {
    return undefined;
  }
};

const delApi = {
  delBookmarkData,
  delCookieData,
  delDirData,
};

export default delApi;
