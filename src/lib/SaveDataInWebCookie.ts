import reactCookie from "react-cookies";

const SaveDataInWebCookie = (key: string, value: any) => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + Number(process.env.EXPIRE_YEAR));
  reactCookie.save(key, value, {
    path: "/",
    expires,
    httpOnly: JSON.parse(HTTP_ONLY),
  });
};

export default SaveDataInWebCookie;
