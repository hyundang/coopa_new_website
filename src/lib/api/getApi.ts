import { CookieDataProps, SimpleDirDataProps } from "@interfaces/cookie";
import { DirDataProps, GetAllDirProps } from "@interfaces/directory";
import { BookmarkDataProps } from "@interfaces/homeboard";
import axios from "axios";
import { UserDataProps } from "../interfaces/user";
import client from "./client";

const getUserData = (url: string): Promise<UserDataProps | undefined> =>
  client.get(url).then((res) => {
    console.log("[SUCCESS] GET USER DATA", res.data.data);
    return res.data.data;
  });

const getHomeboardData = async (): Promise<string | undefined> => {
  try {
    const {
      data: {
        data: { homeboard },
      },
    } = await client.get("/users/homeboard");
    console.log("[SUCCESS] GET HOMEBOARD IMAGE DATA", homeboard);
    return homeboard;
  } catch (e) {
    console.log("[FAIL] GET HOMEBOARD IMAGE DATA", e);
  }
};

const getBookmarkData = (
  url: string,
): Promise<BookmarkDataProps[] | undefined> =>
  client.get(url).then((res) => {
    console.log("[SUCCESS] GET BOOKMARK DATA", res.data.data);
    return res.data.data;
  });

const getAllCookieData = (
  url: string,
): Promise<CookieDataProps[] | undefined> =>
  client.get(url).then((res) => {
    console.log("[SUCCESS] GET ALL COOKIE DATA", res.data.data);
    return res.data.data;
  });

const getAllDirData = (url: string): Promise<GetAllDirProps | undefined> =>
  client.get(url).then((res) => {
    console.log("[SUCCESS] GET ALL DIRECTORY DATA", res.data.data);
    return res.data.data;
  });

const getSearchedCookieData = async (
  word: string,
): Promise<CookieDataProps[] | undefined> => {
  try {
    const {
      data: { data },
    } = await client.get(`/cookies/search?word=${word}`);
    console.log("[SUCCESS] GET SEARCHED COOKIE DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] GET SEARCHED COOKIE DATA", e);
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
    console.log("[SUCCESS] GET SEARCHED dIRECTORIES DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] GET SEARCHED dIRECTORIES DATA", e);
    return undefined;
  }
};

const getDirInfo = (url: string): Promise<SimpleDirDataProps | undefined> =>
  client.get(url).then((res) => {
    console.log("[SUCCESS] GET DIRECTORY INFO", res.data.data);
    return res.data.data;
  });

const getSharedDirectoryData = (url: string): Promise<any> =>
  axios.get(url, { baseURL: API_DOMAIN }).then((res) => {
    console.log("[SUCCESS] GET SHARED COOKIE DATA", res.data.data);
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
