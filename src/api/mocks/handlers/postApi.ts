import { rest } from "msw";

const postUserData = rest.post(`${API_DOMAIN}/auth/google`, (req, res, ctx) => {
  console.log(req.json());
  return res(
    ctx.status(200),
    ctx.json({
      statusCode: 200,
      status: "OK",
      data: {
        jwt: "jwtjwtjwtjwtjwtjwtjwtjwtjwt",
      },
    }),
  );
});

export const postApi = [postUserData];
