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

const getUserData = (url: string): Promise<UserDataProps | undefined> =>
  client.get(url).then((res) => {
    return res.data.data;
  });

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

const getBookmarkData = (
  url: string,
): Promise<BookmarkDataProps[] | undefined> =>
  client.get(url).then((res) => {
    return res.data.data;
  });

const getAllCookieData = (
  url: string,
): Promise<CookieDataProps[] | undefined> =>
  client.get(url).then((res) => {
    return res.data.data;
  });

const getAllDirData = (url: string): Promise<GetAllDirProps | undefined> =>
  client.get(url).then((res) => {
    return res.data.data;
  });

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

const getDirInfo = (url: string): Promise<SimpleDirDataProps | undefined> =>
  client.get(url).then((res) => {
    return res.data.data;
  });

const getSharedDirectoryData = (url: string): Promise<any> =>
  axios.get(url, { baseURL: API_DOMAIN }).then((res) => {
    return res.data.data;
  });

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
