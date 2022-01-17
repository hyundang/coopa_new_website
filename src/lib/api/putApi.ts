import { CookieDataProps } from "@interfaces/cookie";
import { CreateDirProps, DirDataProps } from "@interfaces/directory";
import { UpdateUserProps } from "../interfaces/user";
import client from "./client";

const putUserData = async (body: UpdateUserProps): Promise<undefined> => {
  try {
    const { data } = await client.put("/users", body);
    console.log("[SUCCESS] PUT USER DATA", data);
  } catch (e) {
    console.log("[FAIL] PUT USER DATA", e);
  }
  return undefined;
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
    console.log("[SUCCESS] PUT HOMEBOARD IMAGE DATA", homeboard);
    return homeboard;
  } catch (e) {
    console.log("[FAIL] PUT HOMEBOARD IMAGE DATA", e);
  }
};

const updateCookie = async (
  body: FormData,
): Promise<CookieDataProps | undefined> => {
  try {
    const { data } = await client.patch(`/cookies`, body);
    console.log("[SUCCESS] PUT COOKIE DATA", data.data);
    return data.data;
  } catch (e) {
    console.log("[FAIL] PUT COOKIE DATA", e);
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
    console.log("[SUCCESS] UPDATE COOKIE PIN", data.data);
    return data.data;
  } catch (e) {
    console.log("[FAIL] UPDATE COOKIE PIN", e);
  }
};

const updateDirectoryData = async (
  id: number,
  body: CreateDirProps,
): Promise<DirDataProps | undefined> => {
  try {
    const result = await client.put(`/directories/${id}`, body);
    console.log("[SUCCESS] PUT DIRECTORY DATA", result.data.data);
    return result.data.data;
  } catch (e) {
    console.log("[FAIL] PUT DIRECTORY DATA", e);
  }
};

const updateDirectoryPin = async (
  id: number,
  isPinned: boolean,
): Promise<DirDataProps | undefined> => {
  try {
    const { data } = await client.put(`/directories/pin/${id}`, { isPinned });
    console.log("[SUCCESS] UPDATE DIRECTORY PIN", data.data);
    return data.data;
  } catch (e) {
    console.log("[FAIL] UPDATE DIRECTORY PIN", e);
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
