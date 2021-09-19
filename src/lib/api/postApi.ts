import {
  PostDirAddCookie,
  PostDirAddCookieProps,
  PostDirAddCookieResponseProps,
  PostDirectoryProps,
  PostDirectoryResponseProps,
} from "@interfaces/directory";
import {
  BookmarkDataProps,
  PostBookmarkDataProps,
} from "@interfaces/homeboard";
import { PostUserDataProps } from "@interfaces/user";
import axios from "axios";
import client from "./client";

const postUserData = async (
  body: PostUserDataProps,
): Promise<string | undefined> => {
  try {
    const {
      data: {
        data: { jwt },
      },
    } = await axios.post(`${API_DOMAIN}/auth/google`, body);
    console.log("[SUCCESS] POST USER DATA", jwt);
    return jwt;
  } catch (e) {
    console.log("[FAIL] POST USER DATA", e);
    return undefined;
  }
};

const postBookmarkData = async (
  body: PostBookmarkDataProps,
): Promise<BookmarkDataProps | undefined> => {
  try {
    const {
      data: { data },
    } = await client.post(`/users/favorites`, body);
    console.log("[SUCCESS] POST BOOKMARK DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] POST BOOKMARK DATA", e);
    return undefined;
  }
};

const postDirectoryData = async (
  body: PostDirectoryProps,
): Promise<PostDirectoryResponseProps | undefined> => {
  try {
    const {
      data: { data },
    } = await client.post(`/directories`, body);
    console.log("[SUCCESS] POST BOOKMARK DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] POST BOOKMARK DATA", e);
    return undefined;
  }
};

const postDirAddCookie = async (
  body: PostDirAddCookieProps,
): Promise<PostDirAddCookieResponseProps | undefined> => {
  try {
    const {
      data: { data },
    } = await client.post(`/directories/add/cookie`, body);
    console.log("[SUCCESS] POST ADD COOKIE DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] POST ADD COOKIE DATA", e);
    return undefined;
  }
};

const postApi = {
  postUserData,
  postBookmarkData,
  postDirectoryData,
  postDirAddCookie,
};

export default postApi;
