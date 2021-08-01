import { UserData } from "../interfaces/user";
import client from "./client";

const getUserData = async (token: string): Promise<UserData | undefined> => {
  const { data } = await client.get("/users", {
    headers: {
      "x-access-token": token,
    },
  });
  try {
    console.log("[SUCCESS] GET USER DATA", data);
    return data;
  } catch (e) {
    console.log("[FAIL] GET USER DATA", e);
    return undefined;
  }
};

export const getApi = {
  getUserData,
};
