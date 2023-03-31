import { CookieDataProps } from "@interfaces/cookie";
import { CreateDirProps, DirDataProps } from "@interfaces/directory";
import { UpdateUserProps } from "../types/interfaces/user";
import client from "./client";

const putUserData = async (body: UpdateUserProps): Promise<boolean> => {
  try {
    await client.put("/users", body);
    return true;
  } catch (e) {
    return false;
  }
};

const putHomeboardData = async (imgFile: File): Promise<string | undefined> => {
  try {
    const body = new FormData();
    body.append("image", imgFile);
    const {
      data: {
        data: { homeboard },
      },
    } = await client.patch("/users/homeboard", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return homeboard;
  } catch (e) {
    return undefined;
  }
};

const updateCookie = async (
  body: FormData,
): Promise<CookieDataProps | undefined> => {
  try {
    const { data } = await client.patch(`/cookies`, body);
    return data.data;
  } catch (e) {
    return undefined;
  }
};

const updateCookiePin = async (
  id: number,
  isPinned: boolean,
): Promise<CookieDataProps | undefined> => {
  try {
    const { data } = await client.put(`/cookies/pin/${id}`, {
      isPinned,
    });
    return data.data;
  } catch (e) {
    return undefined;
  }
};

const updateDirectoryData = async (
  id: number,
  body: CreateDirProps,
): Promise<DirDataProps | undefined> => {
  try {
    const result = await client.put(`/directories/${id}`, body);
    return result.data.data;
  } catch (e) {
    return undefined;
  }
};

const updateDirectoryPin = async (
  id: number,
  isPinned: boolean,
): Promise<DirDataProps | undefined> => {
  try {
    const { data } = await client.put(`/directories/pin/${id}`, { isPinned });
    return data.data;
  } catch (e) {
    return undefined;
  }
};

const putApi = {
  putUserData,
  putHomeboardData,
  updateCookie,
  updateCookiePin,
  updateDirectoryData,
  updateDirectoryPin,
};

export default putApi;
