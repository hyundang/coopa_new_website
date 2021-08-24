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
      data: {
        data: { shareToken },
      },
    } = await client.post(`/share`, { directoryId });
    console.log("[SUCCESS] POST SHARE TOKEN", shareToken);
    return shareToken;
  } catch (e) {
    console.log("[FAIL] POST SHARE TOKEN", e);
    return undefined;
  }
};

const postApi = {
  postUserData,
  postBookmarkData,
  postShareToken,
};

export default postApi;
