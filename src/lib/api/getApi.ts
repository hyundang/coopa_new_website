import { CookieDataProps } from "@interfaces/cookie";
import {
  DirDataProps,
  GetAllDirProps,
  SimpleDirDataProps,
} from "@interfaces/directory";
import { BookmarkDataProps } from "@interfaces/homeboard";
import axios from "axios";
import { UserDataProps } from "../interfaces/user";
import client from "./client";

const getUserData = async (url: string): Promise<UserDataProps | undefined> => {
  const {
    data: { data },
  } = await client.get(url);
  return data;
};

const getHomeboardData = async (): Promise<string | undefined> => {
  try {
    const {
      data: {
        data: { homeboard },
      },
    } = await client.get("/users/homeboard");
    return homeboard;
  } catch (e) {
    return undefined;
  }
};

const getBookmarkData = async (
  url: string,
): Promise<BookmarkDataProps[] | undefined> => {
  const {
    data: { data },
  } = await client.get(url);
  return data;
};

const getAllCookieData = async (
  url: string,
): Promise<CookieDataProps[] | undefined> => {
  const {
    data: { data },
  } = await client.get(url);
  return data;
};

const getAllDirData = async (
  url: string,
): Promise<GetAllDirProps | undefined> => {
  const {
    data: { data },
  } = await client.get(url);
  return data;
};

const getSearchedCookieData = async (
  word: string,
): Promise<CookieDataProps[] | undefined> => {
  try {
    const {
      data: { data },
    } = await client.get(`/cookies/search?word=${word}`);
    return data;
  } catch (e) {
    return undefined;
  }
};

const getSearchedDirData = async (
  word: string,
): Promise<DirDataProps[] | undefined> => {
  try {
    const {
      data: { data },
    } = await client.get(`/directories/search?word=${word}`);
    return data;
  } catch (e) {
    return undefined;
  }
};

const getDirInfo = async (
  url: string,
): Promise<SimpleDirDataProps | undefined> => {
  const {
    data: { data },
  } = await client.get(url);
  return data;
};

const getSharedDirectoryData = async (url: string): Promise<any> => {
  const {
    data: { data },
  } = await axios.get(url, { baseURL: API_DOMAIN });
  return data;
};

const getApi = {
  getUserData,
  getHomeboardData,
  getBookmarkData,
  getAllCookieData,
  getAllDirData,
  getSearchedCookieData,
  getSearchedDirData,
  getDirInfo,
  getSharedDirectoryData,
};

export default getApi;
