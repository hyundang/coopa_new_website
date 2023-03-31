import { getApi } from "./getApi";
import { postApi } from "./postApi";

export const handlers = [...getApi, ...postApi];
