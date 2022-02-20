import { CookieDataProps, CreateCookieProps } from "@interfaces/cookie";
import {
  CreateCookieToDirProps,
  CreateCookieToDirResProps,
  CreateDirProps,
  CreateDirectoryResProps,
  CreateReadCntResProps,
} from "@interfaces/directory";
import { BookmarkDataProps, CreateBookmarkProps } from "@interfaces/homeboard";
import { CreateUserProps } from "@interfaces/user";
import axios from "axios";
import client from "./client";

const postUserData = async (
  body: CreateUserProps,
): Promise<string | undefined> => {
  try {
    const {
      data: {
        data: { jwt },
      },
    } = await axios.post(`/auth/google`, body, { baseURL: API_DOMAIN });
    return jwt;
  } catch (e) {
    return undefined;
  }
};

const postBookmarkData = async (
  body: CreateBookmarkProps,
): Promise<BookmarkDataProps | undefined> => {
  try {
    const {
      data: { data },
    } = await client.post(`/users/favorites`, body);
    return data;
  } catch (e) {
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
    return data;
  } catch (e) {
    return undefined;
  }
};

const postDirectoryData = async (
  body: CreateDirProps,
): Promise<CreateDirectoryResProps | undefined> => {
  try {
    const {
      data: { data },
    } = await client.post(`/directories`, body);
    return data;
  } catch (e) {
    return undefined;
  }
};

const postCookieToDir = async (
  body: CreateCookieToDirProps,
): Promise<CreateCookieToDirResProps | undefined> => {
  try {
    const {
      data: { data },
    } = await client.post(`/directories/add/cookie`, body);
    return data;
  } catch (e) {
    return undefined;
  }
};

const postCookieReadCount = async (
  id: number,
): Promise<CreateReadCntResProps | undefined> => {
  try {
    const { data } = await client.post(`/cookies/${id}/read`);
    return data;
  } catch (e) {
    return undefined;
  }
};

const postCookie = async (
  body: CreateCookieProps,
): Promise<CookieDataProps | undefined> => {
  try {
    const { data } = await client.post(`/cookies`, body);
    return data.data;
  } catch (e) {
    return undefined;
  }
};

const postApi = {
  postUserData,
  postBookmarkData,
  postShareToken,
  postDirectoryData,
  postCookieToDir,
  postCookieReadCount,
  postCookie,
};

export default postApi;
