import { getApi } from "@api/getApi";
import { selectorFamily } from "recoil";

const USER = "get/users";

export const UserDataState = selectorFamily({
  key: USER,
  get: (token: string) => async () => {
    const data = await getApi.getUserData(token);
    return data;
  },
});
