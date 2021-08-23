import axios from "axios";
import { PostUserDataProps } from "../interfaces/user";

const postUserData = async (
  body: PostUserDataProps,
): Promise<string | undefined> => {
  try {
    const {
      data: {
        data: { jwt },
      },
    } = await axios.post(`${API_DOMAIN}/auth/google`, body);
    console.log("[SUCCESS] GET USER DATA", jwt);
    return jwt;
  } catch (e) {
    console.log("[FAIL] GET USER DATA", e);
    return undefined;
  }
};

const postApi = {
  postUserData,
};

export default postApi;
