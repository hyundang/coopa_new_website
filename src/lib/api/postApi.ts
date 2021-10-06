import {
  PostAddCookieToDirProps,
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
    } = await axios.post(`/auth/google`, body, { baseURL: API_DOMAIN });
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

const postShareToken = async (
  directoryId: number,
): Promise<string | undefined> => {
  try {
    const {
      data: { data },
    } = await client.post(`/share`, { directoryId });
    console.log("[SUCCESS] POST SHARE TOKEN", data);
    return data;
  } catch (e) {
    console.log("[FAIL] POST SHARE TOKEN", e);
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
    console.log("[SUCCESS] POST DIRECTORY DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] POST DIRECTORY DATA", e);
    return undefined;
  }
};

const postDirAddCookie = async (
  body: PostAddCookieToDirProps,
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

const postCookieCount = async (id: number) => {
  try {
    const { data } = await client.post(`/cookies/${id}/read`);
    console.log("[SUCCESS] POST ADD COOKIE COUNT", data);
    return data;
  } catch (e) {
    console.log("[FAIL] POST ADD COOKIE COUNT", e);
    return e;
  }
};

const postApi = {
  postUserData,
  postBookmarkData,
  postShareToken,
  postDirectoryData,
  postDirAddCookie,
  postCookieCount,
};

export default postApi;
