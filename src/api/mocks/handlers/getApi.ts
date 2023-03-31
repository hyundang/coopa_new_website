import { rest } from "msw";
import {
  cookies,
  cookieWithDirectory,
  cookieWithoutDirectory,
  pinnedCookies,
  searchedCookies,
} from "src/test/data/cookie";
import {
  directories,
  directoryInfo,
  searchedDirectories,
  sharedDirectory,
} from "src/test/data/directory";
import { favorites } from "src/test/data/homeboard";
import { userInfo } from "src/test/data/user";

const getUserData = rest.get(`${API_DOMAIN}/users`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      status: "OK",
      data: userInfo,
    }),
  );
});

const getHomeboardData = rest.get(
  `${API_DOMAIN}/users/homeboard`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        status: "OK",
        data: {
          homeboard:
            "https://d1b64e2bmdcy95.cloudfront.net/homeboard/2023-01-24-01:59:46-user4.jfif",
        },
      }),
    );
  },
);

const getBookmarkData = rest.get(
  `${API_DOMAIN}/users/favorites`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        status: "OK",
        data: favorites,
      }),
    );
  },
);

const getAllCookieData = rest.get(`${API_DOMAIN}/cookies`, (req, res, ctx) => {
  const size = Number(req.url.searchParams.get("size"));
  const page = Number(req.url.searchParams.get("page"));
  const filter = req.url.searchParams.get("filter");
  return res(
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      status: "OK",
      data: cookies.slice(size * page, size * (page + 1)),
      //   data: [cookieWithDirectory, cookieWithoutDirectory],
    }),
  );
});

const getPinnedCookieData = rest.get(
  `${API_DOMAIN}/cookies/pinned`,
  (req, res, ctx) => {
    const filter = req.url.searchParams.get("filter");
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        status: "OK",
        data: pinnedCookies,
      }),
    );
  },
);

const getAllDirData = rest.get(`${API_DOMAIN}/directories`, (req, res, ctx) => {
  const filter = req.url.searchParams.get("filter");
  return res(
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      status: "OK",
      data: directories,
    }),
  );
});

const getSearchedCookieData = rest.get(
  `${API_DOMAIN}/cookies/search`,
  (req, res, ctx) => {
    const word = req.url.searchParams.get("word");
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        status: "OK",
        data: searchedCookies,
      }),
    );
  },
);

const getSearchedDirData = rest.get(
  `${API_DOMAIN}/directories/search`,
  (req, res, ctx) => {
    const word = req.url.searchParams.get("word");
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        status: "OK",
        data: searchedDirectories,
      }),
    );
  },
);

const getDirInfo = rest.get(
  `${API_DOMAIN}/directories/:queryID/info`,
  (req, res, ctx) => {
    const { queryID } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        status: "OK",
        data: directoryInfo,
      }),
    );
  },
);

const getSharedDirectoryData = rest.get(
  `${API_DOMAIN}/share/:queryID/info`,
  (req, res, ctx) => {
    const { queryID } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        status: "OK",
        data: sharedDirectory,
      }),
    );
  },
);

export const getApi = [
  getUserData,
  getHomeboardData,
  getBookmarkData,
  getAllCookieData,
  getPinnedCookieData,
  getAllDirData,
  getSearchedCookieData,
  getSearchedDirData,
  getDirInfo,
  getSharedDirectoryData,
];
