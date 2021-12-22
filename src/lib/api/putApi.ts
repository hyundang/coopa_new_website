import { PostDirectoryProps } from "@interfaces/directory";
import { EditUserDataProps } from "../interfaces/user";
import client from "./client";

const putUserData = async (body: EditUserDataProps): Promise<undefined> => {
  try {
    const { data } = await client.put("/users", body);
    console.log("[SUCCESS] PUT USER DATA", data);
  } catch (e) {
    console.log("[FAIL] PUT USER DATA", e);
  }
  return undefined;
};

const putHomeboardData = async (imgFile: File): Promise<string | unknown> => {
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
    return e;
  }
};

const updateCookie = async (body: FormData) => {
  try {
    const { data } = await client.patch(`/cookies`, body);
    console.log("[SUCCESS] PUT COOKIE DATA", data.data);
    return data.data;
  } catch (e) {
    console.log("[FAIL] PUT COOKIE DATA", e);
    return e;
  }
};

const updateDirectoryData = async (id: number, body: PostDirectoryProps) => {
  try {
    const result = await client.put(`/directories/${id}`, body);
    console.log("[SUCCESS] PUT DIRECTORY DATA", result.data.data);
    return result.data.data;
  } catch (e) {
    console.log("[FAIL] PUT DIRECTORY DATA", e);
    return e;
  }
};

const updateDirectoryPin = async (id: number, isPinned: boolean) => {
  try {
    const { data } = await client.put(`/directories/pin/${id}`, { isPinned });
    console.log("[SUCCESS] UPDATE DIRECTORY PIN", data.data);
    return data.data;
  } catch (e) {
    console.log("[FAIL] UPDATE DIRECTORY PIN", e);
    return e;
  }
};

const putApi = {
  putUserData,
  putHomeboardData,
  updateCookie,
  updateDirectoryData,
  updateDirectoryPin,
};

export default putApi;
