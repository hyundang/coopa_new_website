import { UserDataProps } from "../interfaces/user";
import client from "./client";

const getUserData = (url: string): Promise<UserDataProps | undefined> =>
  client.get(url).then((res) => {
    console.log("[SUCCESS] GET USER DATA", res.data.data);
    return res.data.data;
  });

const getHomeboardData = async (): Promise<string> => {
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
    return e;
  }
};

const getApi = {
  getUserData,
  getHomeboardData,
};

export default getApi;
