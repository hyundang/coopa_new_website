import { EditUserDataProps } from "../interfaces/user";
import client from "./client";

const putUserData = async (body: EditUserDataProps): Promise<undefined> => {
  try {
    const { data } = await client.put("/users", body);
    console.log("[SUCCESS] GET USER DATA", data);
  } catch (e) {
    console.log("[FAIL] GET USER DATA", e);
  }
  return undefined;
};

const putApi = {
  putUserData,
};

export default putApi;
