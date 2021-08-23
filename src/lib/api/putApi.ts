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

const putHomeboardData = async (imgFile: File): Promise<string> => {
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

const putApi = {
  putUserData,
  putHomeboardData,
};

export default putApi;
